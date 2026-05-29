import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DotBackground from './components/background/DotBackground'
import Grain from './components/atmosphere/Grain'
import LightLeak from './components/atmosphere/LightLeak'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import bgWatermark from './assets/mugen-bg-watermark.png'

export default function App() {
  return (
    <BrowserRouter>
      <img
        src={bgWatermark}
        alt=""
        aria-hidden
        className="fixed pointer-events-none select-none"
        style={{
          zIndex: 0,
          position: 'fixed',
          inset: 0,
          width: '180vw',
          height: '180vh',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          opacity: 0.4,
          mixBlendMode: 'screen',
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
