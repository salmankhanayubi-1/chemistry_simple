'use client';

import React from 'react';

export default function ChemistrySimplePage() {
  // Navigation state engine
  const [view, setView] = React.useState<
    'home' | 'about' | 'fsc' | 'o-level' | 'a-level' | 'basic-chemistry'
  >('home');

  // Sync hash routing on user navigation or page refresh
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'about', 'fsc', 'o-level', 'a-level', 'basic-chemistry'];
      if (validViews.includes(hash)) {
        setView(hash as any);
      } else if (!hash) {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Sync initially

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // CLIENT-SIDE MOUSE GLOW FOLLOWER ENGINE
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const follower = document.createElement('div');
    follower.className = 'mouse-glow-follower';
    document.body.appendChild(follower);

    const moveCursor = (e: MouseEvent) => {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    };

    const addExpand = () => follower.classList.add('expand');
    const removeExpand = () => follower.classList.remove('expand');

    window.addEventListener('mousemove', moveCursor);

    // Dynamic listener attaching
    const setupInteractiveHover = () => {
      const interactiveElements = document.querySelectorAll('a, button, .element-btn');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', addExpand);
        el.addEventListener('mouseleave', removeExpand);
      });
    };

    setupInteractiveHover();

    // Re-check elements on tab/view changes
    const observer = new MutationObserver(setupInteractiveHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      follower.remove();
      observer.disconnect();
    };
  }, [view]);

  // Dynamic Lab Console Interactive Periodic Table Data Engine
  const updateConsole = (
    symbol: string,
    name: string,
    num: string,
    mass: string,
    type: string,
    description: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const cSymbol = document.getElementById('cSymbol');
    const cName = document.getElementById('cName');
    const cFullName = document.getElementById('cFullName');
    const cMass = document.getElementById('cMass');
    const cNum = document.getElementById('cNum');
    const cDesc = document.getElementById('cDesc');

    if (cSymbol) cSymbol.innerText = symbol;
    if (cName) cName.innerText = name;
    if (cFullName) cFullName.innerText = `Element Name: ${name} (${type})`;
    if (cMass) cMass.innerText = mass;
    if (cNum) cNum.innerText = num;
    if (cDesc) cDesc.innerText = description;

    const buttons = document.querySelectorAll('.element-btn');
    buttons.forEach((btn) => btn.classList.remove('active-element'));
    
    e.currentTarget.classList.add('active-element');
  };

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Your message is saved!');
    e.currentTarget.reset();
  };

  return (
    <>
      {/* ALL CSS STYLES WITH INDEPENDENT WHITE THEME & MOUSE FOLLOWER */}
      <style jsx global>{`
        :root {
          --bg-dark: #ffffff; 
          --bg-card: #f8fafc; 
          --primary: #0ea5e9;
          --primary-hover: #0284c7;
          --accent: #16a34a;
          --text-main: #0f172a; 
          --text-muted: #475569; 
          --border: #e2e8f0; 
          --font-main: 'Plus Jakarta Sans', sans-serif;
          --font-heading: 'Space Grotesk', sans-serif;
        }

        body {
          background-color: var(--bg-dark) !important;
          color: var(--text-main) !important;
          font-family: var(--font-main);
          line-height: 1.6;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* MOUSE TRACKING ENGINE SPECIFICATIONS */
        .mouse-glow-follower {
          position: fixed;
          width: 15px;
          height: 15px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 50%;
          pointer-events: none; 
          z-index: 9999; 
          transform: translate(-50%, -50%);
          box-shadow: 0 0 25px 15px rgba(15, 23, 42, 0.15); 
          transition: transform 0.1s cubic-bezier(0.1, 0.8, 0.3, 1),
                      width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease;
          display: block;
        }

        .mouse-glow-follower.expand {
          width: 25px;
          height: 25px;
          background: rgba(15, 23, 42, 0.2);
          box-shadow: 0 0 35px 25px rgba(15, 23, 42, 0.1);
          border-color: transparent;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .section-padding {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          letter-spacing: -0.05em;
          color: var(--text-main);
        }

        .section-header h2 span {
          color: var(--primary);
        }

        .section-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--primary), #2563eb);
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(14, 165, 233, 0.4);
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: #ffffff; 
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 20px 0;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-main);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo span {
          color: var(--primary);
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 35px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 10% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 40%);
          padding-top: 80px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 165, 233, 0.1);
          border: 1px solid rgba(14, 165, 233, 0.2);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-content h1 {
          font-family: var(--font-heading);
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: -0.05em;
          color: var(--text-main);
        }

        .hero-content h1 span {
          background: linear-gradient(to right, var(--primary), #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          color: var(--text-muted);
          font-size: 1.2rem;
          margin-bottom: 40px;
          max-width: 600px;
        }

        .hero-features {
          display: flex;
          gap: 40px;
          margin-top: 60px;
          border-top: 1px solid var(--border);
          padding-top: 30px;
        }

        .hf-item h3 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--text-main);
          margin: 0;
        }

        .hf-item p {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .hero-graphic {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .core-atom {
          position: relative;
          width: 300px;
          height: 300px;
          border: 2px dashed rgba(14, 165, 233, 0.3);
          border-radius: 50%;
          animation: spinner 20s infinite linear;
        }

        .core-atom::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, var(--primary) 0%, #2563eb 100%);
          border-radius: 50%;
          box-shadow: 0 0 40px rgba(14, 165, 233, 0.4);
        }

        @keyframes spinner {
          to { transform: rotate(360deg); }
        }

        .learn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .topic-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
          position: relative;
        }

        .topic-card:hover {
          transform: translateY(-10px);
          border-color: rgba(14, 165, 233, 0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .topic-icon {
          width: 60px;
          height: 60px;
          background: rgba(14, 165, 233, 0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--primary);
          margin-bottom: 24px;
        }

        .topic-card h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: var(--text-main);
        }

        .topic-card p {
          color: var(--text-muted);
          margin-bottom: 24px;
          font-size: 0.95rem;
        }

        .topic-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .tools-showcase {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 40px;
        }

        .tools-header {
          margin-bottom: 35px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
        }

        .tools-header h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--text-main);
          margin: 0;
        }

        .periodic-mini-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 30px;
        }

        .element-btn {
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .element-btn:hover, .element-btn.active-element {
          border-color: var(--primary);
          background: rgba(14, 165, 233, 0.05);
          transform: scale(1.05);
        }

        .element-btn .number {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
          text-align: left;
        }

        .element-btn .symbol {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          margin: 2px 0;
        }

        .element-btn .name {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
        }

        .console-screen {
          background: #f1f5f9;
          border-left: 4px solid var(--primary);
          border-radius: 12px;
          padding: 25px;
        }

        .console-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
        }

        .console-main-info {
          text-align: center;
          border-right: 1px solid var(--border);
          padding-right: 20px;
        }

        .console-main-info .large-symbol {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .console-details h4 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: var(--text-main);
          margin-top: 0;
        }

        .console-details p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .detail-tags {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .tag {
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .about-wrapper {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        .about-image-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-card);
          padding: 15px;
        }

        .img-placeholder {
          width: 100%;
          height: 380px;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--text-main);
          gap: 15px;
          border: 1px dashed rgba(0,0,0,0.1);
        }

        .security-badge {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
        }

        .about-info h3 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          margin-bottom: 5px;
          color: var(--text-main);
          margin-top: 0;
        }

        .about-role {
          color: var(--primary);
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 25px;
          display: block;
        }

        .about-bio {
          color: var(--text-muted);
          margin-bottom: 25px;
          font-size: 1.05rem;
        }

        .inspiration-box {
          background: rgba(14, 165, 233, 0.03);
          border: 1px dashed rgba(14, 165, 233, 0.3);
          border-radius: 16px;
          padding: 24px;
          margin-top: 30px;
        }

        .inspiration-box h4 {
          font-family: var(--font-heading);
          color: var(--text-main);
          margin-bottom: 10px;
          margin-top: 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 50px;
        }

        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 25px;
          border-radius: 16px;
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .cc-info h4 {
          font-family: var(--font-heading);
          color: var(--text-main);
          margin: 0 0 4px 0;
        }

        .cc-info p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin: 0;
        }

        .contact-form-wrapper {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 40px;
          border-radius: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
          color: var(--text-main);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-control {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 18px;
          color: var(--text-main);
          font-family: var(--font-main);
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        textarea.form-control {
          resize: none;
          height: 140px;
        }

        .footer {
          background: #f8fafc;
          border-top: 1px solid var(--border);
          padding: 40px 0;
          text-align: center;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 15px;
        }

        .footer-logo span { color: var(--primary); }

        .footer p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin: 5px 0;
        }

        /* PLACEHOLDER PAGE HELPERS (new, additive only — does not affect existing sections) */
        .placeholder-box {
          border: 2px dashed rgba(14, 165, 233, 0.35);
          border-radius: 16px;
          background: rgba(14, 165, 233, 0.03);
          padding: 30px;
          margin-top: 20px;
          min-height: 120px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .content-block {
          margin-bottom: 60px;
        }

        .content-block h3 {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--text-main);
          margin-bottom: 12px;
        }

        .content-block > p {
          color: var(--text-muted);
          max-width: 800px;
        }

        @media (max-width: 992px) {
          .hero-grid, .about-wrapper, .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-content h1 { font-size: 3rem; }
          .periodic-mini-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar" id="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            Chemistry<span>Simple</span>
          </a>
          <ul className="nav-menu">
            <li><a href="#home" className={`nav-link ${view === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`nav-link ${view === 'about' ? 'active' : ''}`}>About Us</a></li>
            <li><a href="#fsc" className={`nav-link ${view === 'fsc' ? 'active' : ''}`}>F.Sc</a></li>
            <li><a href="#o-level" className={`nav-link ${view === 'o-level' ? 'active' : ''}`}>O-Level</a></li>
            <li><a href="#a-level" className={`nav-link ${view === 'a-level' ? 'active' : ''}`}>A-Level</a></li>
            <li><a href="#basic-chemistry" className={`nav-link ${view === 'basic-chemistry' ? 'active' : ''}`}>Basic Chemistry</a></li>
          </ul>
        </div>
      </nav>

      {/* RENDER DYNAMIC PAGE VIEWS */}
      
      {/* 1. HOME VIEW */}
      {view === 'home' && (
        <>
          {/* HERO SECTION */}
          <header id="home" className="hero">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-content">
                  <div className="hero-badge">Smart Education Hub</div>
                  <i><h1>Every Question <br /><span>Finds Answers</span></h1></i>
                  <p>Your guide to high-quality, structured chemistry content. Follow easy steps to understand complex concepts, and continue learning with us on your chemistry journey.</p>
                  <div>
                    <a href="#learn" className="btn-primary">Start Learning</a>
                  </div>
                  <div className="hero-features">
                    <div className="hf-item">
                      <h3>Fsc</h3>
                      <p>Science Fundamentals</p>
                    </div>
                    <div className="hf-item">
                      <h3>A-level</h3>
                      <p>Advanced Topics</p>
                    </div>
                    <div className="hf-item">
                      <h3>O-level</h3>
                      <p>Core Concepts</p>
                    </div>
                  </div>
                </div>
                <div className="hero-graphic">
                  <div className="core-atom"></div>
                </div>
              </div>
            </div>
          </header>

          {/* LEARNING TOPICS */}
          <section id="learn" className="section-padding" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div className="section-header">
                <h2>Explore <span>Chemistry</span> Topics</h2>
                <p>Pick your domain of interest and unlock comprehensive explanations optimized for fast learning revisions.</p>
              </div>
              <div className="learn-grid">
                <div className="topic-card">
                  <div className="topic-icon">O</div>
                  <h3>Organic Chemistry</h3>
                  <p>Dive deep into hydrocarbons, functional groups, isomerism structures, and complex reaction tracking workflows.</p>
                  <a href="#fsc" className="topic-link">View Notes</a>
                </div>
                <div className="topic-card">
                  <div className="topic-icon">I</div>
                  <h3>Inorganic Chemistry</h3>
                  <p>Understand standard chemical behaviors, periodic properties, chemical bonding theories, and coordination sets.</p>
                  <a href="#fsc" className="topic-link">View Notes</a>
                </div>
                <div className="topic-card">
                  <div className="topic-icon">P</div>
                  <h3>Physical Chemistry</h3>
                  <p>Master thermodynamics, equilibrium states, chemical kinetics solutions, and complex atomic structures mathematically.</p>
                  <a href="#fsc" className="topic-link">View Notes</a>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE TOOLS */}
          <section id="tools" className="section-padding" style={{ background: 'rgba(241, 245, 249, 0.5)', borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div className="section-header">
                <h2>Interactive <span>Lab Tools</span></h2>
                <p>Test and query basic chemical entity weights, properties, and attributes instantaneously through our dashboard engine.</p>
              </div>
              <div className="tools-showcase">
                <div className="tools-header">
                  <h3>Element Snapshot Explorer</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click on any element box below</span>
                </div>
                <div className="periodic-mini-grid">
                  <div className="element-btn" onClick={(e) => updateConsole('H', 'Hydrogen', '1', '1.008', 'Non-Metal', 'Highly reactive gas, essential element forming structural water matrix globally.', e)}>
                    <span className="number">1</span>
                    <span className="symbol">H</span>
                    <span className="name">Hydrogen</span>
                  </div>
                  <div className="element-btn" onClick={(e) => updateConsole('He', 'Helium', '2', '4.0026', 'Noble Gas', 'Colorless, odorless inert element forming the second most abundant light element universe-wide.', e)}>
                    <span className="number">2</span>
                    <span className="symbol">He</span>
                    <span className="name">Helium</span>
                  </div>
                  <div className="element-btn" onClick={(e) => updateConsole('Li', 'Lithium', '3', '6.94', 'Alkali Metal', 'Soft, silvery-white solid metal ideal for advanced multi-layer density dynamic rechargeable batteries.', e)}>
                    <span className="number">3</span>
                    <span className="symbol">Li</span>
                    <span className="name">Lithium</span>
                  </div>
                  <div className="element-btn" onClick={(e) => updateConsole('C', 'Carbon', '6', '12.011', 'Non-Metal', 'Tetravalent nonmetal structural backbone of entire complex organic chemistry and living structures.', e)}>
                    <span className="number">6</span>
                    <span className="symbol">C</span>
                    <span className="name">Carbon</span>
                  </div>
                  <div className="element-btn" onClick={(e) => updateConsole('N', 'Nitrogen', '7', '14.007', 'Reactive Non-metal', 'Prevalent atmospheric trace gas critical for nutritional amino acids and biological organic synthesis compounds.', e)}>
                    <span className="number">7</span>
                    <span className="symbol">N</span>
                    <span className="name">Nitrogen</span>
                  </div>
                  <div className="element-btn" onClick={(e) => updateConsole('O', 'Oxygen', '8', '15.999', 'Chalcogen', 'Highly reactive oxidizer nonmetal element essential for respiratory metabolic cell actions globally.', e)}>
                    <span className="number">8</span>
                    <span className="symbol">O</span>
                    <span className="name">Oxygen</span>
                  </div>
                </div>
                <div className="console-screen">
                  <div className="console-grid">
                    <div className="console-main-info">
                      <div className="large-symbol" id="cSymbol">H</div>
                      <div style={{ color: 'var(--text-muted)', marginTop: '5px' }} id="cName">Hydrogen</div>
                    </div>
                    <div className="console-details">
                      <h4 id="cFullName">Element Name: Hydrogen</h4>
                      <p id="cDesc">Highly reactive gas, essential element forming structural water matrix globally.</p>
                      <div className="detail-tags">
                        <div className="tag">Atomic Mass: <span id="cMass" style={{ color: 'var(--primary)' }}>1.008</span></div>
                        <div className="tag">Number: <span id="cNum" style={{ color: 'var(--accent)' }}>1</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DEVELOPER SECTION */}
          <section id="about" className="section-padding" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div className="section-header">
                <h2>About<span>US</span></h2>
                <i><p>Respectable Personality~Proof.Noor Saleem </p></i>
              </div>
              <div className="about-wrapper">
                <div className="about-image-card">
                  <div className="img-placeholder" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                      Prof. Noor Saleem
                    </span>
                    <span style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                      <img 
                        src="https://i.ibb.co/5Wr7Cyj8/My-Photo-2.jpg"
                        alt="Prof. Noor Saleem" 
                        style={{ 
                          width: '100%', 
                          height: 'auto', 
                          maxWidth: '450px', 
                          display: 'block', 
                          margin: '0 auto', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
                        }} 
                      />
                    </span>
                  </div>
                </div>
                <div className="about-info">
                  <i><u><h3>Prof. Noor Saleem</h3></u></i>
                  <span className="about-role">With over 20 years of experience in teaching Chemistry, I have been dedicated to guiding students of F.Sc. (Grade 11 & 12), MDCAT, and ECAT since 2006. </span>
                  <p className="about-bio">I am the author of Chemistry textbooks for Grade 11 and Grade 12 published under the Federal Board of Intermediate and Secondary Education (FBISE), Islamabad, as well as Chemistry textbooks for Grade 11 and Grade 12 of Jammu & Kashmir. In addition, I have authored Chemistry key books for Grades 9 and 10 aligned with the Federal Board curriculum. </p>

                  <div className="inspiration-box">
                    <h4>Academic Inspiration</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 0 }}>Every great scientist begins with curiosity, every success begins with determination, and every dream becomes reality through education. My goal is to inspire students to learn with confidence, think beyond the textbook, and achieve excellence through knowledge, discipline, and hard work.

Together, we will transform complex concepts into simple understanding and turn academic goals into lifelong success.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="section-padding" style={{ background: 'rgba(241, 245, 249, 0.5)', borderTop: '1px solid var(--border)' }}>
            <div className="container">
              <div className="section-header">
                <h2>Let's Connect <span>Safely</span></h2>
                <p>Have recommendations, notes integration queries, or code feature requests? Drop a message securely.</p>
              </div>
              <div className="contact-grid">
                <div className="contact-sidebar">
                  <div className="contact-card">
                    <div className="cc-info">
                      <h4>Developer Portfolio</h4>
                      <p>Salman Khan - Grade 11 Developer</p>
                    </div>
                  </div>
                  <div className="contact-card">
                    <div className="cc-info">
                      <h4>Academic Advisor</h4>
                      <p>Dr. Noor Saleem (PhD, Chemistry Author)</p>
                    </div>
                  </div>
                </div>
                <div className="contact-form-wrapper">
                  <form id="secureForm" onSubmit={handleFormSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" required />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter secure email" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message Content</label>
                      <textarea className="form-control" placeholder="Write your chemistry query or feedback details..." required></textarea>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message Securely</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 2. ABOUT US VIEW */}
      {view === 'about' && (
        <section className="section-padding" style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className="section-header">
              <h2>About <span>Chemistry Simple</span></h2>
              <p>Chemistry Simple is a learning hub built to make chemistry concepts easy to understand for F.Sc, O-Level, and A-Level students.</p>
            </div>

            <div className="content-block">
              <h3>About Chemistry Simple</h3>
              <p>Chemistry Simple brings together structured notes, practice material, and simple explanations in one place for students preparing for their exams.</p>
              <div className="placeholder-box">
                {/* Add your About Us content here */}
                <p style={{ margin: 0 }}>Welcome to Chemistry Simple, a learning platform created to make chemistry easy, interesting, and understandable for every student.

Our goal is to help students build a strong understanding of chemistry through simple explanations, well-organized notes, solved examples, MCQs, quizzes, and practice exercises. We believe that every student can learn chemistry when difficult concepts are explained in a clear and easy way.

Chemistry Simple is specially designed for students of Grade 9, Grade 10, Grade 11 (First Year), Grade 12 (Second Year), MDCAT, and ECAT. All study material is prepared according to the latest syllabus and focuses on both board examinations and entrance test preparation.

Whether you are studying for school exams or preparing for competitive tests, Chemistry Simple provides everything you need in one place. Our aim is to make learning simple, save students' time, and help them achieve excellent academic results.

At Chemistry Simple, we are committed to providing quality education that inspires confidence, improves knowledge, and supports students in reaching their future goals.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Our Mission</h3>
              <p>Our mission is to make chemistry approachable by breaking down complex topics into clear, easy-to-follow lessons.</p>
              <div className="placeholder-box">
                {/* Add mission details here */}
                <p style={{ margin: 0 }}>Our mission is to make chemistry simple and accessible for every student.

We aim to remove the fear of chemistry by explaining every topic in easy language with step-by-step concepts. We provide high-quality notes, MCQs, quizzes, practice questions, solved examples, and exam preparation material that helps students learn with confidence.

Our mission is to support students from school level to university entrance tests by providing reliable educational resources that improve understanding, problem-solving skills, and academic performance.

We believe that quality education should be available to everyone, and we work every day to make learning chemistry easier, smarter, and more enjoyable.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Our Vision</h3>
              <p>We aim to become a trusted companion for chemistry students at every level, from basics to advanced exam preparation.</p>
              <div className="placeholder-box">
                {/* Add vision details here */}
                <p style={{ margin: 0 }}>Our vision is to become one of the most trusted online chemistry learning platforms for students in Pakistan and around the world.

We want every student to have access to high-quality educational resources regardless of their background. Our goal is to create a modern learning environment where students can study anytime, anywhere, using simple and effective learning methods.

In the future, Chemistry Simple aims to provide complete video lectures, interactive quizzes, smart learning tools, AI-powered study support, and advanced preparation for board exams, MDCAT, ECAT, and other competitive examinations.

We dream of helping thousands of students achieve academic success and build bright careers in science, medicine, engineering, and technology.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>About the Teacher</h3>
              <p>Learn more about the educator behind the content on this site and their teaching background.</p>
              <div className="placeholder-box">
                {/* Add teacher biography here */}
                {/* Add achievements here */}
                {/* Add images here */}
                <p style={{ margin: 0 }}>With years 20 of teaching experience, I have guided students in preparing for school examinations, board exams, MDCAT, and ECAT. My teaching approach focuses on building strong concepts rather than memorizing facts.

I believe that every student has the ability to succeed when they receive proper guidance, clear explanations, and regular practice. My lessons are designed to make learning easy, interesting, and enjoyable for students of all levels.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Why Choose Us</h3>
              <p>A quick look at what makes Chemistry Simple a helpful resource for your studies.</p>
              <div className="placeholder-box">
                {/* Add reasons / highlights here */}
                <p style={{ margin: 0 }}>Chemistry Simple is designed with students' needs in mind. We focus on making chemistry easy to understand and enjoyable to learn.

We offer:

✔ Simple and easy-to-understand explanations

✔ Complete notes for Grade 9, 10, 11, and 12

✔ MDCAT and ECAT preparation material

✔ Chapter-wise MCQs and quizzes

✔ Solved examples and numerical problems

✔ Regularly updated study content

✔ Student-friendly learning methods

✔ Well-organized lessons for quick revision

✔ Free educational resources

✔ Trusted guidance for better exam preparation

Our commitment is to help every student learn with confidence, improve their grades, and achieve their academic goals through quality education.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. F.Sc VIEW */}
      {view === 'fsc' && (
        <section className="section-padding" style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className="section-header">
              <h2>F.Sc <span>Chemistry</span></h2>
              <p>Notes, MCQs, and past papers for Class 11 and Class 12 Chemistry.</p>
            </div>

            <div className="content-block">
              <h3>Introduction</h3>
              <p>An overview of the F.Sc Chemistry syllabus and how to use this section.</p>
              <div className="placeholder-box">
                {/* Add introduction content here */}
                <p style={{ margin: 0 }}>Editable Area: General syllabus introduction text, marking schemes, and exam division tables.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Class 11</h3>
              <div className="placeholder-box">
                {/* Add Chapter 1 Notes */}
                {/* Add Chapter 2 Notes */}
                <p style={{ margin: 0 }}>Editable Area: Insert links to Class 11 individual chapters, formulas sheets, and short definitions lists.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Class 12</h3>
              <div className="placeholder-box">
                {/* Add Chapter Notes */}
                <p style={{ margin: 0 }}>Editable Area: Class 12 notes links, dynamic equation balancing lists, and complex organic mechanism diagrams.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Notes</h3>
              <div className="placeholder-box">
                {/* Add Tables */}
                {/* Add Images */}
                {/* Add PDF Links */}
                <p style={{ margin: 0 }}>Editable Area: Drop PDF link blocks, custom lesson presentations, reference guides, or charts.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>MCQs</h3>
              <div className="placeholder-box">
                {/* Add MCQs */}
                <p style={{ margin: 0 }}>Editable Area: Insert self-assessment interactive quiz widgets or static MCQ list structures.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Chapter List</h3>
              <div className="placeholder-box">
                {/* Add Chapter List here */}
                <p style={{ margin: 0 }}>Editable Area: Drop direct index paths or structured tables of academic chapters.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Past Papers</h3>
              <div className="placeholder-box">
                {/* Add Past Papers / PDF Links */}
                <p style={{ margin: 0 }}>Editable Area: Board exam directories, FBISE past year collections, and marking guideline download resources.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Practice Questions</h3>
              <div className="placeholder-box">
                {/* Add Important Questions */}
                <p style={{ margin: 0 }}>Editable Area: Frequently asked questions, long/short answers guidelines, and numerical problem sheets.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. O-LEVEL VIEW */}
      {view === 'o-level' && (
        <section className="section-padding" style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className="section-header">
              <h2>O-Level <span>Chemistry</span></h2>
              <p>Syllabus, notes, worksheets, and past papers for O-Level Chemistry.</p>
            </div>

            <div className="content-block">
              <h3>Introduction</h3>
              <div className="placeholder-box">
                {/* Add introduction content here */}
                <p style={{ margin: 0 }}>Editable Area: Add general O-Level (5070 / IGCSE 0620) intro guidelines, key books reference names, and general tips.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Syllabus</h3>
              <div className="placeholder-box">
                {/* Add O-Level Syllabus */}
                <p style={{ margin: 0 }}>Editable Area: Core syllabus sections, learning objectives lists, and practical experimental structures.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Notes</h3>
              <div className="placeholder-box">
                {/* Add O-Level Notes */}
                {/* Add Diagrams */}
                <p style={{ margin: 0 }}>Editable Area: Topic breakdown notes, molecular structure charts, or apparatus diagram collections.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>MCQs</h3>
              <div className="placeholder-box">
                {/* Add O-Level MCQs */}
                <p style={{ margin: 0 }}>Editable Area: Insert Paper 1 multiple-choice practices and dynamic question answer boxes.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Worksheets</h3>
              <div className="placeholder-box">
                {/* Add Worksheets */}
                <p style={{ margin: 0 }}>Editable Area: PDF download modules, stoichiometry worksheets, and assessment handouts.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Past Papers</h3>
              <div className="placeholder-box">
                {/* Add Past Papers */}
                <p style={{ margin: 0 }}>Editable Area: Drop year-wise classified past papers, examiner reports, and grade threshold links.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. A-LEVEL VIEW */}
      {view === 'a-level' && (
        <section className="section-padding" style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className="section-header">
              <h2>A-Level <span>Chemistry</span></h2>
              <p>AS and A2 level notes, MCQs, practicals, and past papers.</p>
            </div>

            <div className="content-block">
              <h3>Introduction</h3>
              <div className="placeholder-box">
                {/* Add introduction content here */}
                <p style={{ margin: 0 }}>Editable Area: Introduction to Cambridge International (9701) structures, core grading profiles, and tips.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>AS Level</h3>
              <div className="placeholder-box">
                {/* Add AS Level content here */}
                <p style={{ margin: 0 }}>Editable Area: Inorganic trends, foundational physical structures, basic organic paths, or relevant AS notes.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>A2 Level</h3>
              <div className="placeholder-box">
                {/* Add A2 Level content here */}
                <p style={{ margin: 0 }}>Editable Area: Electrochemistry, organic spectroscopy transitions, entropy equations, and complex transition metal notes.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Notes</h3>
              <div className="placeholder-box">
                {/* Add Notes here */}
                <p style={{ margin: 0 }}>Editable Area: Add concise revision cards, full curriculum notes download guides, and mindmaps.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>MCQs</h3>
              <div className="placeholder-box">
                {/* Add MCQs here */}
                <p style={{ margin: 0 }}>Editable Area: Paper 1 practice pools, structured logic explanations, and common error alerts.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Practical</h3>
              <div className="placeholder-box">
                {/* Add Practical content here */}
                <p style={{ margin: 0 }}>Editable Area: Qualitative analysis reference cards, volumetric titration notes, and thermal experiment charts.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Past Papers</h3>
              <div className="placeholder-box">
                {/* Add Past Papers here */}
                <p style={{ margin: 0 }}>Editable Area: classified past papers list, structured answers keys, and video explanation URLs.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. BASIC CHEMISTRY VIEW */}
      {view === 'basic-chemistry' && (
        <section className="section-padding" style={{ paddingTop: '160px' }}>
          <div className="container">
            <div className="section-header">
              <h2>Basic <span>Chemistry</span></h2>
              <p>Fundamental chemistry concepts for beginners.</p>
            </div>

            <div className="content-block">
              <h3>What is Chemistry?</h3>
              <p>Chemistry is the branch of science that studies the composition, properties, and behavior of matter.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add examples */}
                <p style={{ margin: 0 }}>Chemistry is a branch of science that deals with the study of matter, its composition, properties, and the changes it undergoes. It helps us understand the substances around us and how they react with each other.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Branches of Chemistry</h3>
              <p>Chemistry is divided into major branches such as organic, inorganic, physical, and analytical chemistry.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add tables */}
                <p style={{ margin: 0 }}><h4><strong>Statements for Each Branch of Chemistry</strong></h4><br/><p/>

<h3>Analytical Chemistry</h3><br/>

Analytical chemistry helps in determining the composition and purity of substances. For example, elemental analysis shows the elements present in ammonia, and experiments are performed to determine the percentage purity of glucose. Measuring melting point is also an important analytical method.

<h3>Biochemistry</h3><br/>

Biochemistry studies chemical processes in living organisms. Photosynthesis in plants produces food using sunlight, and proteins like keratin are found in hair and nails. Many chemical reactions occur inside the human body to maintain life.

<h3>Environmental Chemistry</h3><br/>
Environmental chemistry deals with the impact of chemicals on the environment. Pollutants like nitrogen dioxide and sulphur dioxide cause acid rain, and vehicle exhaust gases pollute the air. Plantation helps reduce the greenhouse effect and protect the environment.

<h3>Inorganic Chemistry</h3><br/>
Inorganic chemistry focuses on substances other than carbon compounds. Ammonia is an example of an inorganic compound, and metals like silver can react with air and tarnish. This branch studies properties of metals, minerals, acids, bases, and salts.

<h3>Industrial Chemistry</h3><br/>
Industrial chemistry involves large-scale production of chemicals. The Haber process is used to manufacture ammonia, and cement is produced in industries using chemical processes. Metals are extracted from ores and used in various industries.

<h3>Nuclear Chemistry</h3><br/>
Nuclear chemistry studies changes in the nucleus of atoms. Radioactive elements emit radiation and can change into other elements. Carbon-14 is formed in the atmosphere and is used for dating ancient materials.

<h3>Organic Chemistry</h3><br/>
Organic chemistry deals with carbon-containing compounds. Acetic acid is prepared from ethanol, and hydrocarbons like acetylene consist of carbon and hydrogen. Some organic compounds, like dynamite, release gases during chemical reactions.

<h3>Physical Chemistry</h3><br/>
Physical chemistry explains the laws and principles of matter. It studies changes of state, compression of gases, and energy changes. For example, iodine changes directly from solid to gas, and ice floats on water due to lower density.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Matter</h3>
              <p>Matter is anything that has mass and occupies space, existing in solid, liquid, or gas states.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add diagrams */}
                <p style={{ margin: 0 }}>Editable Area: Physical states animations, temperature transitions, and particles distribution charts.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Atom</h3>
              <p>An atom is the smallest unit of matter that retains the properties of an element.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add images */}
                <p style={{ margin: 0 }}>Editable Area: Atomic sub-particle charges tables, history timelines, and electron orbit configurations diagrams.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Molecule</h3>
              <p>A molecule is formed when two or more atoms bond together chemically.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add examples */}
                <p style={{ margin: 0 }}>Editable Area: Molecules diagrams, covalent bonding models, and chemical compounds examples.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Elements</h3>
              <p>An element is a pure substance made of only one type of atom.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add quizzes */}
                <p style={{ margin: 0 }}>Editable Area: Elements classification groups, historical names catalogs, and basic element quizzes.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Compounds</h3>
              <p>A compound is a substance formed when two or more different elements combine chemically.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add MCQs */}
                <p style={{ margin: 0 }}>Editable Area: Compounds formula guides, chemical synthesis equations, and multiple-choice tests.</p>
              </div>
            </div>

            <div className="content-block">
              <h3>Mixtures</h3>
              <p>A mixture is a combination of two or more substances that are not chemically bonded.</p>
              <div className="placeholder-box">
                {/* Add complete explanation */}
                {/* Add examples */}
                {/* Add tables */}
                <p style={{ margin: 0 }}>Editable Area: Homogeneous vs Heterogeneous separation tables, separation techniques diagrams, and assignments.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">Chemistry<span>Simple</span></div>
          <p>&copy; 2026 ChemistrySimple Education Hub. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '5px' }}>Designed & Hardcoded with care by Salman Khan.</p>
        </div>
      </footer>
    </>
  );
}