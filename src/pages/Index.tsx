import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COMPANY_NAME = "Western Union";

function getParam(name: string, fallback: string) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || fallback;
}

export default function Index() {
  const clientName = getParam("name", "Александр Петров");
  const amount = parseFloat(getParam("amount", "248500"));

  const [displayed, setDisplayed] = useState(0);


  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const increment = amount / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), amount);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [amount]);

  const formatAmount = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Golos Text', sans-serif", background: "#0a0a0a" }}>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 15% 10%, rgba(255,200,0,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(255,180,0,0.06) 0%, transparent 55%)"
      }} />

      {/* Header */}
      <header className="relative z-10 flex items-center px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: "#ffc800",
            boxShadow: "0 0 20px rgba(255,200,0,0.35)"
          }}>
            <Icon name="Landmark" size={20} />
          </div>
          <span className="font-bold text-xl" style={{
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.04em",
            color: "#ffc800"
          }}>
            {COMPANY_NAME}
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">

        {/* Card 1 — Amount */}
        <div className="w-full max-w-sm" style={{ animation: "fadeUp 0.6s ease-out both" }}>
          <div className="rounded-2xl p-px" style={{
            background: "linear-gradient(135deg, rgba(255,200,0,0.6), rgba(255,200,0,0.1), rgba(255,200,0,0.4))"
          }}>
            <div className="rounded-2xl px-6 py-6 relative overflow-hidden" style={{
              background: "linear-gradient(160deg, #111111 0%, #0d0d0d 100%)"
            }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{
                background: "linear-gradient(90deg, transparent, #ffc800, transparent)"
              }} />

              <p className="text-center text-white/40 text-xs mb-2 uppercase tracking-widest">Сумма поступивших средств</p>
              <div className="text-center">
                <span className="font-black" style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(2rem, 9vw, 3.2rem)",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #ffc800 0%, #ffe066 50%, #ffc800 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite"
                }}>
                  {formatAmount(displayed)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ffc800", boxShadow: "0 0 5px #ffc800" }} />
                <span className="text-white/25 text-xs">от {COMPANY_NAME} · {clientName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Get funds */}
        <div className="w-full max-w-sm" style={{ animation: "fadeUp 0.7s 0.12s ease-out both" }}>
          <div className="rounded-2xl p-px" style={{
            background: "linear-gradient(135deg, rgba(255,200,0,0.6), rgba(255,200,0,0.1), rgba(255,200,0,0.4))"
          }}>
            <div className="rounded-2xl px-6 py-6 relative overflow-hidden" style={{
              background: "linear-gradient(160deg, #111111 0%, #0d0d0d 100%)"
            }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{
                background: "linear-gradient(90deg, transparent, #ffc800, transparent)"
              }} />

              <a
                href="https://t.me/YOUR_BOT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.06em",
                  fontSize: "1.1rem",
                  background: "#ffc800",
                  color: "#0a0a0a",
                  border: "2px solid #ffc800",
                  boxShadow: "0 0 32px rgba(255,200,0,0.45)",
                  textDecoration: "none"
                }}
              >
                <Icon name="Wallet" size={20} />
                Получить средства
              </a>

              <div className="flex items-center justify-center gap-2 mt-4">
                <Icon name="ShieldCheck" size={13} />
                <span className="text-white/25 text-xs">Защищено SSL-шифрованием</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t" style={{ borderColor: "rgba(255,200,0,0.1)" }}>
        <div className="max-w-4xl mx-auto px-6 py-12">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ffc800" }}>
                  <Icon name="Landmark" size={14} />
                </div>
                <span className="font-bold text-base" style={{ fontFamily: "'Oswald', sans-serif", color: "#ffc800" }}>
                  {COMPANY_NAME}
                </span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed">
                Международная система денежных переводов. Работаем с 1851 года.
              </p>
            </div>

            <div>
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Помощь</h4>
              <ul className="space-y-2">
                {["FAQ", "Служба поддержки", "Статус перевода", "Контакты"].map(item => (
                  <li key={item} className="text-white/30 text-sm cursor-default">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Компания</h4>
              <ul className="space-y-2">
                {["О нас", "Новости", "Партнёры", "Карьера"].map(item => (
                  <li key={item} className="text-white/30 text-sm cursor-default">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Правовая информация</h4>
              <ul className="space-y-2">
                {["Политика конфиденциальности", "Условия использования", "Лицензии", "AML-политика"].map(item => (
                  <li key={item} className="text-white/30 text-sm cursor-default">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl px-6 py-6 mb-8" style={{ background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,200,0,0.1)" }}>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Частые вопросы</h4>
            <div className="space-y-4">
              {[
                { q: "Как долго идёт перевод?", a: "Средства зачисляются в течение 1–3 рабочих дней после подтверждения." },
                { q: "Безопасно ли передавать данные?", a: "Все данные защищены SSL-шифрованием и соответствуют стандартам PCI DSS." },
                { q: "Какая комиссия?", a: "Получение средств через данную ссылку осуществляется без комиссии." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: "rgba(255,200,0,0.08)" }}>
                  <p className="text-white/60 text-sm font-semibold mb-1">{q}</p>
                  <p className="text-white/30 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">© 2024 Western Union Holdings, Inc. Все права защищены.</p>
            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "SWIFT"].map(b => (
                <span key={b} className="text-white/20 text-xs px-2 py-1 rounded" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}