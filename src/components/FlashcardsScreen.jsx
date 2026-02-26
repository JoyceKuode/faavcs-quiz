import { useState } from 'react'
import { flashcards } from '../data/flashcards'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardsScreen({ onStartQuiz, onBack }) {
  const [deck, setDeck] = useState(flashcards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = deck[index]
  const total = deck.length

  function handleShuffle() {
    setDeck(shuffle(flashcards))
    setIndex(0)
    setFlipped(false)
  }
  function flip() {
    setFlipped(f => !f)
  }

  function goNext() {
    setFlipped(false)
    setIndex(i => (i + 1) % total)
  }

  function goPrev() {
    setFlipped(false)
    setIndex(i => (i - 1 + total) % total)
  }

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-lg flex flex-col" style={{ minHeight: '100vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <button
            onClick={onBack}
            className="text-sm transition-colors duration-150"
            style={{ color: '#4DB8B0', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back
          </button>
          <h2
            className="text-xl"
            style={{ fontFamily: '"Fredoka One", cursive', color: '#00857A' }}
          >
            Study Mode
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm tabular-nums" style={{ color: '#4DB8B0' }}>
              {index + 1} / {total}
            </span>
            <button
              onClick={handleShuffle}
              title="Shuffle cards"
              className="text-base transition-opacity duration-150"
              style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
            >
              🔀
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full rounded-full mb-8"
          style={{ height: '4px', background: 'rgba(240,250,250,0.08)' }}
        >
          <div
            style={{
              height: '100%',
              width: `${((index + 1) / total) * 100}%`,
              background: '#00857A',
              borderRadius: '9999px',
              transition: 'width 0.3s ease-out',
            }}
          />
        </div>

        {/* Card — grid stacking so height matches content */}
        <div
          onClick={flip}
          style={{
            display: 'grid',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          {/* Front */}
          <div
            style={{
              gridRow: 1,
              gridColumn: 1,
              background: '#1A2E2D',
              border: '1px solid rgba(0,133,122,0.3)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              opacity: flipped ? 0 : 1,
              transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              pointerEvents: flipped ? 'none' : 'auto',
              minHeight: '280px',
            }}
          >
            <div className="text-5xl mb-5">{card.emoji}</div>
            <p
              className="text-xl leading-snug"
              style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
            >
              {card.front}
            </p>
            <p className="text-xs mt-6" style={{ color: 'rgba(77,184,176,0.6)' }}>
              Tap to reveal
            </p>
          </div>

          {/* Back */}
          <div
            style={{
              gridRow: 1,
              gridColumn: 1,
              background: '#0D1F1E',
              border: '1px solid rgba(0,133,122,0.5)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              opacity: flipped ? 1 : 0,
              transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              pointerEvents: flipped ? 'auto' : 'none',
              minHeight: '280px',
            }}
          >
            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: '#F0FAFA', fontFamily: 'Inter, sans-serif' }}
            >
              {card.back}
            </div>
            <p className="text-xs mt-6" style={{ color: 'rgba(77,184,176,0.6)' }}>
              Tap to flip back
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            onClick={goPrev}
            className="px-5 py-2.5 rounded-xl text-sm transition-all duration-150"
            style={{
              fontFamily: '"Fredoka One", cursive',
              background: 'rgba(0,133,122,0.15)',
              border: '1px solid rgba(0,133,122,0.25)',
              color: '#4DB8B0',
              cursor: 'pointer',
            }}
          >
            ← Prev
          </button>

          <button
            onClick={e => { e.stopPropagation(); flip() }}
            className="flex-1 py-2.5 rounded-xl text-sm transition-all duration-150"
            style={{
              fontFamily: '"Fredoka One", cursive',
              background: flipped ? 'rgba(0,133,122,0.1)' : 'rgba(0,133,122,0.2)',
              border: '1px solid rgba(0,133,122,0.4)',
              color: '#4DB8B0',
              cursor: 'pointer',
            }}
          >
            {flipped ? 'Hide Answer' : 'Show Answer'}
          </button>

          <button
            onClick={goNext}
            className="px-5 py-2.5 rounded-xl text-sm transition-all duration-150"
            style={{
              fontFamily: '"Fredoka One", cursive',
              background: 'rgba(0,133,122,0.15)',
              border: '1px solid rgba(0,133,122,0.25)',
              color: '#4DB8B0',
              cursor: 'pointer',
            }}
          >
            Next →
          </button>
        </div>

        {/* Quiz CTA */}
        <button
          onClick={onStartQuiz}
          className="w-full mt-3 mb-4 py-3 rounded-xl text-base font-semibold transition-all duration-150"
          style={{
            fontFamily: '"Fredoka One", cursive',
            background: '#00857A',
            color: '#F0FAFA',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#00A896'}
          onMouseLeave={e => e.currentTarget.style.background = '#00857A'}
        >
          Ready? Start the Quiz 🧠
        </button>
      </div>
    </div>
  )
}
