import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NOTE_COLORS = [
  { id: 'yellow',  bg: '#FFF9C4', label: 'Yellow'  },
  { id: 'pink',    bg: '#FADADD', label: 'Pink'    },
  { id: 'blue',    bg: '#D6EAF8', label: 'Blue'    },
  { id: 'green',   bg: '#D5F5E3', label: 'Green'   },
  { id: 'purple',  bg: '#E8DAEF', label: 'Purple'  },
  { id: 'orange',  bg: '#FDEBD0', label: 'Orange'  },
  { id: 'white',   bg: '#FFFFFF', label: 'White'   },
];

const TAPE_STYLES = [
  { id: 'clear',  label: 'Clear',  css: { background: 'rgba(255,255,255,0.55)', outline: '1px solid rgba(0,0,0,0.1)' } },
  { id: 'yellow', label: 'Sunny',  css: { background: '#FFF59D' } },
  { id: 'blush',  label: 'Blush',  css: { background: 'repeating-linear-gradient(90deg,#FFCDD2 0,#FFCDD2 8px,#F48FB1 8px,#F48FB1 16px)' } },
  { id: 'ocean',  label: 'Ocean',  css: { background: '#BBDEFB', backgroundImage: 'radial-gradient(circle,#64B5F6 2px,transparent 2px)', backgroundSize: '8px 8px' } },
  { id: 'forest', label: 'Forest', css: { background: 'repeating-linear-gradient(45deg,#C8E6C9 0,#C8E6C9 5px,#A5D6A7 5px,#A5D6A7 10px)' } },
  { id: 'kraft',  label: 'Kraft',  css: { background: '#D7CCC8' } },
];

const TEXT_SIZES = [
  { id: 'sm', label: 'S',  fontSize: 12, lineHeight: 1.65 },
  { id: 'md', label: 'M',  fontSize: 15, lineHeight: 1.6  },
  { id: 'lg', label: 'L',  fontSize: 19, lineHeight: 1.5  },
  { id: 'xl', label: 'XL', fontSize: 24, lineHeight: 1.4  },
];

const STICKERS = ['🌟','🎉','❤️','🔥','✨','👏','🎨','💡','🚀','🌈','😊','💪','🙌','💐','🦋','⚡','🎯','🏆'];

const SEED_NOTES = [
  { id: 's1', x: 560,  y: 130, text: 'Currently working at the NYC Mayor\'s Office for Economic Opportunity 🏢', author: 'Jaylene Rubio', color: 'purple', tape: 'clear', textSize: 'md', rotation: 2.5,  zIndex: 1 },
  { id: 's2', x: 860,  y: 90,  text: 'Your portfolio is stunning! Love the case study depth 🌟',              author: 'Alex M.',         color: 'yellow', tape: 'yellow', textSize: 'md', rotation: -2.0, zIndex: 2 },
  { id: 's3', x: 1120, y: 170, text: 'Would love to collaborate sometime — reach out!',                        author: 'Sam K.',          color: 'blue',   tape: 'ocean',  textSize: 'md', rotation: 1.2,  zIndex: 3 },
  { id: 's4', x: 630,  y: 370, text: 'The attention to detail in your process work is 🔥',                    author: 'Morgan',          color: 'pink',   tape: 'blush',  textSize: 'md', rotation: -1.5, zIndex: 4 },
  { id: 's5', x: 970,  y: 340, text: 'Hired! Just kidding… unless? 😄',                                       author: 'Taylor',          color: 'green',  tape: 'forest', textSize: 'md', rotation: 3.0,  zIndex: 5 },
  { id: 's6', x: 1280, y: 320, text: 'Bookmarked — coming back to reference your process docs 📖',            author: 'Kai',             color: 'orange', tape: 'kraft',  textSize: 'sm', rotation: -0.8, zIndex: 6 },
];

const SEED_STICKERS = [
  { id: 'ss1', x: 820,  y: 260, emoji: '✨', size: 36 },
  { id: 'ss2', x: 1200, y: 120, emoji: '🎨', size: 32 },
  { id: 'ss3', x: 560,  y: 540, emoji: '💡', size: 30 },
];

const LS_NOTES    = 'uxjay_sn_notes_v3';
const LS_STICKERS = 'uxjay_sn_stickers_v3';

function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function restore(key, fallback) {
  try { const r = localStorage.getItem(key); if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length) return p; } } catch {}
  return fallback;
}

// ─── Inline SVG icons ──────────────────────────────────────────────────────────

function CursorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-7 1-4 7z" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 3 21 3 21 17 15 21 3 21" />
      <polyline points="15 21 15 17 21 17" />
    </svg>
  );
}

function StickerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

// ─── Sticky note component ────────────────────────────────────────────────────

function StickyNote({ note, onUpdate, onDelete, onDragStart, autoFocus, flyInDelay }) {
  const colorObj = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
  const sizeObj  = TEXT_SIZES.find(s => s.id === note.textSize)  || TEXT_SIZES[1];
  const tapeCss  = (TAPE_STYLES.find(t => t.id === note.tape) || TAPE_STYLES[0]).css;
  const taRef    = useRef(null);

  useEffect(() => { if (autoFocus && taRef.current) taRef.current.focus(); }, [autoFocus]);

  return (
    <div
      className="sn-note"
      style={{
        left: note.x, top: note.y, background: colorObj.bg,
        transform: `rotate(${note.rotation}deg)`, zIndex: note.zIndex || 1,
        '--note-rot': `${note.rotation}deg`,
        animationDelay: flyInDelay != null ? `${flyInDelay}ms` : '0ms',
      }}
      onMouseDown={(e) => onDragStart(e, note.id)}
    >
      <div className="sn-tape" style={tapeCss} />
      <textarea
        ref={taRef}
        className="sn-text"
        placeholder="Write something nice…"
        value={note.text}
        onChange={(e) => onUpdate(note.id, { text: e.target.value })}
        style={{ fontSize: sizeObj.fontSize, lineHeight: sizeObj.lineHeight }}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <div className="sn-footer">
        <input
          className="sn-author"
          placeholder="— your name"
          value={note.author || ''}
          onChange={(e) => onUpdate(note.id, { author: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <button className="sn-delete" onClick={() => onDelete(note.id)} onMouseDown={(e) => e.stopPropagation()} title="Remove">×</button>
      </div>
    </div>
  );
}

// ─── Sticker component ────────────────────────────────────────────────────────

function Sticker({ sticker, onDragStart, onDelete }) {
  return (
    <div
      className="sn-sticker"
      style={{ left: sticker.x, top: sticker.y, fontSize: sticker.size, zIndex: sticker.zIndex || 50 }}
      onMouseDown={(e) => onDragStart(e, sticker.id, 'sticker')}
      title="Drag or double-click to remove"
      onDoubleClick={() => onDelete(sticker.id)}
    >
      {sticker.emoji}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StickyNotesPage({ onReturn }) {
  const [mounted,         setMounted]         = useState(false);
  const [notes,           setNotes]           = useState(() => restore(LS_NOTES,    SEED_NOTES));
  const [stickers,        setStickers]        = useState(() => restore(LS_STICKERS, SEED_STICKERS));
  const [mode,            setMode]            = useState('select');
  const [selectedColor,   setSelectedColor]   = useState('yellow');
  const [selectedTape,    setSelectedTape]    = useState('clear');
  const [selectedSize,    setSelectedSize]    = useState('md');
  const [showStickers,    setShowStickers]    = useState(false);
  const [activeSticker,   setActiveSticker]   = useState('🌟');
  const [justCreated,     setJustCreated]     = useState(null);

  const seedIds   = useRef(new Set(notes.map(n => n.id)));
  const boardRef  = useRef(null);
  const dragging  = useRef(null);
  const topZ      = useRef(Math.max(...SEED_NOTES.map(n => n.zIndex), 10));

  useEffect(() => { persist(LS_NOTES,    notes);    }, [notes]);
  useEffect(() => { persist(LS_STICKERS, stickers); }, [stickers]);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  // Global drag
  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - dragging.current.startX;
      const dy = cy - dragging.current.startY;
      if (dragging.current.kind === 'sticker') {
        setStickers(prev => prev.map(s => s.id === dragging.current.id ? { ...s, x: dragging.current.origX + dx, y: dragging.current.origY + dy } : s));
      } else {
        setNotes(prev => prev.map(n => n.id === dragging.current.id ? { ...n, x: dragging.current.origX + dx, y: dragging.current.origY + dy } : n));
      }
    }
    function onUp() { dragging.current = null; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const handleDragStart = useCallback((e, id, kind = 'note') => {
    if (['TEXTAREA', 'INPUT', 'BUTTON'].includes(e.target.tagName)) return;
    e.preventDefault();
    const item = kind === 'sticker' ? stickers.find(s => s.id === id) : notes.find(n => n.id === id);
    if (!item) return;
    topZ.current += 1;
    if (kind === 'sticker') setStickers(prev => prev.map(s => s.id === id ? { ...s, zIndex: topZ.current } : s));
    else setNotes(prev => prev.map(n => n.id === id ? { ...n, zIndex: topZ.current } : n));
    dragging.current = { id, kind, startX: e.clientX, startY: e.clientY, origX: item.x, origY: item.y };
  }, [notes, stickers]);

  // Canvas click → place note or sticker
  function handleBoardClick(e) {
    if (mode === 'select') return;
    const tag = e.target.tagName;
    if (['TEXTAREA', 'INPUT', 'BUTTON'].includes(tag)) return;
    // Only place on the board/canvas background (not on existing notes)
    const classes = Array.from(e.target.classList);
    if (!classes.some(c => ['fj-board', 'fj-canvas', 'fj-canvas-text'].includes(c))) return;

    const board = boardRef.current;
    const rect  = board.getBoundingClientRect();
    const x = e.clientX - rect.left + board.scrollLeft;
    const y = e.clientY - rect.top  + board.scrollTop;
    topZ.current += 1;

    if (mode === 'note') {
      const id = Date.now();
      setNotes(prev => [...prev, {
        id, x: x - 95, y: y - 90, text: '', author: '',
        color: selectedColor, tape: selectedTape, textSize: selectedSize,
        rotation: (Math.random() - 0.5) * 6, zIndex: topZ.current,
      }]);
      setJustCreated(id);
      setTimeout(() => setJustCreated(null), 200);
    } else if (mode === 'sticker') {
      setStickers(prev => [...prev, { id: Date.now(), x: x - 20, y: y - 20, emoji: activeSticker, size: 36, zIndex: topZ.current }]);
    }
  }

  function handleUpdateNote(id, changes) { setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n)); }
  function handleDeleteNote(id)          { setNotes(prev => prev.filter(n => n.id !== id)); }
  function handleDeleteSticker(id)       { setStickers(prev => prev.filter(s => s.id !== id)); }

  function handleReset() {
    if (window.confirm('Clear all notes and restore the original board?')) {
      localStorage.removeItem(LS_NOTES);
      localStorage.removeItem(LS_STICKERS);
      setNotes(SEED_NOTES);
      setStickers(SEED_STICKERS);
    }
  }

  const boardCursor = mode === 'note' ? 'crosshair' : mode === 'sticker' ? 'cell' : 'default';

  return (
    <div className="fj-page">

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <div className="fj-topbar">
        <div className="fj-topbar-left">
          <span className="fj-file-name">✦ Jaylen's Board</span>
          <span className="fj-note-count">{notes.length + stickers.length} items</span>
        </div>
        <div className="fj-topbar-right">
          <button className="fj-reset-link" onClick={handleReset}>Reset board</button>
          <div className="fj-avatar">JR</div>
          <button className="fj-return-btn" onClick={onReturn}>Return to Portfolio</button>
        </div>
      </div>

      {/* ── Canvas ───────────────────────────────────────────────── */}
      <div className="fj-board" ref={boardRef} style={{ cursor: boardCursor }} onClick={handleBoardClick}>
        <div className="fj-canvas">

          {/* Big heading text, part of the canvas */}
          <div className="fj-canvas-text" style={{ left: 80, top: 160 }}>
            Leave me<br />a note
          </div>

          {/* Hint tag under heading */}
          <div className="fj-canvas-hint" style={{ left: 88, top: 420 }}>
            Pick a color below → click the board → type your message ✦
          </div>

          {notes.map((n, i) => (
            <StickyNote
              key={n.id} note={n}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              onDragStart={handleDragStart}
              autoFocus={n.id === justCreated}
              flyInDelay={seedIds.current.has(n.id) ? i * 120 : null}
            />
          ))}

          {stickers.map(s => (
            <Sticker key={s.id} sticker={s} onDragStart={handleDragStart} onDelete={handleDeleteSticker} />
          ))}
        </div>
      </div>

      {/* ── Sticker picker (above toolbar) ────────────────────────── */}
      {showStickers && (
        <div className="fj-sticker-tray">
          {STICKERS.map(em => (
            <button
              key={em}
              className={`fj-sticker-btn${activeSticker === em && mode === 'sticker' ? ' active' : ''}`}
              onClick={() => { setActiveSticker(em); setMode('sticker'); setShowStickers(false); }}
            >
              {em}
            </button>
          ))}
        </div>
      )}

      {/* ── Toolbar ──────────────────────────────────────────────── */}
      <div className="fj-toolbar">

        {/* Tool modes */}
        <div className="tb-tools">
          <button className={`tb-tool${mode === 'select' ? ' active' : ''}`} onClick={() => { setMode('select'); setShowStickers(false); }} title="Select & drag">
            <CursorIcon />
          </button>
          <button className={`tb-tool${mode === 'note' ? ' active' : ''}`} onClick={() => { setMode('note'); setShowStickers(false); }} title="Add sticky note — click anywhere on board">
            <NoteIcon />
          </button>
          <button className={`tb-tool${mode === 'sticker' ? ' active' : ''}`} onClick={() => setShowStickers(v => !v)} title="Add sticker">
            <StickerIcon />
          </button>
        </div>

        <div className="tb-sep" />

        {/* Note color */}
        <div className="tb-section">
          <span className="tb-label">Color</span>
          <div className="tb-row">
            {NOTE_COLORS.map(c => (
              <button
                key={c.id}
                className={`tb-color${selectedColor === c.id ? ' active' : ''}`}
                style={{ background: c.bg, border: c.id === 'white' ? '1px solid rgba(255,255,255,0.25)' : undefined }}
                onClick={() => setSelectedColor(c.id)}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div className="tb-sep" />

        {/* Tape */}
        <div className="tb-section">
          <span className="tb-label">Tape</span>
          <div className="tb-row">
            {TAPE_STYLES.map(t => (
              <button
                key={t.id}
                className={`tb-tape${selectedTape === t.id ? ' active' : ''}`}
                style={{ ...t.css }}
                onClick={() => setSelectedTape(t.id)}
                title={t.label}
              />
            ))}
          </div>
        </div>

        <div className="tb-sep" />

        {/* Text size */}
        <div className="tb-section">
          <span className="tb-label">Size</span>
          <div className="tb-row">
            {TEXT_SIZES.map(s => (
              <button
                key={s.id}
                className={`tb-size${selectedSize === s.id ? ' active' : ''}`}
                onClick={() => setSelectedSize(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tb-sep" />

        {/* Post note CTA */}
        <button
          className={`tb-post${mode === 'note' ? ' armed' : ''}`}
          onClick={() => { setMode(m => m === 'note' ? 'select' : 'note'); setShowStickers(false); }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {mode === 'note' ? 'Click the board…' : 'Post note'}
        </button>
      </div>
    </div>
  );
}
