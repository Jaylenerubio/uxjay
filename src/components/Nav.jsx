export default function Nav({ onHome, onWork, onAbout, currentPage }) {
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={onHome} title="Home">JR</button>
      <div className="nav-sep" />
      <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={onHome}>
        Home
      </button>
      <button className="nav-link" onClick={onWork}>Work</button>
      <button className="nav-link" onClick={onAbout}>About</button>
      <div className="nav-sep" />
      <a className="nav-cta" href="mailto:jaylenerubio1@gmail.com">Hire Me</a>
    </nav>
  );
}
