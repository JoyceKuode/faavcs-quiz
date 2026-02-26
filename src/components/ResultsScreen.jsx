import { useState } from 'react'
import { supabase } from '../lib/supabase'

const MAX_SCORE = 15000

function getSnarkyComment(pct) {
  if (pct >= 90) return { emoji: '🏆', text: 'You are the chosen one. Claude bows before you.' }
  if (pct >= 70) return { emoji: '🤖', text: 'Solid vibe coder. Fredrik would be proud. Probably.' }
  if (pct >= 50) return { emoji: '🛸', text: 'You attended FAAVCS. That\'s already more than most.' }
  return { emoji: '💀', text: 'You wrote code, didn\'t you. We can tell.' }
}

export default function ResultsScreen({ score, totalTime, onLeaderboard, onPlayAgain }) {
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const pct = Math.round((score / MAX_SCORE) * 100)
  const { emoji, text } = getSnarkyComment(pct)
  const totalSec = (totalTime / 1000).toFixed(1)
  const ready = name.trim().length > 0

  async function handleSubmit() {
    if (!supabase) {
      onLeaderboard(name.trim(), score)
      return
    }
    setSubmitting(true)
    setError(null)
    const { error: err } = await supabase
      .from('leaderboard')
      .insert({ name: name.trim(), score, total_time: totalTime })
    setSubmitting(false)
    if (err) {
      setError('Failed to save score. Check your connection.')
      return
    }
    onLeaderboard(name.trim(), score)
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center animate-bounce-in"
        style={{ background: '#1A2E2D', border: '1px solid rgba(0,133,122,0.3)' }}
      >
        <div className="text-6xl mb-4">{emoji}</div>
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
          <p className="text-sm font-semibold mb-1" style={{ color: '#4DB8B0', fontFamily: '"Fredoka One", cursive' }}>
            Who are you?
          </p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Fredrik the Vibe Lord"
            maxLength={30}
            autoFocus
            onKeyDown={e => e.key === 'Enter' && ready && !submitting && handleSubmit()}
            className="w-full px-5 py-3 rounded-xl text-base outline-none"
            style={{
              background: '#0D1F1E',
              border: '2px solid rgba(0,133,122,0.3)',
              color: '#F0FAFA',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => e.target.style.borderColor = '#00857A'}
            onBlur={e => e.target.style.borderColor = 'rgba(0,133,122,0.3)'}
          />
          <button
            onClick={handleSubmit}
            disabled={!ready || submitting}
            className="py-3.5 rounded-xl text-lg font-semibold glow-teal transition-all duration-200"
            style={{
              fontFamily: '"Fredoka One", cursive',
              background: ready && !submitting ? '#00857A' : 'rgba(0,133,122,0.3)',
              color: '#F0FAFA',
              cursor: ready && !submitting ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={e => { if (ready && !submitting) e.currentTarget.style.background = '#00A896' }}
            onMouseLeave={e => { if (ready && !submitting) e.currentTarget.style.background = '#00857A' }}
          >
            {submitting ? 'Saving...' : '🏆 Submit to Leaderboard'}
          </button>

          <button
            onClick={() => onLeaderboard(null, null)}
            className="py-3 rounded-xl text-base transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,133,122,0.3)',
              color: '#4DB8B0',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,133,122,0.25)'
              e.currentTarget.style.borderColor = '#00857A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0,133,122,0.3)'
            }}
          >
            View Leaderboard
          </button>

          <button
            onClick={onPlayAgain}
            className="py-3 rounded-xl text-base transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,133,122,0.15)',
              color: 'rgba(240,250,250,0.35)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,133,122,0.25)'
              e.currentTarget.style.borderColor = '#00857A'
              e.currentTarget.style.color = '#4DB8B0'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0,133,122,0.15)'
              e.currentTarget.style.color = 'rgba(240,250,250,0.35)'
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}
