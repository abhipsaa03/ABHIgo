import { Link } from "react-router-dom";

const CityScene = () => (
  <div className="hero-art" role="img" aria-label="An animated 3D city route with an Abhi Go car">
    <div className="scene-halo" />
    <div className="scene-ring" />
    <div className="scene-ring ring-two" />
    <div className="scene-grid">
      <div className="scene-topline"><span>ABHI GO / CITY NETWORK</span><span><i /> RIDES ARE MOVING</span></div>
      <div className="city-platform">
        <div className="city-road road-main" />
        <div className="city-road road-cross" />
        <div className="city-block block-a"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="city-block block-b"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="city-block block-c"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="city-block block-d"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="city-block block-e"><i /><i /><i /><i /><i /><i /></div>
        <div className="route-glow" />
        <div className="scene-car" aria-hidden="true">
          <svg viewBox="0 0 160 76" role="presentation">
            <defs>
              <linearGradient id="car-body" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#f2ffd9" />
                <stop offset=".5" stopColor="#c7fb70" />
                <stop offset="1" stopColor="#71a83b" />
              </linearGradient>
              <linearGradient id="car-glass" x1="0" x2="1">
                <stop stopColor="#243b2b" />
                <stop offset="1" stopColor="#8da981" />
              </linearGradient>
            </defs>
            <ellipse cx="79" cy="65" rx="54" ry="7" fill="#000" opacity=".32" />
            <path d="M22 48 32 34c4-6 10-9 18-10l13-12c4-4 8-6 14-6h27c7 0 13 3 18 8l15 17 8 5c4 2 6 6 6 10v7c0 4-3 7-7 7h-7a17 17 0 0 0-33 0H60a17 17 0 0 0-33 0h-5c-5 0-8-3-8-8v-5c0-4 3-7 8-9Z" fill="url(#car-body)" stroke="#eaffcb" strokeWidth="2" />
            <path d="m58 27 13-12c2-2 5-3 8-3h24c5 0 9 2 12 6l10 12H54Z" fill="url(#car-glass)" stroke="#e5f5d7" strokeWidth="1.5" />
            <path d="M83 13v17M20 43h9m115-7 8 3" stroke="#fff" strokeLinecap="round" strokeWidth="2" opacity=".65" />
            <circle cx="43" cy="57" r="10" fill="#16251c" stroke="#d8f4b6" strokeWidth="2" />
            <circle cx="43" cy="57" r="4" fill="#9db28e" />
            <circle cx="128" cy="57" r="10" fill="#16251c" stroke="#d8f4b6" strokeWidth="2" />
            <circle cx="128" cy="57" r="4" fill="#9db28e" />
            <path d="M25 43h8m121 1h4" stroke="#edffc5" strokeLinecap="round" strokeWidth="3" />
            <text x="77" y="43" fill="#23351d" fontSize="7" fontWeight="800" letterSpacing="1.6" textAnchor="middle">ABHI GO</text>
          </svg>
        </div>
        <div className="scene-pin"><span>✦</span></div>
      </div>
      <div className="scene-label"><i /> YOUR CITY, ONE TAP AWAY</div>
    </div>
    <div className="floating-tag tag-top"><span className="tag-icon">✦</span><div><b>Ride in comfort</b><small>From pickup to drop-off</small></div></div>
    <div className="floating-tag tag-bottom"><span className="tag-check">✓</span><div><b>Your ride is on its way</b><small>Bike · Auto · Car</small></div></div>
  </div>
);

const Start = () => (
  <main className="abhi-landing">
    <div className="landing-hero-shell">
      <nav className="abhi-nav" aria-label="Main navigation">
        <Link to="/" className="abhi-brand" aria-label="Abhi Go home">
          <span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span>
        </Link>
        <div className="abhi-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#why-abhi">Why Abhi Go</a>
        </div>
        <Link to="/captain-login" className="driver-link">Drive with us <span>↗</span></Link>
      </nav>

      <section className="abhi-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> YOUR CITY. YOUR RIDE.</div>
          <h1>Move your way.<br /><span>Love the ride.</span></h1>
          <p className="hero-subtitle">A smoother way to get across town. Pick your ride, choose your destination and let the city come to you.</p>
          <div className="hero-actions">
            <Link to="/login" className="primary-cta">Book a ride <span>→</span></Link>
            <Link to="/signup" className="secondary-cta">Create account</Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><i>R</i><i>A</i><i>S</i></div>
            <div><strong>Made for the way you move</strong><small>Simple booking · Clear fares · Live ride updates</small></div>
          </div>
        </div>
        <CityScene />
      </section>
    </div>

    <section className="ride-types" id="how-it-works">
      <div className="section-heading"><span>CHOOSE YOUR RIDE</span><h2>The right ride for every plan.</h2></div>
      <div className="ride-type-grid">
        <Link to="/login" className="ride-type"><span className="ride-emoji" aria-hidden="true">🏍️</span><div><b>Bike</b><small>Beat the traffic</small></div><span className="ride-arrow" aria-hidden="true">↗</span></Link>
        <Link to="/login" className="ride-type"><span className="ride-emoji" aria-hidden="true">🛺</span><div><b>Auto</b><small>Easy city rides</small></div><span className="ride-arrow" aria-hidden="true">↗</span></Link>
        <Link to="/login" className="ride-type"><span className="ride-emoji" aria-hidden="true">🚘</span><div><b>Car</b><small>More room to relax</small></div><span className="ride-arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <section className="why-section" id="why-abhi">
      <div><span className="section-kicker">THE ABHI GO DIFFERENCE</span><h2>Less waiting.<br />More living.</h2></div>
      <div className="benefit-grid">
        <article><span aria-hidden="true">◎</span><b>Live ride updates</b><p>Follow your ride status and stay in the loop from booking to arrival.</p></article>
        <article><span aria-hidden="true">₹</span><b>Upfront fare estimate</b><p>See an estimated price before you confirm your ride.</p></article>
        <article><span aria-hidden="true">⌖</span><b>Pickup made simple</b><p>Choose your pickup and destination with location suggestions.</p></article>
      </div>
    </section>

    <section className="final-cta">
      <div className="final-cta-content">
        <span className="section-kicker">YOUR NEXT RIDE STARTS HERE</span>
        <h2>Ready when<br />you are.</h2>
        <p>Skip the guesswork. Choose your ride, set your destination and get moving with Abhi Go.</p>
        <div className="hero-actions">
          <Link to="/login" className="primary-cta">Get started <span>→</span></Link>
          <Link to="/captain-signup" className="cta-driver-link">Become a driver ↗</Link>
        </div>
      </div>
      <div className="cta-route-card"><span className="cta-route-label">YOUR CITY, CONNECTED</span><div className="cta-route-line"><i /><b>ABHI GO</b><i /></div><div className="cta-route-meta"><span>Pickup<strong>Where you are</strong></span><span>Drop<strong>Where you want</strong></span></div></div>
    </section>

    <footer className="abhi-footer"><Link to="/" className="abhi-brand"><span className="abhi-brand-mark">a</span><span>abhi<span className="brand-go">go</span></span></Link><span>Move freely. Move with Abhi Go.</span><span>© {new Date().getFullYear()} Abhi Go</span></footer>
  </main>
);

export default Start;
