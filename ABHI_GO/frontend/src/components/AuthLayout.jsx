import { Link } from "react-router-dom";

const AuthLayout = ({
  kicker,
  title,
  description,
  switchText,
  switchLabel,
  switchTo,
  visualKicker,
  visualTitle,
  visualCopy,
  children,
  legal,
}) => (
  <main className="auth-page">
    <div className="auth-shell">
      <section className="auth-main">
        <div className="auth-main-top">
          <Link to="/" className="abhi-brand" aria-label="Abhi Go home">
            <span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span>
          </Link>
          <Link className="auth-home-link" to="/">Back to home ↗</Link>
        </div>
        <div className="auth-content">
          <span className="auth-kicker">{kicker}</span>
          <h1>{title}</h1>
          <p className="auth-description">{description}</p>
          {children}
          {switchText && <p className="auth-switch">{switchText} <Link to={switchTo}>{switchLabel}</Link></p>}
          {legal && <p className="auth-legal">{legal}</p>}
        </div>
      </section>

      <aside className="auth-visual" aria-label="Abhi Go ride service">
        <Link to="/" className="abhi-brand auth-visual-brand" aria-label="Abhi Go home">
          <span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span>
        </Link>
        <div className="auth-visual-copy">
          <span>{visualKicker}</span>
          <h2>{visualTitle}</h2>
          <p>{visualCopy}</p>
        </div>
        <div className="auth-scene" aria-hidden="true">
          <div className="auth-scene-disc" />
          <div className="auth-route" />
          <i className="auth-glow-dot" />
          <i className="auth-glow-dot dot-two" />
          <div className="auth-scene-car">
            <svg viewBox="0 0 160 76">
              <path d="M22 48 32 34c4-6 10-9 18-10l13-12c4-4 8-6 14-6h27c7 0 13 3 18 8l15 17 8 5c4 2 6 6 6 10v7c0 4-3 7-7 7h-7a17 17 0 0 0-33 0H60a17 17 0 0 0-33 0h-5c-5 0-8-3-8-8v-5c0-4 3-7 8-9Z" fill="#c7fb70" stroke="#efffd9" strokeWidth="2" />
              <path d="m58 27 13-12c2-2 5-3 8-3h24c5 0 9 2 12 6l10 12H54Z" fill="#29422e" stroke="#e5f5d7" strokeWidth="1.5" />
              <circle cx="43" cy="57" r="10" fill="#16251c" stroke="#d8f4b6" strokeWidth="2" />
              <circle cx="128" cy="57" r="10" fill="#16251c" stroke="#d8f4b6" strokeWidth="2" />
              <text x="85" y="43" fill="#23351d" fontSize="7" fontWeight="800" letterSpacing="1.5" textAnchor="middle">ABHI GO</text>
            </svg>
          </div>
        </div>
        <div className="auth-side-note"><i>✓</i><span>Simple booking. Clear fares. Your city, your pace.</span></div>
      </aside>
    </div>
  </main>
);

export default AuthLayout;
