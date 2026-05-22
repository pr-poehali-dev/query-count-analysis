"""
Telegram бот для генерации ссылок с суммой и именем клиента.
Команды: /start, /link — бот спрашивает имя и сумму, генерирует ссылку на сайт.
"""
import os
import json
import requests

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
SITE_URL = os.environ.get("SITE_URL", "https://poehali.dev")
TG_API = f"https://api.telegram.org/bot{BOT_TOKEN}"

# Хранилище состояний пользователей в памяти (на время сессии)
user_states = {}

def send_message(chat_id, text, reply_markup=None):
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}
    if reply_markup:
        payload["reply_markup"] = json.dumps(reply_markup)
    requests.post(f"{TG_API}/sendMessage", json=payload)

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 200, "body": "ok"}

    message = body.get("message", {})
    if not message:
        return {"statusCode": 200, "body": "ok"}

    chat_id = message["chat"]["id"]
    text = message.get("text", "").strip()

    state = user_states.get(chat_id, {})

    # /start или /link — начало диалога
    if text in ["/start", "/link", "🔗 Создать ссылку"]:
        user_states[chat_id] = {"step": "waiting_name"}
        send_message(chat_id, "👤 Введите <b>имя клиента</b> (например: Иван Петров):")
        return {"statusCode": 200, "body": "ok"}

    # Шаг 1 — ввод имени
    if state.get("step") == "waiting_name":
        user_states[chat_id] = {"step": "waiting_amount", "name": text}
        send_message(chat_id, f"💰 Введите <b>сумму</b> в рублях (только цифры, например: 150000):")
        return {"statusCode": 200, "body": "ok"}

    # Шаг 2 — ввод суммы, генерация ссылки
    if state.get("step") == "waiting_amount":
        try:
            amount = int(text.replace(" ", "").replace(",", ""))
        except ValueError:
            send_message(chat_id, "❌ Введите только цифры, например: 150000")
            return {"statusCode": 200, "body": "ok"}

        name = state.get("name", "")
        import urllib.parse
        encoded_name = urllib.parse.quote(name)
        link = f"{SITE_URL}/?name={encoded_name}&amount={amount}"

        user_states.pop(chat_id, None)

        send_message(chat_id,
            f"✅ <b>Ссылка готова!</b>\n\n"
            f"👤 Клиент: <b>{name}</b>\n"
            f"💰 Сумма: <b>{amount:,} ₽</b>\n\n"
            f"🔗 <code>{link}</code>\n\n"
            f"Отправь эту ссылку клиенту.",
            reply_markup={
                "inline_keyboard": [[
                    {"text": "📋 Скопировать ссылку", "url": link}
                ]]
            }
        )
        return {"statusCode": 200, "body": "ok"}

    # Дефолт
    send_message(chat_id,
        "Нажми кнопку ниже чтобы создать ссылку 👇",
        reply_markup={
            "keyboard": [["🔗 Создать ссылку"]],
            "resize_keyboard": True
        }
    )
    return {"statusCode": 200, "body": "ok", "headers": {"Access-Control-Allow-Origin": "*"}}
