import { useState } from 'react';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import CaseStudyPage from './components/CaseStudyPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCase, setSelectedCase] = useState(null);

  function openCaseStudy(id) {
    setSelectedCase(id);
    setPage('case-study');
    window.scrollTo({ top: 0 });
  }

  function goHome(anchor) {
    setPage('home');
    setSelectedCase(null);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <div>
      <Nav onHome={() => goHome()} onWork={() => goHome('work')} onAbout={() => goHome('about')} currentPage={page} />
      {page === 'home'       && <HomePage onCaseStudy={openCaseStudy} />}
      {page === 'case-study' && <CaseStudyPage id={selectedCase} onBack={() => goHome('work')} onCaseStudy={openCaseStudy} />}
    </div>
  );
}
