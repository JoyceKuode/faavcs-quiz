import { useState } from 'react'
import { supabase } from '../lib/supabase'

const MAX_SCORE = 15000

function getSnarkyComment(pct) {
  if (pct >= 90) return { emoji: '🏆', text: 'You are the chosen one. Claude bows before you.' }
  if (pct >= 70) return { emoji: '🤖', text: 'Solid vibe coder. Fredrik would be proud. Probably.' }
  if (pct >= 50) return { emoji: '🛸', text: 'You attended FAAVCS. That\'s already more than most.' }
  return { emoji: '💀', text: 'You wrote code, didn\'t you. We can tell.' }
}

export default function ResultsScreen({ score, totalTime, playerName, onLeaderboard, onPlayAgain }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const pct = Math.round((score / MAX_SCORE) * 100)
  const { emoji, text } = getSnarkyComment(pct)
  const totalSec = (totalTime / 1000).toFixed(1)

  async function handleSubmit() {
    if (!supabase) {
      // Supabase not configured — skip to leaderboard (dev mode)
      onLeaderboard()
      return
    }
    setSubmitting(true)
    setError(null)
    const { error: err } = await supabase
      .from('leaderboard')
      .insert({ name: playerName, score, total_time: totalTime })
    setSubmitting(false)
    if (err) {
      setError('Failed to save score. Check your connection.')
      return
    }
    setSubmitted(true)
    onLeaderboard()
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center animate-bounce-in"
        style={{ background: '#1A2E2D', border: '1px solid rgba(0,133,122,0.3)' }}
      >
        <div className="text-6xl mb-4">{emoji}</div>

        <h2
          className="text-3xl mb-1"
          style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
        >
          {playerName}
        </h2>
        <p className="text-sm mb-6" style={{ color: '#4DB8B0' }}>{text}</p>

        {/* Score display */}
        <div
          className="rounded-2xl p-6 mb-6 glow-teal-sm"
          style={{ background: '#0D1F1E' }}
        >
          <div
            className="text-6xl font-bold mb-1 text-glow"
            style={{ fontFamily: '"Fredoka One", cursive', color: '#00857A' }}
          >
            {score.toLocaleString()}
          </div>
          <div className="text-sm mb-3" style={{ color: '#4DB8B0' }}>
            out of {MAX_SCORE.toLocaleString()} points
          </div>

          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '8px', background: 'rgba(240,250,250,0.1)' }}
          >
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: '#00857A',
                borderRadius: '9999px',
                transition: 'width 1s ease-out',
              }}
            />
          </div>
          <div className="text-xs mt-2" style={{ color: 'rgba(240,250,250,0.4)' }}>
            {pct}% · {totalSec}s total
          </div>
        </div>

        {error && (
          <p className="text-sm mb-3" style={{ color: '#ef4444' }}>{error}</p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="py-3.5 rounded-xl text-lg font-semibold glow-teal transition-all duration-200"
            style={{
              fontFamily: '"Fredoka One", cursive',
              background: '#00857A',
              color: '#F0FAFA',
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'wait' : 'pointer',
            }}
          >
            {submitting ? 'Saving...' : '🏆 Submit to Leaderboard'}
          </button>

          <button
            onClick={onPlayAgain}
            className="py-3 rounded-xl text-base transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,133,122,0.3)',
              color: '#4DB8B0',
              cursor: 'pointer',
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}
