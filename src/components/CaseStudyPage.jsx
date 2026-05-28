import { useEffect, useRef } from 'react';
import { caseStudies } from '../data/portfolioData';

function AnimBlock({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`anim-fade-up ${delay ? `anim-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function CaseStudyPage({ id, onBack, onCaseStudy }) {
  const cs = caseStudies.find(c => c.id === id);
  if (!cs) return null;

  const nextCs = caseStudies[(caseStudies.findIndex(c => c.id === id) + 1) % caseStudies.length];

  return (
    <div className="canvas-bg" style={{ minHeight: '100vh', position: 'relative' }}>

      {/* ── Back bar ── */}
      <div className="cs-back-bar">
        <button className="cs-back-btn" onClick={onBack}>← My projects</button>
        <span className="cs-back-title">{cs.title}</span>
      </div>

      {/* ── FigJam cursor ── */}
      <div style={{
        position: 'fixed',
        bottom: 40,
        right: 40,
        zIndex: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 3,
        animation: 'float2 7s ease-in-out infinite',
        pointerEvents: 'none'
      }}>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path d="M2 2L15.5 10.5L9.5 12L6.5 19L2 2Z" fill="#6B7AFF" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <div className="figjam-cursor-name">Jaylene Rubio</div>
      </div>

      {/* ── Hero ── */}
      <div className="cse-hero" style={{ background: 'transparent' }}>
        <AnimBlock>
          <div className="cse-project-tag" style={{ color: cs.accentColor }}>
            {cs.title.toUpperCase()} · {cs.role.toUpperCase()}
          </div>
          <h1 className="cse-headline">{cs.editorialHeadline}</h1>
        </AnimBlock>

        {/* Meta row */}
        <AnimBlock delay={1}>
          <div className="cse-meta">
            <div className="cse-meta-item">
              <span className="cse-meta-label">Timeline</span>
              <span className="cse-meta-val">{cs.timeline}</span>
            </div>
            <div className="cse-meta-item">
              <span className="cse-meta-label">Company</span>
              <span className="cse-meta-val">{cs.company}</span>
            </div>
            <div className="cse-meta-item">
              <span className="cse-meta-label">Tools</span>
              <span className="cse-meta-val">{cs.tools.join(', ')}</span>
            </div>
            <div className="cse-meta-item">
              <span className="cse-meta-label">Team</span>
              <span className="cse-meta-val">{cs.team}</span>
            </div>
          </div>
        </AnimBlock>
      </div>

      {/* ── Main content card ── */}
      <div className="cse-content-card">

      {/* ── Product + Challenge ── */}
      <div className="cse-section cse-two-col">
        <AnimBlock>
          <div className="cse-col-label">The product</div>
          <p className="cse-body">{cs.productDesc}</p>
        </AnimBlock>
        <AnimBlock delay={1}>
          <div className="cse-col-label">The challenge</div>
          <p className="cse-body">{cs.challenge}</p>
        </AnimBlock>
      </div>

      {/* ── Visual banner ── */}
      <AnimBlock>
        <div className="cse-banner" style={{ background: cs.bgGradient }}>
          <div className="cse-banner-inner">
            <p className="cse-banner-eyebrow">{cs.company}</p>
            <h2 className="cse-banner-title">{cs.tagline}</h2>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {cs.tags.map(t => (
                <span key={t} style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '7px 18px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  backdropFilter: 'blur(8px)'
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </AnimBlock>

      {/* ── Outcomes / Stats ── */}
      <div className="cse-section">
        <AnimBlock>
          <div className="cse-section-eyebrow">Page outcomes</div>
        </AnimBlock>
        <div className="cse-stats-row">
          {cs.results.map((r, i) => (
            <AnimBlock key={i} delay={i % 4} className="cse-stat-block">
              <div className="cse-stat-num" style={{ color: cs.accentColor }}>{r.number}</div>
              <div className="cse-stat-text">{r.label}</div>
            </AnimBlock>
          ))}
        </div>
      </div>

      {/* ── Design process ── */}
      <div className="cse-section cse-section-border">
        <AnimBlock>
          <div className="cse-section-eyebrow">My design process</div>
          <p className="cse-body" style={{ maxWidth: 640, marginBottom: 36 }}>
            To validate assumptions and inform my design decisions I began user testing with {cs.team.split(',')[0].toLowerCase()} and key stakeholders.
          </p>
        </AnimBlock>

        <div className="cse-process-cols">
          {cs.process.map((phase, i) => (
            <AnimBlock key={phase.phase} delay={i % 2}>
              <div className="cse-process-item">
                <div className="cse-process-phase" style={{ color: cs.accentColor }}>
                  {String(i + 1).padStart(2, '0')} — {phase.phase}
                </div>
                <ul className="cse-process-list">
                  {phase.activities.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>

      {/* ── Usability findings + Solutions ── */}
      {cs.process.map((phase, i) => (
        <div key={phase.phase} className="cse-section cse-section-border">
          <div className="cse-two-col cse-prob-sol">
            <AnimBlock>
              <div className="cse-col-label" style={{ color: '#E04444' }}>Usability concern</div>
              <p className="cse-body">{phase.insight}</p>
            </AnimBlock>
            <AnimBlock delay={1}>
              <div className="cse-col-label" style={{ color: cs.accentColor }}>Solution</div>
              <p className="cse-body">{phase.activities[phase.activities.length - 1]}</p>
            </AnimBlock>
          </div>
        </div>
      ))}

      {/* ── Reflection ── */}
      <div className="cse-section cse-section-border">
        <AnimBlock>
          <div className="cse-section-eyebrow">Team accomplishments</div>
          <blockquote className="cse-reflection">
            "{cs.reflection}"
          </blockquote>
        </AnimBlock>
      </div>

      </div>{/* end content card */}

      {/* ── Next project ── */}
      <div className="cse-section cse-section-border">
        <AnimBlock>
          <div className="cse-section-eyebrow">Next project</div>
          <div className="cse-next-card" onClick={() => onCaseStudy(nextCs.id)}>
            <div>
              <div className="cse-project-tag" style={{ color: nextCs.accentColor, marginBottom: 8 }}>
                {nextCs.title.toUpperCase()}
              </div>
              <h3 className="cse-next-title">{nextCs.editorialHeadline}</h3>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                {nextCs.tags.map(t => (
                  <span key={t} className="cs-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="cs-card-arrow" style={{ flexShrink: 0 }}>→</div>
          </div>
        </AnimBlock>
      </div>

    </div>
  );
}
