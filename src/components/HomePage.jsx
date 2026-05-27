import { useEffect, useRef } from 'react';
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

function HeroSection() {
  return (
    <section className="hero canvas-bg">
      {/* Floating decorative FigJam elements */}
      <div className="hero-floaters">
        <div className="floater floater-1">
          <div className="sticky sticky-yellow" style={{ fontSize: 16, padding: '14px 18px' }}>
            Currently @ NYC Mayor's Office 🏙️
          </div>
        </div>
        <div className="floater floater-2">
          <div className="sticky sticky-coral" style={{ fontSize: 15, padding: '12px 16px', maxWidth: 160 }}>
            2M+ New Yorkers impacted
          </div>
        </div>
        <div className="floater floater-3">
          <div className="cursor-label cursor-label-green">Available for new roles</div>
        </div>
        <div className="floater floater-4">
          <span className="annotation" style={{ fontSize: 16 }}>
            <span className="annotation-arrow">↑</span>
            civic tech specialist
          </span>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-role-row" style={{ animation: 'fadeUp 0.6s ease forwards', opacity: 0 }}>
          <span className="frame-label">Senior Product Designer</span>
          <span className="cursor-label cursor-label-purple">NYC-based</span>
        </div>

        <div className="hero-name" style={{ animation: 'fadeUp 0.65s 0.1s ease forwards', opacity: 0 }}>
          <h1 className="display-xl">Jaylene<br />Rubio.</h1>
        </div>

        <p
          className="hero-sub"
          style={{ animation: 'fadeUp 0.65s 0.2s ease forwards', opacity: 0 }}
        >
          I design city systems that actually work for the people who need them most. UX strategy, design systems, and civic tech — scaled to 2M+ New Yorkers.
        </p>

        <div className="hero-ctas" style={{ animation: 'fadeUp 0.65s 0.3s ease forwards', opacity: 0 }}>
          <button className="btn btn-primary" onClick={() => {
            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            View My Work ↓
          </button>
          <a className="btn btn-outline" href="mailto:jaylenerubio1@gmail.com">
            Let's Talk →
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ cs, onClick, index }) {
  return (
    <AnimBlock delay={(index % 2) + 1}>
      <div className="cs-card" onClick={() => onClick(cs.id)}>
        <div className="cs-card-visual">
          <div
            className="cs-card-visual-bg"
            style={{ background: cs.bgGradient }}
          />
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
            <div style={{ marginTop: 40 }}>
              <div
                className="sticky sticky-lavender"
                style={{
                  fontSize: 17,
                  padding: '20px 24px',
                  display: 'block',
                  lineHeight: 1.5,
                  maxWidth: 320
                }}
              >
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
