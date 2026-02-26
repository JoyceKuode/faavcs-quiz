import heroImg from '../assets/Screenshot 2026-02-26 at 12.33.10.png'

export default function SplashScreen({ onStart }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Hero image */}
      <img
        src={heroImg}
        alt="FAAVCS — A Long Expected Party"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(13,31,30,0.6) 50%, rgba(13,31,30,0.97) 85%, #0D1F1E 100%)',
        }}
      />

      {/* Content pinned to bottom */}
      <div className="relative z-10 mt-auto px-6 pb-12 flex flex-col items-center text-center max-w-xl mx-auto w-full">
        {/* Badge */}
        <div
          className="mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(0,133,122,0.2)', border: '1px solid rgba(0,133,122,0.5)', color: '#4DB8B0' }}
        >
          FAAVCS · AI Workshop at Plejd
        </div>

        {/* Title */}
        <h1
          className="text-7xl sm:text-8xl font-fredoka mb-2 text-glow"
          style={{ color: '#00857A', fontFamily: '"Fredoka One", cursive' }}
        >
          FAAVCS
        </h1>

        <p className="text-sm mb-8" style={{ color: '#4DB8B0' }}>
          10 questions · 30 seconds each · Real-time leaderboard
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group relative px-10 py-4 rounded-2xl text-xl font-semibold glow-teal transition-all duration-200"
          style={{
            background: '#00857A',
            color: '#F0FAFA',
            fontFamily: '"Fredoka One", cursive',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#00A896'}
          onMouseLeave={e => e.currentTarget.style.background = '#00857A'}
        >
          YOLO, I have not read the terms{' '}
          <span className="inline-block animate-bounce-right">→</span>
        </button>

        <p className="mt-6 text-sm" style={{ color: 'rgba(240,250,250,0.35)' }}>
          Powered by vibes
        </p>
      </div>
    </div>
  )
}
