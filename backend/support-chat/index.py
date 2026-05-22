"""
Чат поддержки: сообщения с сайта пересылаются администратору в Telegram.
POST /send — принимает сообщение от клиента, отправляет в Telegram админу.
"""
import os
import json
import requests

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
ADMIN_CHAT_ID = os.environ["TELEGRAM_ADMIN_CHAT_ID"]
TG_API = f"https://api.telegram.org/bot{BOT_TOKEN}"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    message = body.get("message", "").strip()
    session_id = body.get("session_id", "unknown")

    if not message:
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "empty message"})}

    text = (
        f"💬 <b>Новое сообщение от клиента</b>\n"
        f"🆔 Сессия: <code>{session_id}</code>\n\n"
        f"📝 {message}"
    )

    resp = requests.post(f"{TG_API}/sendMessage", json={
        "chat_id": ADMIN_CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    })

    if resp.status_code == 200:
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}
    else:
        return {"statusCode": 500, "headers": CORS_HEADERS, "body": json.dumps({"error": "telegram error"})}
