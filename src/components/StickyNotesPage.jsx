import { useState, useRef, useEffect, useCallback } from 'react';

const NOTE_COLORS = [
  { id: 'yellow',  bg: '#FFF9C4', label: 'Yellow'  },
  { id: 'pink',    bg: '#FCE4EC', label: 'Pink'    },
  { id: 'blue',    bg: '#E3F2FD', label: 'Blue'    },
  { id: 'green',   bg: '#E8F5E9', label: 'Green'   },
  { id: 'purple',  bg: '#F3E5F5', label: 'Purple'  },
  { id: 'orange',  bg: '#FFF3E0', label: 'Orange'  },
  { id: 'teal',    bg: '#E0F2F1', label: 'Teal'    },
];

const TAPE_STYLES = [
  {
    id: 'clear',
    label: 'Clear',
    css: { background: 'rgba(255,255,255,0.58)', outline: '1px solid rgba(0,0,0,0.12)' },
  },
  {
    id: 'sunny',
    label: 'Sunny',
    css: { background: '#FFF59D' },
  },
  {
    id: 'blush',
    label: 'Blush',
    css: { background: 'repeating-linear-gradient(90deg,#FFCDD2 0,#FFCDD2 8px,#F48FB1 8px,#F48FB1 16px)' },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    css: {
      background: '#BBDEFB',
      backgroundImage: 'radial-gradient(circle,#64B5F6 2px,transparent 2px)',
      backgroundSize: '8px 8px',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    css: { background: 'repeating-linear-gradient(45deg,#C8E6C9 0,#C8E6C9 5px,#A5D6A7 5px,#A5D6A7 10px)' },
  },
  {
    id: 'kraft',
    label: 'Kraft',
    css: { background: '#D7CCC8' },
  },
];

const TEXT_SIZES = [
  { id: 'sm', label: 'S',  fontSize: 12, lineHeight: 1.65 },
  { id: 'md', label: 'M',  fontSize: 15, lineHeight: 1.6  },
  { id: 'lg', label: 'L',  fontSize: 19, lineHeight: 1.5  },
  { id: 'xl', label: 'XL', fontSize: 24, lineHeight: 1.4  },
];

const SEED_NOTES = [
  {
    id: 'seed1', x: 80,  y: 80,
    text: 'Jaylen, your portfolio is stunning! 🌟',
    author: 'Alex M.', color: 'yellow', tape: 'clear',   textSize: 'md', rotation: -2.5, zIndex: 1,
  },
  {
    id: 'seed2', x: 350, y: 130,
    text: 'Love the depth of your UX research case studies!',
    author: 'Sam K.', color: 'pink',   tape: 'sunny',   textSize: 'md', rotation: 1.8,  zIndex: 2,
  },
  {
    id: 'seed3', x: 650, y: 65,
    text: 'Your attention to detail is 🔥',
    author: 'Morgan',  color: 'blue',   tape: 'blush',   textSize: 'md', rotation: -1.0, zIndex: 3,
  },
  {
    id: 'seed4', x: 170, y: 330,
    text: 'Would love to collaborate sometime! Reach out ✉️',
    author: 'Riley P.', color: 'green',  tape: 'ocean',   textSize: 'md', rotation: 2.2,  zIndex: 4,
  },
  {
    id: 'seed5', x: 510, y: 310,
    text: "That MyFile case study = chef's kiss 👨‍🍳",
    author: 'Chris W.', color: 'orange', tape: 'forest',  textSize: 'lg', rotation: -0.8, zIndex: 5,
  },
  {
    id: 'seed6', x: 840, y: 210,
    text: 'Hired! Just kidding… unless? 😄',
    author: 'Taylor',  color: 'purple', tape: 'clear',   textSize: 'md', rotation: 3.1,  zIndex: 6,
  },
  {
    id: 'seed7', x: 960, y: 390,
    text: 'Keep building amazing things ✨\n\nThe world needs more designers like you.',
    author: 'Jamie',   color: 'teal',   tape: 'kraft',   textSize: 'md', rotation: -1.5, zIndex: 7,
  },
  {
    id: 'seed8', x: 310, y: 520,
    text: 'The typography choices throughout are *chef\'s kiss*',
    author: 'Dana L.', color: 'yellow', tape: 'blush',   textSize: 'sm', rotation: 0.8,  zIndex: 8,
  },
  {
    id: 'seed9', x: 670, y: 500,
    text: 'Bookmarked! Coming back to reference your process docs 📖',
    author: 'Kai',     color: 'blue',   tape: 'forest',  textSize: 'md', rotation: -2.0, zIndex: 9,
  },
];

const LS_KEY = 'uxjay_stickies_v2';

function loadNotes() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return SEED_NOTES;
}

function saveNotes(notes) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(notes));
  } catch {}
}

function getTapeCss(tapeId) {
  return (TAPE_STYLES.find(t => t.id === tapeId) || TAPE_STYLES[0]).css;
}

// ─── Single sticky note ───────────────────────────────────────────────────────

function StickyNote({ note, onUpdate, onDelete, onDragStart, autoFocus }) {
  const colorObj  = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
  const sizeObj   = TEXT_SIZES.find(s => s.id === note.textSize)  || TEXT_SIZES[1];
  const tapeCss   = getTapeCss(note.tape);
  const textaRef  = useRef(null);

  useEffect(() => {
    if (autoFocus && textaRef.current) {
      textaRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      className="sn-note"
      style={{
        left: note.x,
        top: note.y,
        background: colorObj.bg,
        transform: `rotate(${note.rotation}deg)`,
        zIndex: note.zIndex || 1,
      }}
      onMouseDown={(e) => onDragStart(e, note.id)}
    >
      {/* Tape strip */}
      <div className="sn-tape" style={tapeCss} />

      {/* Content */}
      <textarea
        ref={textaRef}
        className="sn-text"
        placeholder="Write something nice…"
        value={note.text}
        onChange={(e) => onUpdate(note.id, { text: e.target.value })}
        style={{ fontSize: sizeObj.fontSize, lineHeight: sizeObj.lineHeight }}
        onMouseDown={(e) => e.stopPropagation()}
      />

      {/* Footer: name + delete */}
      <div className="sn-footer">
        <input
          className="sn-author"
          placeholder="— your name"
          value={note.author || ''}
          onChange={(e) => onUpdate(note.id, { author: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <button
          className="sn-delete"
          onClick={() => onDelete(note.id)}
          onMouseDown={(e) => e.stopPropagation()}
          title="Remove note"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StickyNotesPage() {
  const [notes,         setNotes]         = useState(loadNotes);
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedTape,  setSelectedTape]  = useState('clear');
  const [selectedSize,  setSelectedSize]  = useState('md');
  const [justCreated,   setJustCreated]   = useState(null);

  const boardRef  = useRef(null);
  const dragging  = useRef(null);
  const topZIndex = useRef(Math.max(...SEED_NOTES.map(n => n.zIndex), 10));

  // Persist to localStorage
  useEffect(() => { saveNotes(notes); }, [notes]);

  // Global drag handlers
  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragging.current.startX;
      const dy = clientY - dragging.current.startY;
      setNotes(prev =>
        prev.map(n =>
          n.id === dragging.current.id
            ? { ...n, x: dragging.current.origX + dx, y: dragging.current.origY + dy }
            : n
        )
      );
    }

    function onUp() { dragging.current = null; }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, []);

  const handleDragStart = useCallback((e, noteId) => {
    if (['TEXTAREA', 'INPUT', 'BUTTON'].includes(e.target.tagName)) return;
    e.preventDefault();
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    topZIndex.current += 1;
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, zIndex: topZIndex.current } : n));
    dragging.current = {
      id: noteId,
      startX: clientX,
      startY: clientY,
      origX: note.x,
      origY: note.y,
    };
  }, [notes]);

  function handleAddNote() {
    const board = boardRef.current;
    const scrollX = board ? board.scrollLeft : 0;
    const scrollY = board ? board.scrollTop  : 0;
    const viewW   = board ? board.clientWidth  : 800;
    const viewH   = board ? board.clientHeight : 600;
    const x = scrollX + viewW / 2 - 95 + (Math.random() - 0.5) * 140;
    const y = scrollY + viewH / 2 - 95 + (Math.random() - 0.5) * 100;
    topZIndex.current += 1;
    const id = Date.now();
    setNotes(prev => [
      ...prev,
      {
        id,
        x,
        y,
        text:     '',
        author:   '',
        color:    selectedColor,
        tape:     selectedTape,
        textSize: selectedSize,
        rotation: (Math.random() - 0.5) * 7,
        zIndex:   topZIndex.current,
      },
    ]);
    setJustCreated(id);
    setTimeout(() => setJustCreated(null), 200);
  }

  function handleUpdateNote(id, changes) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n));
  }

  function handleDeleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  function handleReset() {
    if (window.confirm('Clear all notes and restore the original board?')) {
      localStorage.removeItem(LS_KEY);
      setNotes(SEED_NOTES);
    }
  }

  return (
    <div className="figjam-page">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="figjam-topbar">
        <div className="figjam-topbar-left">
          <div className="figjam-title-wrap">
            <span className="figjam-icon">📝</span>
            <div>
              <h1 className="figjam-heading">Leave me a sticky note</h1>
              <p className="figjam-sub">Pick a color, choose some tape, type your thoughts, and drag notes anywhere!</p>
            </div>
          </div>
        </div>
        <div className="figjam-topbar-right">
          <span className="figjam-count">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
          <button className="figjam-reset-btn" onClick={handleReset} title="Restore original board">
            Reset board
          </button>
        </div>
      </div>

      {/* ── Canvas ──────────────────────────────────────────────────── */}
      <div className="figjam-board" ref={boardRef}>
        <div className="figjam-canvas">
          {notes.map(note => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              onDragStart={handleDragStart}
              autoFocus={note.id === justCreated}
            />
          ))}
        </div>
      </div>

      {/* ── Floating toolbar ────────────────────────────────────────── */}
      <div className="figjam-toolbar">
        {/* Color */}
        <div className="tb-section">
          <span className="tb-label">Color</span>
          <div className="tb-row">
            {NOTE_COLORS.map(c => (
              <button
                key={c.id}
                className={`tb-color${selectedColor === c.id ? ' active' : ''}`}
                style={{ background: c.bg }}
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
                style={{ fontSize: s.id === 'xl' ? 14 : s.id === 'lg' ? 13 : 12 }}
                onClick={() => setSelectedSize(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tb-sep" />

        {/* Add */}
        <button className="tb-add" onClick={handleAddNote}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Post note
        </button>
      </div>
    </div>
  );
}
