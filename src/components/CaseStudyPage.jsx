import { useEffect, useRef } from 'react';
import { caseStudies, about } from '../data/portfolioData';

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

const phaseColors = {
  'Discover': { bg: '#FFF4B8', border: '#FFD93D', text: '#4A3800', headerBg: '#FFD93D' },
  'Define':   { bg: '#FFE8E8', border: '#FF6B6B', text: '#5C1010', headerBg: '#FF6B6B' },
  'Design':   { bg: '#E8F2FF', border: '#4D96FF', text: '#0A2E6E', headerBg: '#4D96FF' },
  'Deliver':  { bg: '#E3F9EE', border: '#3DC47E', text: '#0D3E22', headerBg: '#3DC47E' },
};

export default function CaseStudyPage({ id, onBack, onCaseStudy }) {
  const cs = caseStudies.find(c => c.id === id);
  if (!cs) return null;

  const phaseLabels = ['01', '02', '03', '04'];

  return (
    <div className="cs-page canvas-bg">
      {/* Back bar */}
      <div className="cs-back-bar">
        <button className="cs-back-btn" onClick={onBack}>
          ← Back to Work
        </button>
        <span className="cs-back-title">{cs.title}</span>
      </div>

      {/* Hero */}
      <div className="cs-hero" style={{ background: cs.bgGradient }}>
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content">
          <div className="cs-hero-company">{cs.company}</div>
          <h1 className="cs-hero-title">{cs.title}</h1>
          <p className="cs-hero-tagline">{cs.tagline}</p>
        </div>
      </div>

      {/* Metadata row */}
      <div className="cs-meta-row">
        <div className="cs-meta-item">
          <div className="cs-meta-label">Role</div>
          <div className="cs-meta-value">{cs.role}</div>
        </div>
        <div className="cs-meta-item">
          <div className="cs-meta-label">Timeline</div>
          <div className="cs-meta-value">{cs.timeline}</div>
        </div>
        <div className="cs-meta-item">
          <div className="cs-meta-label">Team</div>
          <div className="cs-meta-value" style={{ fontSize: 13 }}>{cs.team}</div>
        </div>
        <div className="cs-meta-item">
          <div className="cs-meta-label">Tools</div>
          <div className="tool-chips" style={{ marginTop: 4 }}>
            {cs.tools.slice(0, 3).map(t => (
              <span key={t} className="tool-chip" style={{ fontSize: 12, padding: '3px 8px' }}>{t}</span>
            ))}
            {cs.tools.length > 3 && (
              <span className="tool-chip" style={{ fontSize: 12, padding: '3px 8px', color: 'var(--text-muted)' }}>
                +{cs.tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="cs-body">

        {/* Overview */}
        <div className="cs-section">
          <AnimBlock>
            <div className="cs-section-label">Overview</div>
            <h2 className="cs-section-title">The Project</h2>
            <p className="cs-section-body">{cs.overview}</p>
          </AnimBlock>
        </div>

        {/* Challenge */}
        <div className="cs-section">
          <AnimBlock>
            <div className="cs-section-label">Context</div>
            <h2 className="cs-section-title">The Problem</h2>
            <p className="cs-section-body">{cs.challenge}</p>

            <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div
                className="sticky sticky-coral"
                style={{ fontSize: 15, padding: '16px 20px', maxWidth: 260, lineHeight: 1.5 }}
              >
                <strong>Key challenge:</strong> {cs.challenge.split('.')[0]}.
              </div>
            </div>
          </AnimBlock>
        </div>

        {/* Process */}
        <div className="cs-section">
          <AnimBlock>
            <div className="cs-section-label">Process</div>
            <h2 className="cs-section-title">How I Worked</h2>
            <p className="cs-section-body mb-8">
              A four-phase design process — moving from understanding the problem deeply before defining, designing, and delivering.
            </p>
          </AnimBlock>

          <div className="process-grid">
            {cs.process.map((phase, i) => {
              const colors = phaseColors[phase.phase] || phaseColors['Discover'];
              return (
                <AnimBlock key={phase.phase} delay={i % 2 === 0 ? 0 : 1}>
                  <div className="process-card">
                    <div
                      className="process-card-header"
                      style={{ background: colors.headerBg }}
                    >
                      <span className="process-card-header-emoji">{phase.emoji}</span>
                      <span
                        className="process-card-header-title"
                        style={{ color: i < 2 ? '#1A1523' : 'white' }}
                      >
                        {phaseLabels[i]} — {phase.phase}
                      </span>
                    </div>
                    <div className="process-activities">
                      {phase.activities.map((act, j) => (
                        <div key={j} className="process-activity">{act}</div>
                      ))}
                    </div>
                    <div
                      className="process-insight"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {phase.insight}
                    </div>
                  </div>
                </AnimBlock>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="cs-section">
          <AnimBlock>
            <div className="cs-section-label">Outcomes</div>
            <h2 className="cs-section-title">The Impact</h2>
          </AnimBlock>

          <div className="results-grid">
            {cs.results.map((r, i) => (
              <AnimBlock key={i} delay={i % 4}>
                <div className="result-card">
                  <div
                    className="result-number"
                    style={{ color: [cs.accentColor, '#FF6B6B', '#FFD93D', '#3DC47E'][i % 4] }}
                  >
                    {r.number}
                  </div>
                  <div className="result-label">{r.label}</div>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div className="cs-section">
          <AnimBlock>
            <div className="cs-section-label">Reflection</div>
            <h2 className="cs-section-title">What I Learned</h2>
            <div className="reflection-card">
              <span className="reflection-quote-mark">"</span>
              <p className="reflection-text">{cs.reflection}</p>
            </div>
          </AnimBlock>
        </div>

        {/* Next project */}
        <AnimBlock>
          <div style={{
            marginTop: 40,
            padding: '40px',
            background: 'var(--card)',
            border: '1px solid var(--card-border)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <div>
              <div className="subheading mb-8">Next Case Study</div>
              {(() => {
                const idx = caseStudies.findIndex(c => c.id === id);
                const next = caseStudies[(idx + 1) % caseStudies.length];
                return (
                  <>
                    <div className="heading">{next.title}</div>
                    <div className="body-sm mt-8" style={{ maxWidth: 360 }}>{next.shortDesc}</div>
                  </>
                );
              })()}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                const idx = caseStudies.findIndex(c => c.id === id);
                const next = caseStudies[(idx + 1) % caseStudies.length];
                onCaseStudy(next.id);
              }}
            >
              View Project →
            </button>
          </div>
        </AnimBlock>
      </div>
    </div>
  );
}
