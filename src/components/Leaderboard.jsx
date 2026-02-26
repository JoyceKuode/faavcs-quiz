import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ playerName, playerScore, onPlayAgain }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchLeaderboard() {
    if (!supabase) {
      // Dev mode: show mock data
      const mock = [
        { id: '1', name: playerName || 'You', score: playerScore || 0, total_time: 5000 },
        { id: '2', name: 'Fredrik the Vibe Lord', score: 14200, total_time: 45000 },
        { id: '3', name: 'Claude (cheated)', score: 15000, total_time: 1000 },
      ]
      mock.sort((a, b) => b.score - a.score || a.total_time - b.total_time)
      setEntries(mock.slice(0, 10))
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('total_time', { ascending: true })
      .limit(10)
    if (!error) setEntries(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaderboard()

    if (!supabase) return
    // Real-time subscription
    const channel = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leaderboard' }, () => {
        fetchLeaderboard()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const playerRank = entries.findIndex(e => e.name === playerName && e.score === playerScore) + 1

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-4xl mb-1 text-glow"
            style={{ fontFamily: '"Fredoka One", cursive', color: '#00857A' }}
          >
            Leaderboard
          </h2>
          <p className="text-sm" style={{ color: '#4DB8B0' }}>
            {entries.length} vibe coders ranked
            {playerRank > 0 && ` · You're #${playerRank}`}
          </p>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12" style={{ color: '#4DB8B0' }}>
            Loading scores…
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,133,122,0.25)' }}
          >
            {entries.map((entry, i) => {
              const isPlayer = entry.name === playerName && entry.score === playerScore
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 px-5 py-4 transition-all"
                  style={{
                    background: isPlayer
                      ? 'rgba(0,133,122,0.2)'
                      : i % 2 === 0
                      ? '#1A2E2D'
                      : '#162928',
                    borderBottom: i < entries.length - 1
                      ? '1px solid rgba(0,133,122,0.1)'
                      : undefined,
                    boxShadow: isPlayer ? 'inset 0 0 0 1px rgba(0,133,122,0.5)' : undefined,
                  }}
                >
                  {/* Rank */}
                  <span
                    className="w-8 text-center text-lg"
                    style={{
                      fontFamily: '"Fredoka One", cursive',
                      color: i < 3 ? '#F0FAFA' : 'rgba(240,250,250,0.4)',
                    }}
                  >
                    {MEDALS[i] || i + 1}
                  </span>

                  {/* Name */}
                  <span
                    className="flex-1 text-base font-semibold truncate"
                    style={{ color: isPlayer ? '#00A896' : '#F0FAFA' }}
                  >
                    {entry.name}
                    {isPlayer && (
                      <span
                        className="ml-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,133,122,0.3)', color: '#4DB8B0' }}
                      >
                        you
                      </span>
                    )}
                  </span>

                  {/* Score */}
                  <span
                    className="text-base font-bold tabular-nums"
                    style={{
                      fontFamily: '"Fredoka One", cursive',
                      color: isPlayer ? '#00A896' : '#4DB8B0',
                    }}
                  >
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-3 rounded-xl text-base transition-all duration-200"
            style={{
              background: 'rgba(0,133,122,0.15)',
              border: '1px solid rgba(0,133,122,0.4)',
              color: '#4DB8B0',
              fontFamily: '"Fredoka One", cursive',
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
