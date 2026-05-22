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

      {/* Background photo */}
      <div className="fixed inset-0 pointer-events-none">
        <img
          src="https://cdn.poehali.dev/projects/4465bc63-d1f1-4e74-b786-a400c4413919/files/584c1c70-e5af-4f18-a953-f7214e4ca799.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.7) 100%)"
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: "#f5e000",
            boxShadow: "0 0 16px rgba(245,224,0,0.3)"
          }}>
            <Icon name="Landmark" size={20} />
          </div>
          <span className="font-bold text-xl" style={{
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: "0.04em",
            color: "#f5e000"
          }}>
            {COMPANY_NAME}
          </span>
        </div>

        {/* Top right — profile */}
        <div className="ml-auto">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)"
          }}>
            <Icon name="User" size={20} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">

        {/* Card 1 — Amount */}
        <div className="w-full max-w-sm" style={{ animation: "fadeUp 0.6s ease-out both" }}>
          <div className="rounded-2xl p-px" style={{
            background: "linear-gradient(135deg, rgba(201,160,0,0.35), rgba(201,160,0,0.08), rgba(201,160,0,0.25))"
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
                  background: "linear-gradient(135deg, #f5e000 0%, #fff176 50%, #f5e000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite"
                }}>
                  {formatAmount(displayed)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#f5e000" }} />
                <span className="text-white/25 text-xs">от {COMPANY_NAME}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Get funds */}
        <div className="w-full max-w-sm" style={{ animation: "fadeUp 0.7s 0.12s ease-out both" }}>
          <div className="rounded-2xl p-px" style={{
            background: "linear-gradient(135deg, rgba(201,160,0,0.35), rgba(201,160,0,0.08), rgba(201,160,0,0.25))"
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
                  background: "#f5e000",
                  color: "#0a0a0a",
                  border: "2px solid #f5e000",
                  boxShadow: "0 0 24px rgba(245,224,0,0.35)",
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
                Международная система денежных переводов. Работаем с 2016 года.
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-white/15 text-xs">© 2024 Western Union Holdings, Inc. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Support chat widget */}
      <div className="fixed bottom-6 right-6 z-50" style={{ animation: "fadeUp 1s 0.5s ease-out both" }}>
        <div className="flex flex-col items-end gap-2">
          {/* Bubble */}
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{
            background: "#1a1a1a",
            border: "1px solid rgba(201,160,0,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
          }}>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/4465bc63-d1f1-4e74-b786-a400c4413919/files/e76bee03-0e38-44a7-b5e1-f5623dd2eb22.jpg"
                alt="Alex"
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: "2px solid #f5e000" }}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400" style={{ border: "2px solid #1a1a1a" }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Alex</p>
              <p className="text-white/40 text-xs">Оператор поддержки</p>
            </div>
            <Icon name="MessageCircle" size={18} />
          </div>
        </div>
      </div>

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