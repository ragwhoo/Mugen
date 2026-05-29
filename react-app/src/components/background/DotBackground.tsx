import DotGrid from './DotGrid'

export default function DotBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{
        zIndex: 1,
        opacity: 1,
        filter: 'blur(0.15px)',
        minWidth: '100vw',
        minHeight: '100vh',
        transition: 'opacity 0.35s ease, filter 0.35s ease',
      }}
    >
      <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
        <DotGrid
          dotSize={10}
          gap={38}
          baseColor="#1c1c20"
          activeColor="#ffffff"
          proximity={260}
          speedTrigger={260}
          shockRadius={260}
          shockStrength={2.4}
          maxSpeed={1200}
          resistance={1700}
          returnDuration={2.4}
        />
      </div>
    </div>
  )
}
