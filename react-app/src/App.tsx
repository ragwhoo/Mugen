import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DotBackground from './components/background/DotBackground'
import Grain from './components/atmosphere/Grain'
import LightLeak from './components/atmosphere/LightLeak'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import kanjiImg from './assets/mugen-kanji.png'

export default function App() {
  return (
    <BrowserRouter>
      <img
        src={kanjiImg}
        alt=""
        aria-hidden
        className="fixed pointer-events-none select-none"
        style={{
          zIndex: 0,
          position: 'fixed',
          inset: 0,
          width: '140vw',
          height: '140vh',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'contain',
          opacity: 0.05,
          filter: 'grayscale(1) contrast(1.6) brightness(1.15)',
        }}
      />
      <DotBackground />
      <Grain />
      <LightLeak />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
