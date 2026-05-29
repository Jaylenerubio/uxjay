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

function pronounceName() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance('Jay-leen Roo-bee-oh');
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

        {/* Sticky 1 — lavender */}
        <div className="floater floater-1" style={{ top: '10%', right: '7%' }}>
          <div className="sticky-with-sig sticky-lavender2">
            <div className="sticky-msg">Currently @ NYC Mayor's Office for Economic Opportunity 🏙️</div>
            <div className="sticky-sig">Jaylene Rubio</div>
          </div>
        </div>

        {/* Sticky 2 — periwinkle */}
        <div className="floater floater-2" style={{ bottom: '22%', right: '5%' }}>
          <div className="sticky-with-sig sticky-periwinkle">
            <div className="sticky-msg">Want to leave me a sticky?<br />Click here!</div>
            <div className="sticky-sig">Jaylene Rubio</div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        {/* Typewriter greeting */}
        <div className="typewriter-wrap">
          <Typewriter text="Hi, I'm Jaylene 👋" speed={70} startDelay={500} />
        </div>

        {/* Pronunciation */}
        <div className="pronunciation-line">
          <span className="pronunciation-phonetic">/ jay-LEEN /</span>
          <button className="pronunciation-btn" onClick={pronounceName}>
            🔊 hear my name
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

function AboutSection() {
  const skillColorMap = {
    'UX & Research':     { bg: '#E8F2FF', color: '#1E5EBF', dot: '#4D96FF' },
    'Product Design':    { bg: '#E3F9EE', color: '#1A7A4A', dot: '#3DC47E' },
    'Tools':             { bg: '#F0EBFF', color: '#4A2B9E', dot: '#9B72E6' },
    'AI & Emerging':     { bg: '#FFE8E8', color: '#C42B2B', dot: '#FF6B6B' }
  };

  return (
    <section className="section" id="about" style={{ background: 'var(--card)' }}>
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

      <div className="about-grid">
        {/* Left: bio + experience */}
        <div>
          <AnimBlock>
            <div className="about-bio-block mb-32">
              <div className="mb-16">
                <div className="sticky sticky-yellow" style={{ fontSize: 15, padding: '10px 16px', marginBottom: 20, display: 'inline-block' }}>
                  Hey, I'm Jaylene 👋
                </div>
              </div>
              <p className="body-lg mb-16">{about.bio}</p>
              <p className="body">{about.bio2}</p>

              <div className="tool-chips mt-24">
                {['English', 'Spanish (fluent)', 'UX Strategy', 'Design Systems', 'Civic Tech'].map(t => (
                  <span key={t} className="tool-chip">{t}</span>
                ))}
              </div>
            </div>
          </AnimBlock>

          <AnimBlock delay={1}>
            <div>
              <div className="flex items-center gap-12 mb-24">
                <span className="frame-label">◈ Experience</span>
              </div>
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

        {/* Right: stats + skills */}
        <div>
          <AnimBlock>
            <div className="flex items-center gap-12 mb-24">
              <span className="frame-label">◈ Impact</span>
            </div>
            <div className="stats-grid mb-40">
              {about.stats.map((stat, i) => (
                <div key={i} className="stat-box">
                  <div className="stat-number" style={{ color: ['#4D96FF','#3DC47E','#9B72E6','#FF6B6B','#FF9A3C'][i % 5] }}>
                    {stat.number}
                  </div>
                  <div className="stat-desc">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimBlock>

          <AnimBlock delay={1}>
            <div className="flex items-center gap-12 mb-24">
              <span className="frame-label">◈ Skills</span>
            </div>
            <div className="skills-block">
              {Object.entries(about.skills).map(([group, skills]) => {
                const colors = skillColorMap[group] || { bg: '#f5f5f5', color: '#666', dot: '#999' };
                return (
                  <div key={group}>
                    <div className="skill-group-label" style={{ color: colors.dot }}>
                      {group}
                    </div>
                    <div className="skill-chips">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="skill-chip"
                          style={{ background: colors.bg, color: colors.color }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimBlock>

          <AnimBlock delay={2}>
            <div className="memoji-quote-wrap">
              <img
                src="/memoji.png"
                alt="Jaylene's memoji"
                className="memoji-img"
              />
              <div className="memoji-bubble">
                "I came to design through education and psychology — I think about behavior before I open Figma."
              </div>
            </div>
          </AnimBlock>
        </div>
      </div>
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
