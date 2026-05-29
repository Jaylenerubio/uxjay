import { useState } from 'react';

const ZODIAC_SIGNS = [
  { name: 'Aries',       dates: 'March 21 – April 19',      element: 'Fire · Cardinal'  },
  { name: 'Taurus',      dates: 'April 20 – May 20',        element: 'Earth · Fixed'    },
  { name: 'Gemini',      dates: 'May 21 – June 20',         element: 'Air · Mutable'    },
  { name: 'Cancer',      dates: 'June 21 – July 22',        element: 'Water · Cardinal' },
  { name: 'Leo',         dates: 'July 23 – August 22',      element: 'Fire · Fixed'     },
  { name: 'Virgo',       dates: 'August 23 – September 22', element: 'Earth · Mutable'  },
  { name: 'Libra',       dates: 'September 23 – October 22',element: 'Air · Cardinal'   },
  { name: 'Scorpio',     dates: 'October 23 – November 21', element: 'Water · Fixed'    },
  { name: 'Sagittarius', dates: 'November 22 – December 21',element: 'Fire · Mutable'   },
  { name: 'Capricorn',   dates: 'December 22 – January 19', element: 'Earth · Cardinal' },
  { name: 'Aquarius',    dates: 'January 20 – February 18', element: 'Air · Fixed'      },
  { name: 'Pisces',      dates: 'February 19 – March 20',   element: 'Water · Mutable'  },
];

const FORTUNES = {
  Aries:       'Your boldness opens doors today—take the first step and the path will reveal itself.',
  Taurus:      'Your steady energy is your superpower; something you build now will last longer than you expect.',
  Gemini:      'Your words carry extra magic right now—start the conversation you\'ve been putting off.',
  Cancer:      'Protecting your peace today creates space for exactly the connection you\'ve been craving.',
  Leo:         'The spotlight finds you when you act from the heart, not the ego—someone is quietly inspired by you.',
  Virgo:       'Let go of one tiny perfection today and watch how much more smoothly everything flows.',
  Libra:       'A small decision you make today brings a surprising sense of balance and relief.',
  Scorpio:     'Trust the instinct that keeps whispering—what feels intense now will transform into clarity.',
  Sagittarius: 'Saying yes to one spontaneous invite shifts your perspective in the best way.',
  Capricorn:   'Your long-term vision is sharper than you think; a practical move now leads to quiet victory.',
  Aquarius:    'Your unusual idea is exactly what the room needs—share it even if it feels risky.',
  Pisces:      'Lean into your intuition; a dream, lyric, or random thought holds a real-world hint for you.',
};

export default function ZodiacFortunePage() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [opened, setOpened] = useState(false);

  function selectSign(name) {
    setSelectedSign(name);
    setOpened(false);
  }

  function reset() {
    setSelectedSign(null);
    setOpened(false);
  }

  return (
    <div style={styles.body}>
      <div style={styles.app}>
        <h1 style={styles.h1}>Zodiac Fortune Cookie</h1>
        <p style={styles.subtitle}>Tell me your zodiac sign, then open the cookie to reveal a fortune crafted for you.</p>

        <div style={styles.card}>
          {!selectedSign ? (
            <div>
              <div style={styles.stepTitle}>Step 1 · Tell me your zodiac sign</div>
              <div style={styles.grid}>
                {ZODIAC_SIGNS.map(sign => (
                  <div key={sign.name} style={styles.option} onClick={() => selectSign(sign.name)}
                    onMouseEnter={e => Object.assign(e.currentTarget.style, styles.optionHover)}
                    onMouseLeave={e => Object.assign(e.currentTarget.style, styles.optionBase)}>
                    <span style={styles.signName}>{sign.name}</span>
                    <span style={styles.signDate}>{sign.dates}</span>
                    <span style={styles.signElement}>{sign.element}</span>
                  </div>
                ))}
              </div>
              <p style={styles.cta}>Tap your sign to move on to the fortune cookie.</p>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <p style={{ textAlign: 'center', marginBottom: 8, opacity: 0.9 }}>Step 2 · Click the cookie to open your note.</p>
              <p style={{ textAlign: 'center', marginBottom: 16, opacity: 0.9 }}>
                Selected sign: <strong>{selectedSign}</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div
                  style={{ ...styles.cookieWrapper, cursor: opened ? 'default' : 'pointer', animation: opened ? 'none' : 'floatTilt 0.7s ease-in-out infinite alternate' }}
                  onClick={() => !opened && setOpened(true)}
                >
                  <style>{`
                    @keyframes floatTilt {
                      0%   { transform: translateY(0px) rotate(-4deg); }
                      50%  { transform: translateY(-6px) rotate(0deg); }
                      100% { transform: translateY(0px) rotate(4deg); }
                    }
                  `}</style>

                  {/* Cookie shells */}
                  <div style={{ position: 'relative', width: 140, height: 100 }}>
                    <div style={{ ...styles.shellLeft,  transform: opened ? 'translateX(-12px) rotate(-16deg)' : 'none', transition: 'transform 0.35s ease' }} />
                    <div style={{ ...styles.shellRight, transform: opened ? 'translateX(12px) rotate(16deg)'   : 'none', transition: 'transform 0.35s ease' }} />
                    <div style={{ ...styles.gap, opacity: opened ? 0.5 : 1 }} />
                    <div style={styles.highlight} />
                    <div style={styles.bottomShadow} />
                  </div>

                  {/* Paper note */}
                  <div style={{
                    ...styles.paper,
                    opacity: opened ? 1 : 0,
                    transform: opened ? 'translate(-50%, -50%) translateY(-46px)' : 'translate(-50%, -50%) translateY(12px)',
                    pointerEvents: opened ? 'auto' : 'none',
                  }}>
                    <strong style={{ display: 'block', marginBottom: 4, fontSize: '0.88rem' }}>{selectedSign}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#333', lineHeight: 1.3 }}>{FORTUNES[selectedSign]}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', opacity: 0.7, textAlign: 'center' }}>
                  {opened ? 'Your note has appeared—use Restart to explore another sign.' : 'Click once to crack open the cookie and reveal your sign\'s fortune.'}
                </p>
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                <button style={styles.btn} onClick={reset}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1b246'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f5c26b'}>
                  Restart · Choose another sign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: 'radial-gradient(circle at top, #1b223a, #050713)',
    color: '#fdf5e6',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  app: { width: 'min(900px, 100%)', padding: '24px 16px 32px' },
  h1: { textAlign: 'center', marginBottom: 8, fontSize: '1.8rem', letterSpacing: '0.03em' },
  subtitle: { textAlign: 'center', fontSize: '0.95rem', opacity: 0.8, marginBottom: 24 },
  card: {
    background: 'rgba(13,16,32,0.9)',
    borderRadius: 16,
    border: '1px solid rgba(245,194,107,0.2)',
    padding: '20px 16px 24px',
    boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
    backdropFilter: 'blur(12px)',
  },
  stepTitle: { fontWeight: 600, marginBottom: 12, fontSize: '1.05rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginTop: 12 },
  optionBase: {
    background: 'rgba(21,25,48,0.9)', borderRadius: 12, padding: '10px 12px',
    border: '1px solid rgba(245,194,107,0.3)', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', gap: 4, transition: 'all 0.18s ease',
  },
  option: {
    background: 'rgba(21,25,48,0.9)', borderRadius: 12, padding: '10px 12px',
    border: '1px solid rgba(245,194,107,0.3)', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', gap: 4, transition: 'all 0.18s ease',
  },
  optionHover: {
    background: 'rgba(33,38,65,0.9)', borderColor: '#f5c26b',
    transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0,0,0,0.45)',
  },
  signName: { fontWeight: 600, fontSize: '0.98rem' },
  signDate: { fontSize: '0.85rem', opacity: 0.8 },
  signElement: { fontSize: '0.8rem', opacity: 0.75 },
  cta: { marginTop: 18, fontSize: '0.9rem', opacity: 0.86, textAlign: 'center' },
  cookieWrapper: { position: 'relative', width: 220, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  shellLeft: {
    position: 'absolute', width: 70, height: 100,
    background: 'radial-gradient(circle at 30% 20%, #ffd18a, #e3a85a)',
    borderRadius: '100px 40px 60px 100px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.4)',
  },
  shellRight: {
    position: 'absolute', right: 0, width: 70, height: 100,
    background: 'radial-gradient(circle at 70% 20%, #ffd594, #e3a85a)',
    borderRadius: '40px 100px 100px 60px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.4)',
  },
  gap: {
    position: 'absolute', left: '50%', top: '44%', width: 18, height: 44,
    transform: 'translateX(-50%)', borderRadius: 50,
    background: 'linear-gradient(to bottom, #f0c98b 0%, #c67b2d 40%, #7e4813 100%)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
  },
  highlight: {
    position: 'absolute', inset: '10px 32px auto 32px', height: 12,
    background: 'radial-gradient(circle at top, #ffe3ac, transparent)', opacity: 0.6,
  },
  bottomShadow: {
    position: 'absolute', inset: 'auto 18px 0 18px', height: 16,
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0, rgba(0,0,0,0) 70%)',
  },
  paper: {
    position: 'absolute', left: '50%', top: '50%',
    width: 180, background: '#fff9e8', borderRadius: 6,
    border: '1px solid #e0cfaa', boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
    padding: '10px 12px', textAlign: 'center',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  },
  btn: {
    border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: '0.9rem',
    fontWeight: 600, cursor: 'pointer', background: '#f5c26b', color: '#2a1605',
    boxShadow: '0 10px 24px rgba(0,0,0,0.45)', transition: 'background 0.15s ease',
  },
};
