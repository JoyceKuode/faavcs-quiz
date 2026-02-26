import { useState } from 'react'

export default function NameEntry({ onStudy, onQuiz }) {
  const [name, setName] = useState('')
  const ready = name.trim().length > 0

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div
        className="w-full max-w-md rounded-3xl p-8 animate-slide-up"
        style={{ background: '#1A2E2D', border: '1px solid rgba(0,133,122,0.25)' }}
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h2
            className="text-3xl mb-2"
            style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
          >
            Who are you?
          </h2>
          <p className="text-sm" style={{ color: '#4DB8B0' }}>
            Your name will appear on the leaderboard
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Fredrik the Vibe Lord"
            maxLength={30}
            autoFocus
            className="w-full px-5 py-3 rounded-xl text-base outline-none transition-all duration-200"
            style={{
              background: '#0D1F1E',
              border: '2px solid rgba(0,133,122,0.3)',
              color: '#F0FAFA',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => e.target.style.borderColor = '#00857A'}
            onBlur={e => e.target.style.borderColor = 'rgba(0,133,122,0.3)'}
          />

          {/* Mode buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => ready && onStudy(name.trim())}
              disabled={!ready}
              className="w-full rounded-2xl p-4 text-left transition-all duration-200"
              style={{
                background: ready ? '#1A2E2D' : 'rgba(26,46,45,0.5)',
                border: `1px solid ${ready ? 'rgba(0,133,122,0.35)' : 'rgba(0,133,122,0.15)'}`,
                cursor: ready ? 'pointer' : 'not-allowed',
                opacity: ready ? 1 : 0.5,
              }}
              onMouseEnter={e => { if (ready) { e.currentTarget.style.borderColor = '#00857A'; e.currentTarget.style.background = 'rgba(0,133,122,0.15)' } }}
              onMouseLeave={e => { if (ready) { e.currentTarget.style.borderColor = 'rgba(0,133,122,0.35)'; e.currentTarget.style.background = '#1A2E2D' } }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
                  >
                    Study Mode
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#4DB8B0' }}>
                    20 flashcards — flip through at your own pace
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => ready && onQuiz(name.trim())}
              disabled={!ready}
              className="w-full rounded-2xl p-4 text-left transition-all duration-200"
              style={{
                background: ready ? '#00857A' : 'rgba(0,133,122,0.2)',
                border: '1px solid transparent',
                cursor: ready ? 'pointer' : 'not-allowed',
                opacity: ready ? 1 : 0.5,
              }}
              onMouseEnter={e => { if (ready) e.currentTarget.style.background = '#00A896' }}
              onMouseLeave={e => { if (ready) e.currentTarget.style.background = '#00857A' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
                  >
                    Quiz Mode
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#E0F5F3' }}>
                    10 questions, timed — compete for the leaderboard
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(240,250,250,0.3)' }}>
          No email required. No GDPR paperwork. Just vibes.
        </p>
      </div>
    </div>
  )
}
