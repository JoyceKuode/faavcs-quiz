import TimerBar from './TimerBar'

const LABELS = ['A', 'B', 'C', 'D']

// Per-letter accent colors (idle state)
const LETTER_COLORS = [
  { bg: 'rgba(194,65,12,0.15)',   border: '#fb923c', badge: '#fb923c' }, // A — orange
  { bg: 'rgba(67,56,202,0.15)',   border: '#818cf8', badge: '#818cf8' }, // B — indigo
  { bg: 'rgba(126,34,206,0.15)',  border: '#c084fc', badge: '#c084fc' }, // C — purple
  { bg: 'rgba(190,18,60,0.15)',   border: '#fb7185', badge: '#fb7185' }, // D — pink
]

function optionState(optionId, selectedAnswer, correctId, isLocked) {
  if (!isLocked) return 'idle'
  if (optionId === correctId) return 'correct'
  if (optionId === selectedAnswer) return 'wrong'
  return 'dim'
}

function getOptionStyle(state, letterIndex) {
  if (state === 'idle') {
    const c = LETTER_COLORS[letterIndex]
    return {
      background: c.bg,
      border: `2px solid ${c.border}`,
      color: '#F0FAFA',
      cursor: 'pointer',
    }
  }
  if (state === 'correct') return {
    background: 'rgba(0,200,100,0.15)',
    border: '2px solid #22c55e',
    color: '#F0FAFA',
  }
  if (state === 'wrong') return {
    background: 'rgba(239,68,68,0.15)',
    border: '2px solid #ef4444',
    color: '#F0FAFA',
  }
  // dim
  return {
    background: 'rgba(13,31,30,0.5)',
    border: '2px solid rgba(240,250,250,0.08)',
    color: 'rgba(240,250,250,0.3)',
  }
}

function getBadgeStyle(state, letterIndex) {
  if (state === 'correct') return { background: '#22c55e', color: '#fff' }
  if (state === 'wrong')   return { background: '#ef4444', color: '#fff' }
  if (state === 'dim')     return { background: 'rgba(240,250,250,0.07)', color: 'rgba(240,250,250,0.3)' }
  const c = LETTER_COLORS[letterIndex]
  return { background: `${c.badge}25`, color: c.badge }
}

export default function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  timeLeft,
  maxTime,
  selectedAnswer,
  isLocked,
  score,
  answers,
  onSelect,
  onNext,
}) {
  return (
    <div className="min-h-screen grid-bg flex flex-col p-4 sm:p-6">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {Array.from({ length: totalQuestions }).map((_, i) => {
            const answer = answers[i]
            const isCurrent = i === currentIndex && !isLocked
            const isPast = i < answers.length

            let dotStyle = {}
            let extraClass = ''

            if (isCurrent) {
              dotStyle = {
                width: 12, height: 12, borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #F0FAFA',
                boxShadow: '0 0 6px rgba(240,250,250,0.6)',
              }
              extraClass = 'animate-pulse'
            } else if (isPast && answer) {
              dotStyle = {
                width: 10, height: 10, borderRadius: '50%',
                background: answer.isCorrect ? '#00857A' : '#ef4444',
              }
            } else {
              dotStyle = {
                width: 8, height: 8, borderRadius: '50%',
                background: 'rgba(240,250,250,0.15)',
              }
            }

            return (
              <div key={i} className={`shrink-0 transition-all duration-300 ${extraClass}`} style={dotStyle} />
            )
          })}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: '#4DB8B0' }}>
            Question {currentIndex + 1} / {totalQuestions}
          </span>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,133,122,0.15)', color: '#4DB8B0' }}
          >
            {score.toLocaleString()} pts
          </span>
        </div>
        <TimerBar timeLeft={timeLeft} maxTime={maxTime} />
      </div>

      {/* Question card */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div
          className="rounded-2xl p-6 mb-4 animate-slide-up"
          style={{ background: '#1A2E2D', border: '1px solid rgba(0,133,122,0.2)' }}
        >
          {/* Emoji */}
          {question.emoji && (
            <div className="text-5xl mb-3">{question.emoji}</div>
          )}
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#4DB8B0' }}
          >
            {question.context}
          </div>
          <p className="text-lg sm:text-xl leading-snug" style={{ color: '#F0FAFA' }}>
            {question.question}
          </p>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {question.options.map((opt, i) => {
            const state = optionState(opt.id, selectedAnswer, question.correct, isLocked)
            const optStyle = getOptionStyle(state, i)
            const badgeStyle = getBadgeStyle(state, i)
            const isCorrectAndLocked = isLocked && opt.id === question.correct

            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                disabled={isLocked}
                className={`text-left p-4 rounded-xl transition-all duration-200 flex items-start gap-3 ${
                  state === 'idle' ? 'active:scale-[0.98]' : ''
                } ${isCorrectAndLocked ? 'animate-bounce-in' : ''} ${
                  state === 'wrong' ? 'animate-shake' : ''
                }`}
                style={optStyle}
              >
                <span
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={badgeStyle}
                >
                  {LABELS[i]}
                </span>
                <span className="text-sm sm:text-base leading-snug pt-0.5">{opt.text}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation + Next button */}
        {isLocked && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(0,133,122,0.1)',
                border: '1px solid rgba(0,133,122,0.3)',
              }}
            >
              <span className="text-sm font-semibold mr-2" style={{ color: '#4DB8B0' }}>
                {selectedAnswer === question.correct ? '✓ Correct!' : selectedAnswer === null ? "Time's up!" : '✗ Wrong!'}
              </span>
              <span className="text-sm" style={{ color: '#F0FAFA' }}>
                {question.explanation}
              </span>
            </div>

            <button
              onClick={onNext}
              className="w-full py-3.5 rounded-xl text-lg font-semibold glow-teal-sm transition-all duration-200"
              style={{
                fontFamily: '"Fredoka One", cursive',
                background: '#00857A',
                color: '#F0FAFA',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#00A896'}
              onMouseLeave={e => e.currentTarget.style.background = '#00857A'}
            >
              {currentIndex + 1 >= totalQuestions ? 'See Results →' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
