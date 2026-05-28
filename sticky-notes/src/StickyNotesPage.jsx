import { useState, useRef, useEffect, useCallback } from 'react';

const PORTFOLIO_URL = '#';

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

const STICKERS = ['🌟','🎉','❤️','🔥','✨','👏','🎨','💡','🚀','🌈','😊','💪','🙌','💐','🦋','⚡','🎯','🏆'];
const CURSOR_COLORS = ['#7C3AED','#DB2777','#2563EB','#059669','#D97706','#DC2626'];

const SEED_NOTES = [
  { id: 's1', x: 560,  y: 110, text: 'Friends — still the best comfort show ever made 💛', author: 'Mia T.',   color: 'yellow', tape: 'clear',  rotation: -2.5, zIndex: 1 },
  { id: 's2', x: 850,  y: 80,  text: 'Wuthering Heights (2011) — Heathcliff will ruin you 🌿', author: 'Jake R.',  color: 'pink',   tape: 'yellow', rotation:  1.8, zIndex: 2 },
  { id: 's3', x: 1130, y: 155, text: 'Book rec: The Secret History by Donna Tartt 📚 Absolutely haunting.', author: 'Sam K.',   color: 'blue',   tape: 'ocean',  rotation: -1.2, zIndex: 3 },
  { id: 's4', x: 620,  y: 360, text: 'Neighbors (2014) — funniest movie I have ever seen 😂', author: 'Morgan',   color: 'green',  tape: 'blush',  rotation:  2.5, zIndex: 4 },
  { id: 's5', x: 980,  y: 330, text: 'Severance on Apple TV+ — absolutely mind-bending 🧠', author: 'Taylor',   color: 'purple', tape: 'forest', rotation: -3.0, zIndex: 5 },
  { id: 's6', x: 1290, y: 310, text: 'Lessons in Chemistry — cannot put it down 🧪', author: 'Kai',       color: 'orange', tape: 'kraft',  rotation:  0.8, zIndex: 6 },
  { id: 's7', x: 760,  y: 490, text: 'Abbott Elementary 🍎 — the best comedy on TV right now!', author: 'Dana L.', color: 'yellow', tape: 'blush',  rotation: -1.0, zIndex: 7 },
  { id: 's8', x: 480,  y: 500, text: 'Movie: Everything Everywhere All at Once 🌌 Changed me forever.', author: 'Chris',    color: 'blue',   tape: 'forest', rotation:  2.0, zIndex: 8 },
];
const SEED_STICKERS = [
  { id: 'ss1', x: 820,  y: 255, emoji: '✨', size: 36 },
  { id: 'ss2', x: 1210, y: 115, emoji: '🎨', size: 32 },
  { id: 'ss3', x: 555,  y: 545, emoji: '💡', size: 30 },
];

const LS_NOTES    = 'uxjay_sn_notes_v5';
const LS_STICKERS = 'uxjay_sn_stickers_v5';

function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function restore(key, fallback) {
  try { const r = localStorage.getItem(key); if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length) return p; } } catch {}
  return fallback;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function Tooltip({ label, shortcut, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fj-tt-wrap" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="fj-tt" role="tooltip">
          {label}
          {shortcut && <kbd className="fj-tt-key">{shortcut}</kbd>}
        </div>
      )}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CursorIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-7 1-4 7z" /></svg>);
}
function HandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-4 0v0" />
      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}
function NoteIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 3 21 3 21 17 15 21 3 21" /><polyline points="15 21 15 17 21 17" /></svg>);
}
function StickerIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>);
}

// ─── Sticky Note ──────────────────────────────────────────────────────────────
function StickyNote({ note, mode, isSelected, onSelect, onUpdate, onDelete, onDragStart, autoFocus }) {
  const colorObj = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
  const tapeCss  = (TAPE_STYLES.find(t => t.id === note.tape) || TAPE_STYLES[0]).css;
  const taRef    = useRef(null);
  useEffect(() => { if (autoFocus && taRef.current) taRef.current.focus(); }, [autoFocus]);
  return (
    <div
      className={`sn-note${isSelected ? ' selected' : ''}`}
      style={{ left: note.x, top: note.y, background: colorObj.bg, transform: `rotate(${note.rotation}deg)`, zIndex: note.zIndex || 1 }}
      onMouseDown={(e) => { if (mode === 'pan') return; onSelect(note.id); onDragStart(e, note.id); }}
    >
      {isSelected && (
        <div
          className="sn-mini-toolbar"
          style={{ transform: `translateX(-50%) rotate(${-note.rotation}deg)` }}
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        >
          {NOTE_COLORS.map(c => (
            <button key={c.id} className={`sn-mt-color${note.color === c.id ? ' active' : ''}`}
              style={{ background: c.bg }}
              onClick={(e) => { e.stopPropagation(); onUpdate(note.id, { color: c.id }); }}
              title={c.label} />
          ))}
          <div className="sn-mt-sep" />
          {TAPE_STYLES.map(t => (
            <button key={t.id} className={`sn-mt-tape${note.tape === t.id ? ' active' : ''}`}
              style={t.css}
              onClick={(e) => { e.stopPropagation(); onUpdate(note.id, { tape: t.id }); }}
              title={t.label} />
          ))}
        </div>
      )}
      <div className="sn-tape" style={tapeCss} />
      <button className="sn-delete" onClick={(e) => { e.stopPropagation(); onDelete(note.id); }} onMouseDown={(e) => e.stopPropagation()} title="Delete">×</button>
      <textarea ref={taRef} className="sn-text" placeholder="Write something nice…" value={note.text}
        onChange={(e) => onUpdate(note.id, { text: e.target.value })} onMouseDown={(e) => e.stopPropagation()} />
      <div className="sn-footer">
        <input className="sn-author" placeholder="— your name" value={note.author || ''}
          onChange={(e) => onUpdate(note.id, { author: e.target.value })} onMouseDown={(e) => e.stopPropagation()} />
      </div>
    </div>
  );
}

// ─── Sticker ──────────────────────────────────────────────────────────────────
function Sticker({ sticker, onDragStart, onDelete }) {
  return (
    <div className="sn-sticker"
      style={{ left: sticker.x, top: sticker.y, fontSize: sticker.size, zIndex: sticker.zIndex || 50 }}
      onMouseDown={(e) => onDragStart(e, sticker.id, 'sticker')}
      onDoubleClick={() => onDelete(sticker.id)}
      title="Drag · double-click to remove">
      {sticker.emoji}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StickyNotesPage() {
  const [notes,         setNotes]         = useState(() => restore(LS_NOTES,    SEED_NOTES));
  const [stickers,      setStickers]      = useState(() => restore(LS_STICKERS, SEED_STICKERS));
  const [selectedNote,  setSelectedNote]  = useState(null);
  const [mode,          setMode]          = useState('select');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedTape,  setSelectedTape]  = useState('clear');
  const [showStickers,  setShowStickers]  = useState(false);
  const [activeSticker, setActiveSticker] = useState('✨');
  const [justCreated,   setJustCreated]   = useState(null);
  const [cursorPos,     setCursorPos]     = useState(null);

  const [visitorNum] = useState(() => {
    try {
      const stored = localStorage.getItem('uxjay_visitor_num');
      if (stored) return parseInt(stored, 10);
      const num = Math.floor(Math.random() * 900) + 100;
      localStorage.setItem('uxjay_visitor_num', String(num));
      return num;
    } catch { return Math.floor(Math.random() * 900) + 100; }
  });
  const cursorColor = CURSOR_COLORS[visitorNum % CURSOR_COLORS.length];

  const boardRef = useRef(null);
  const dragging = useRef(null);
  const panning  = useRef(null);
  const topZ     = useRef(Math.max(...SEED_NOTES.map(n => n.zIndex), 10));

  useEffect(() => { persist(LS_NOTES,    notes);    }, [notes]);
  useEffect(() => { persist(LS_STICKERS, stickers); }, [stickers]);

  // Global drag / pan
  useEffect(() => {
    function onMove(e) {
      if (panning.current) {
        boardRef.current.scrollLeft = panning.current.origLeft - (e.clientX - panning.current.startX);
        boardRef.current.scrollTop  = panning.current.origTop  - (e.clientY - panning.current.startY);
        return;
      }
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
    function onUp() { dragging.current = null; panning.current = null; }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  // Keyboard: delete selected note
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      if (!selectedNote) return;
      if (['TEXTAREA','INPUT'].includes(document.activeElement?.tagName)) return;
      setNotes(prev => prev.filter(n => n.id !== selectedNote));
      setSelectedNote(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedNote]);

  // Keyboard: tool shortcuts
  useEffect(() => {
    function onKey(e) {
      if (['TEXTAREA','INPUT'].includes(document.activeElement?.tagName)) return;
      switch (e.key.toLowerCase()) {
        case 'v': setMode('select'); setShowStickers(false); break;
        case 'h': setMode('pan');    setShowStickers(false); setSelectedNote(null); break;
        case 's': setMode('note');   setShowStickers(false); break;
        case 'e': setShowStickers(v => !v); break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleDragStart = useCallback((e, id, kind = 'note') => {
    if (['TEXTAREA','INPUT','BUTTON'].includes(e.target.tagName)) return;
    e.preventDefault();
    const item = kind === 'sticker' ? stickers.find(s => s.id === id) : notes.find(n => n.id === id);
    if (!item) return;
    topZ.current += 1;
    if (kind === 'sticker') setStickers(prev => prev.map(s => s.id === id ? { ...s, zIndex: topZ.current } : s));
    else setNotes(prev => prev.map(n => n.id === id ? { ...n, zIndex: topZ.current } : n));
    dragging.current = { id, kind, startX: e.clientX, startY: e.clientY, origX: item.x, origY: item.y };
  }, [notes, stickers]);

  function handleBoardMouseDown(e) {
    if (mode !== 'pan') return;
    if (['TEXTAREA','INPUT','BUTTON'].includes(e.target.tagName)) return;
    e.preventDefault();
    panning.current = { startX: e.clientX, startY: e.clientY, origLeft: boardRef.current.scrollLeft, origTop: boardRef.current.scrollTop };
  }

  function handleBoardClick(e) {
    const cls = Array.from(e.target.classList);
    if (cls.some(c => ['fj-board','fj-canvas'].includes(c))) setSelectedNote(null);
    if (mode === 'select' || mode === 'pan') return;
    if (['TEXTAREA','INPUT','BUTTON'].includes(e.target.tagName)) return;
    if (!cls.some(c => ['fj-board','fj-canvas','fj-canvas-text'].includes(c))) return;
    const board = boardRef.current;
    const rect  = board.getBoundingClientRect();
    const x = e.clientX - rect.left + board.scrollLeft;
    const y = e.clientY - rect.top  + board.scrollTop;
    topZ.current += 1;
    if (mode === 'note') {
      const id = Date.now();
      setNotes(prev => [...prev, { id, x: x - 95, y: y - 90, text: '', author: '', color: selectedColor, tape: selectedTape, rotation: (Math.random() - 0.5) * 6, zIndex: topZ.current }]);
      setJustCreated(id); setSelectedNote(id);
      setTimeout(() => setJustCreated(null), 200);
    } else if (mode === 'sticker') {
      setStickers(prev => [...prev, { id: Date.now(), x: x - 20, y: y - 20, emoji: activeSticker, size: 36, zIndex: topZ.current }]);
    }
  }

  function handleBoardMouseMove(e) {
    if (mode === 'select') setCursorPos({ x: e.clientX, y: e.clientY });
    else setCursorPos(null);
  }
  function handleBoardMouseLeave() { setCursorPos(null); }

  function handleUpdateNote(id, changes) { setNotes(prev => prev.map(n => n.id === id ? { ...n, ...changes } : n)); }
  function handleDeleteNote(id)     { setNotes(prev => prev.filter(n => n.id !== id));     if (selectedNote === id) setSelectedNote(null); }
  function handleDeleteSticker(id)  { setStickers(prev => prev.filter(s => s.id !== id)); }

  function handleReset() {
    if (window.confirm('Clear all notes and restore the original board?')) {
      localStorage.removeItem(LS_NOTES); localStorage.removeItem(LS_STICKERS);
      setNotes(SEED_NOTES); setStickers(SEED_STICKERS); setSelectedNote(null);
    }
  }

  const boardCursor = mode === 'pan' ? 'grab' : mode === 'note' ? 'crosshair' : mode === 'sticker' ? 'cell' : 'none';

  return (
    <div className="fj-page">
      {/* Board */}
      <div
        className={`fj-board${mode === 'select' ? ' fj-board--select' : ''}`}
        ref={boardRef}
        style={{ cursor: boardCursor }}
        onMouseDown={handleBoardMouseDown}
        onClick={handleBoardClick}
        onMouseMove={handleBoardMouseMove}
        onMouseLeave={handleBoardMouseLeave}
      >
        <div className="fj-canvas">
          <div className="fj-canvas-text" style={{ left: 80, top: 155 }}>Leave me<br />a note</div>
          <div className="fj-canvas-hint" style={{ left: 84, top: 410 }}>I’d love any book, movie, and show recommendations!</div>
          {notes.map(n => (
            <StickyNote key={n.id} note={n} mode={mode} isSelected={selectedNote === n.id}
              onSelect={setSelectedNote} onUpdate={handleUpdateNote} onDelete={handleDeleteNote}
              onDragStart={handleDragStart} autoFocus={n.id === justCreated} />
          ))}
          {stickers.map(s => (
            <Sticker key={s.id} sticker={s} onDragStart={handleDragStart} onDelete={handleDeleteSticker} />
          ))}
        </div>
      </div>

      {/* Topbar */}
      <div className="fj-topbar">
        <div className="fj-topbar-left">
          <span className="fj-board-name">Jaylene’s Board</span>
        </div>
        <div className="fj-topbar-right">
          <button className="fj-reset-link" onClick={handleReset}>Reset board</button>
          <div className="fj-avatar">JR</div>
          <a className="fj-return-btn" href={PORTFOLIO_URL}>Return to Portfolio</a>
        </div>
      </div>

      {/* Sticker picker */}
      {showStickers && (
        <div className="fj-sticker-tray">
          {STICKERS.map(em => (
            <button key={em} className={`fj-sticker-btn${activeSticker === em && mode === 'sticker' ? ' active' : ''}`}
              onClick={() => { setActiveSticker(em); setMode('sticker'); setShowStickers(false); }}>
              {em}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="fj-toolbar">
        {/* Nav tools: select + hand */}
        <div className="tb-tools">
          <Tooltip label="Select" shortcut="V">
            <button className={`tb-tool${mode === 'select' ? ' active' : ''}`}
              onClick={() => { setMode('select'); setShowStickers(false); }}>
              <CursorIcon />
            </button>
          </Tooltip>
          <Tooltip label="Hand" shortcut="H">
            <button className={`tb-tool${mode === 'pan' ? ' active' : ''}`}
              onClick={() => { setMode('pan'); setShowStickers(false); setSelectedNote(null); }}>
              <HandIcon />
            </button>
          </Tooltip>
        </div>

        <div className="tb-sep" />

        {/* Creation tools: note + sticker */}
        <div className="tb-tools">
          <Tooltip label="Sticky note" shortcut="S">
            <button className={`tb-tool${mode === 'note' ? ' active' : ''}`}
              onClick={() => { setMode('note'); setShowStickers(false); }}>
              <NoteIcon />
            </button>
          </Tooltip>
          <Tooltip label="Stickers" shortcut="E">
            <button className={`tb-tool${mode === 'sticker' ? ' active' : ''}`}
              onClick={() => setShowStickers(v => !v)}>
              <StickerIcon />
            </button>
          </Tooltip>
        </div>

        <div className="tb-sep" />

        {/* Color */}
        <div className="tb-section">
          <span className="tb-label">Color</span>
          <div className="tb-row">
            {NOTE_COLORS.map(c => (
              <Tooltip key={c.id} label={c.label}>
                <button className={`tb-color${selectedColor === c.id ? ' active' : ''}`}
                  style={{ background: c.bg }} onClick={() => setSelectedColor(c.id)} />
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="tb-sep" />

        {/* Tape */}
        <div className="tb-section">
          <span className="tb-label">Tape</span>
          <div className="tb-row">
            {TAPE_STYLES.map(t => (
              <Tooltip key={t.id} label={t.label}>
                <button className={`tb-tape${selectedTape === t.id ? ' active' : ''}`}
                  style={{ ...t.css }} onClick={() => setSelectedTape(t.id)} />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor cursor */}
      {cursorPos && mode === 'select' && (
        <div className="fj-cursor" style={{ left: cursorPos.x, top: cursorPos.y }} aria-hidden="true">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M2 2L18 11L11 13L8 21L2 2Z" fill={cursorColor} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="fj-cursor-label" style={{ background: cursorColor }}>User{visitorNum}</span>
        </div>
      )}
    </div>
  );
}
