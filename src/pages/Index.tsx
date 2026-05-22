import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COMPANY_NAME = "FinGroup Capital";
const CLIENT_NAME = "Александр Петров";
const AMOUNT = 248500;

export default function Index() {
  const [displayed, setDisplayed] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const increment = AMOUNT / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), AMOUNT);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const formatAmount = (n: number) =>
    n.toLocaleString("ru-RU") + " ₽";

  const handleClaim = () => {
    setClicked(true);
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ fontFamily: "'Golos Text', sans-serif", background: "#080c14" }}>

      {/* Animated mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,212,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 60% 30%, rgba(16,185,129,0.08) 0%, transparent 55%)"
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={i * 11} y1="0" x2={i * 11} y2="100" stroke="#00d4ff" strokeWidth="0.2" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i + 10} x1="0" y1={i * 11} x2="100" y2={i * 11} stroke="#00d4ff" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      {/* Particles on click */}
      {particles.map(p => (
        <div key={p.id} className="absolute pointer-events-none" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
            animation: "particlePop 1.2s ease-out forwards"
          }} />
        </div>
      ))}

      {/* Header */}
      <header className="relative z-10 flex items-center px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
            boxShadow: "0 0 20px rgba(0,212,255,0.4)"
          }}>
            <Icon name="Landmark" size={20} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.04em" }}>
            {COMPANY_NAME}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px #10b981", animation: "pulse 2s infinite" }} />
          <span className="text-xs text-emerald-400 font-medium">Онлайн</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Card */}
        <div className="w-full max-w-md relative" style={{ animation: "fadeUp 0.7s ease-out both" }}>

          {/* Glowing border card */}
          <div className="relative rounded-3xl p-px overflow-hidden" style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.6), rgba(124,58,237,0.6), rgba(0,212,255,0.2))"
          }}>
            <div className="rounded-3xl px-8 py-10 relative overflow-hidden" style={{
              background: "linear-gradient(160deg, rgba(10,18,35,0.98) 0%, rgba(16,12,40,0.98) 100%)",
              backdropFilter: "blur(20px)"
            }}>

              {/* Subtle inner glow */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{
                background: "linear-gradient(90deg, transparent, #00d4ff, transparent)"
              }} />

              {/* To label */}
              <div className="text-center mb-2">
                <span className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full" style={{
                  color: "#00d4ff",
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.25)"
                }}>
                  Входящий платёж
                </span>
              </div>

              {/* Client name */}
              <p className="text-center text-white/60 text-sm mt-4 mb-1">На ваше имя</p>
              <h2 className="text-center text-white font-bold text-2xl mb-8" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.03em" }}>
                {CLIENT_NAME}
              </h2>

              {/* Amount */}
              <div className="text-center mb-2">
                <p className="text-white/50 text-sm mb-3">поступило средств</p>
                <div className="relative inline-block">
                  <span className="font-black" style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "clamp(2.5rem, 10vw, 4rem)",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #00d4ff 0%, #a78bfa 50%, #00d4ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                    animation: "shimmer 3s linear infinite"
                  }}>
                    {formatAmount(displayed)}
                  </span>
                  <div className="absolute -inset-4 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, transparent 70%)"
                  }} />
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

              {/* Info row */}
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="text-center">
                  <p className="text-white/40 text-xs mb-1">Отправитель</p>
                  <p className="text-white/80 text-sm font-semibold">{COMPANY_NAME}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Icon name="ArrowRight" size={14} />
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-xs mb-1">Получатель</p>
                  <p className="text-white/80 text-sm font-semibold">Вы</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleClaim}
                className="w-full py-4 rounded-2xl font-bold text-lg relative overflow-hidden transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.05em",
                  background: clicked
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                  color: "#fff",
                  boxShadow: clicked
                    ? "0 0 30px rgba(16,185,129,0.5)"
                    : "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(124,58,237,0.2)",
                  transform: "translateZ(0)"
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {clicked ? (
                    <>
                      <Icon name="CheckCircle" size={22} />
                      Заявка отправлена
                    </>
                  ) : (
                    <>
                      <Icon name="Wallet" size={22} />
                      Получить средства
                    </>
                  )}
                </span>
              </button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-2 mt-5">
                <Icon name="ShieldCheck" size={14} />
                <span className="text-white/30 text-xs">Защищено SSL-шифрованием</span>
              </div>

            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold" style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 0 20px rgba(16,185,129,0.5)",
            color: "#fff",
            fontFamily: "'Golos Text', sans-serif"
          }}>
            ✓ Верифицировано
          </div>
        </div>

        {/* Bottom hint */}
        <p className="text-white/20 text-xs text-center mt-10" style={{ animation: "fadeUp 1s 0.5s ease-out both" }}>
          Средства будут зачислены в течение 1–3 рабочих дней
        </p>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes particlePop {
          0% { transform: scale(0) translate(0,0); opacity: 1; }
          100% { transform: scale(3) translate(var(--tx, 40px), var(--ty, -60px)); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
