import { useState, useEffect, useRef } from 'react';
import { caseStudies, about } from '../data/portfolioData';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimBlock({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`anim-fade-up ${delay ? `anim-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

function Typewriter({ text, speed = 70, startDelay = 500 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(timer); setDone(true); }
      }, speed);
      return () => clearInterval(timer);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
}

function pronounceFirstName() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance('Jay-leen');
  u.rate = 0.75;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

function HeroSection() {
  return (
    <section className="hero canvas-bg">
      <div className="hero-floaters">
        {/* Floating cursor — appears after frame is drawn */}
        <div className="floater" style={{ top: '54%', right: '36%', animation: 'float2 7s ease-in-out infinite 2.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="figjam-cursor-group" style={{ opacity: 0, animation: 'fadeIn 0.4s 2.1s ease forwards' }}>
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path d="M2 2L15.5 10.5L9.5 12L6.5 19L2 2Z" fill="#6B7AFF" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <div className="figjam-cursor-name">Jaylene Rubio</div>
          </div>
        </div>

        {/* Sticky 1 — lavender, with tape */}
        <div className="floater floater-1" style={{ top: '10%', right: '7%' }}>
          <div className="sticky-with-sig sticky-lavender2 sticky-taped">
            <div className="sticky-msg">Currently @ NYC Mayor's Office for Economic Opportunity 🏙️</div>
            <div className="sticky-sig">Jaylene Rubio</div>
          </div>
        </div>

        {/* Board link — replaces sticky 2 */}
        <div className="floater floater-2" style={{ bottom: '22%', right: '5%' }}>
          <a
            href="https://jaylenes-board.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-board-link"
          >
            📌 Leave me a sticky
          </a>
        </div>
      </div>

      <div className="hero-content">
        {/* Greeting with inline phonetic + speaker */}
        <div className="typewriter-wrap">
          <Typewriter text="Hi, I'm Jaylene" speed={70} startDelay={500} />
          <span className="phonetic-inline">/ jay-LEEEN /</span>
          <button className="speaker-pulse-btn" onClick={pronounceFirstName} aria-label="Hear my name pronounced">
            🔊
          </button>
        </div>

        {/* Heading with FigJam selection frame — cursor traces the border */}
        <div className="figjam-selection mb-24">
          <div className="sel-line sel-top" />
          <div className="sel-line sel-right" />
          <div className="sel-line sel-bottom" />
          <div className="sel-line sel-left" />
          <div className="sel-corner sel-tl" />
          <div className="sel-corner sel-tr" />
          <div className="sel-corner sel-bl" />
          <div className="sel-corner sel-br" />
          {/* Cursor that traces the frame perimeter */}
          <div className="frame-tracer">
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path d="M2 2L15.5 10.5L9.5 12L6.5 19L2 2Z" fill="#6B7AFF" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="display-xl" style={{ animation: 'fadeUp 0.6s 0.1s ease forwards', opacity: 0 }}>
            Sr. Product<br />Designer
          </h1>
        </div>

        <p className="hero-sub" style={{ animation: 'fadeUp 0.65s 0.2s ease forwards', opacity: 0 }}>
          Turning complex city systems into clear, human experiences for the millions who call New York City home.
        </p>

        <div className="hero-ctas" style={{ animation: 'fadeUp 0.65s 0.3s ease forwards', opacity: 0 }}>
          <button className="btn btn-primary" onClick={() => {
            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View My Work ↓
          </button>
          <a className="btn btn-outline" href="mailto:jaylenerubio1@gmail.com">
            Connect with me →
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ cs, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimBlock delay={(index % 2) + 1}>
      <div
        className="cs-card"
        onClick={() => !cs.comingSoon && onClick(cs.id)}
        onMouseEnter={() => cs.comingSoon && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={cs.comingSoon ? { cursor: 'default' } : {}}
      >
        <div className="cs-card-visual">
          <div
            className="cs-card-visual-bg"
            style={{ background: cs.bgGradient }}
          />
          {cs.comingSoon && hovered && (
            <div className="cs-card-coming-soon">
              <span className="coming-soon-badge">Coming Soon</span>
            </div>
          )}
          {/* Sticky metric overlaid on visual */}
          <div className="cs-card-metric">
            <div
              className="sticky"
              style={{
                background: 'white',
                color: cs.accentDark,
                transform: 'rotate(-1.5deg)',
                fontSize: 15,
                padding: '10px 16px',
                boxShadow: '2px 3px 12px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 700,
                display: 'block',
                lineHeight: 1
              }}>
                {cs.metricPrimary}
              </span>
              {cs.metricLabel}
            </div>
          </div>
        </div>

        <div className="cs-card-body">
          <div className="cs-card-tags">
            {cs.tags.map(tag => <span key={tag} className="cs-tag">{tag}</span>)}
          </div>

          <h3 className="heading mb-8">{cs.title}</h3>
          <p className="body-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {cs.shortDesc}
          </p>

          <div className="cs-card-footer">
            <span className="cs-card-footer-label">{cs.role} · {cs.company.split(' ').slice(-1)[0]}</span>
            <span className="cs-card-arrow">→</span>
          </div>
        </div>
      </div>
    </AnimBlock>
  );
}

function WorkSection({ onCaseStudy }) {
  return (
    <section className="section canvas-bg" id="work">
      <div className="section-header">
        <AnimBlock>
          <div className="flex items-center gap-16 mb-16">
            <span className="frame-label">◈ Selected Work</span>
          </div>
          <h2 className="display-lg" style={{ maxWidth: 600 }}>
            Case studies that moved the needle
          </h2>
          <p className="body-lg mt-16" style={{ maxWidth: 520 }}>
            Government products, civic platforms, and enterprise tools — all designed with systems thinking and real-world impact.
          </p>
        </AnimBlock>
      </div>

      <div className="work-grid">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.id} cs={cs} onClick={onCaseStudy} index={i} />
        ))}
      </div>
    </section>
  );
}

function InOfficeTab() {
  return (
    <div className="about-grid">
      <AnimBlock>
        <div className="about-card">
          <div className="about-card-header mb-20">
            <img src="/memoji.png" alt="Jaylene's memoji" className="about-memoji-sm" />
            <h3 className="about-card-name">My name is Jaylene</h3>
          </div>
          <p className="body mb-24">{about.bio}</p>

          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 16 }}>Skills</span>
          <div className="mb-24">
            {Object.entries(about.inOfficeSkills).map(([group, skills], gi) => (
              <div key={group} className="mb-16">
                <div className="skill-group-label" style={{ color: gi === 0 ? '#1E5EBF' : '#9B2B7A' }}>
                  {group}
                </div>
                <div className="skill-chips">
                  {skills.map(skill => (
                    <span key={skill} className="skill-chip"
                      style={{ background: gi === 0 ? '#E8F2FF' : '#FFE8F5', color: gi === 0 ? '#1E5EBF' : '#9B2B7A' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 16 }}>Impact</span>
          <div className="impact-stats-grid">
            {about.stats.map((stat, i) => (
              <div key={i} className="impact-stat-card">
                <div className="impact-stat-top">
                  <span className="impact-stat-num">{stat.number}</span>
                  <span className="impact-stat-context">↑ {stat.context}</span>
                </div>
                <div className="impact-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimBlock>

      <AnimBlock delay={1}>
        <div className="about-card">
          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 24 }}>Resume</span>
          <div className="exp-timeline">
            {about.experience.map((exp, i) => (
              <div key={i} className="exp-item">
                <div className="exp-dot-col">
                  <div className="exp-dot" />
                  {i < about.experience.length - 1 && <div className="exp-line" />}
                </div>
                <div className="exp-content">
                  <div className="exp-role">{exp.title}</div>
                  <div className="exp-company">{exp.company}</div>
                  <div className="exp-meta">{exp.period} · {exp.location}</div>
                  <div className="exp-highlight">{exp.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimBlock>
    </div>
  );
}

function OutOfOfficeTab() {
  return (
    <div className="about-grid">
      <AnimBlock>
        <div className="about-card">
          <div className="about-photo-row mb-20">
            <div>
              <h3 className="about-card-name mb-8">[insert photo of me]</h3>
            </div>
            <div className="about-photo-box" />
          </div>
          <p className="body mb-24">{about.personalBio}</p>

          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 12 }}>Facts</span>
          <div className="skill-group-label mt-12" style={{ color: '#FF6B6B' }}>Random</div>
          <div className="skill-chips">
            {about.personalFacts.map(fact => (
              <span key={fact} className="skill-chip" style={{ background: '#F0EBFF', color: '#4A2B9E' }}>
                {fact}
              </span>
            ))}
          </div>
        </div>
      </AnimBlock>

      <AnimBlock delay={1}>
        <div className="about-card">
          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 24 }}>Life in Numbers</span>
          <div className="impact-stats-grid mb-32">
            {about.lifeNumbers.map((stat, i) => (
              <div key={i} className="impact-stat-card">
                <div className="impact-stat-top">
                  <span className="impact-stat-num">{stat.number}</span>
                  <span className="impact-stat-context">↑ {stat.context}</span>
                </div>
                <div className="impact-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <h3 className="heading mb-12">Photo gallery</h3>
          <span className="frame-label" style={{ display: 'inline-flex', marginBottom: 12 }}>Insert photos</span>
          <div className="photo-gallery-grid mt-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="photo-gallery-item" />
            ))}
          </div>
        </div>
      </AnimBlock>
    </div>
  );
}

function AboutSection() {
  const [tab, setTab] = useState('in-office');

  return (
    <section className="section canvas-bg" id="about">
      <div className="section-header">
        <AnimBlock>
          <div className="flex items-center gap-16 mb-16">
            <span className="frame-label">◈ About</span>
          </div>
          <h2 className="display-lg" style={{ maxWidth: 640 }}>
            Designing for people, not just screens
          </h2>
        </AnimBlock>
      </div>

      <AnimBlock>
        <div className="about-tabs mb-32">
          <button
            className={`about-tab ${tab === 'in-office' ? 'active' : ''}`}
            onClick={() => setTab('in-office')}
          >
            In the office
          </button>
          <button
            className={`about-tab ${tab === 'out-of-office' ? 'active' : ''}`}
            onClick={() => setTab('out-of-office')}
          >
            Out of Office
          </button>
        </div>
      </AnimBlock>

      {tab === 'in-office' ? <InOfficeTab /> : <OutOfOfficeTab />}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-name">Jaylene Rubio</span>
        <span className="footer-tagline">Senior Product Designer · NYC</span>
      </div>
      <div className="footer-links">
        <a className="footer-link" href="mailto:jaylenerubio1@gmail.com">Email</a>
        <a className="footer-link" href="#">LinkedIn</a>
        <span
          className="annotation"
          style={{ fontSize: 15, color: 'var(--text-muted)' }}
        >
          <span>→</span> let's build something good
        </span>
      </div>
    </footer>
  );
}

export default function HomePage({ onCaseStudy }) {
  return (
    <div>
      <HeroSection />
      <WorkSection onCaseStudy={onCaseStudy} />
      <AboutSection />
      <Footer />
    </div>
  );
}
