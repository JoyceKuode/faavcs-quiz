export default function ModeSelect({ onStudy, onQuiz, onLeaderboard }) {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👋</div>
          <h2
            className="text-3xl mb-2"
            style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
          >
            What do you want to do?
          </h2>
          <p className="text-sm" style={{ color: '#4DB8B0' }}>
            Study up, take the quiz, or check the leaderboard
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Leaderboard */}
          <button
            onClick={onLeaderboard}
            className="w-full rounded-2xl p-6 text-left transition-all duration-200"
            style={{
              background: '#1A2E2D',
              border: '1px solid rgba(0,133,122,0.3)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#00857A'
              e.currentTarget.style.background = 'rgba(0,133,122,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,133,122,0.3)'
              e.currentTarget.style.background = '#1A2E2D'
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                <div
                  className="text-xl font-semibold"
                  style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
                >
                  Leaderboard
                </div>
                <div className="text-sm mt-0.5" style={{ color: '#4DB8B0' }}>
                  See who's winning the vibe-coding race
                </div>
              </div>
            </div>
          </button>

          {/* Study */}
          <button
            onClick={onStudy}
            className="w-full rounded-2xl p-6 text-left transition-all duration-200"
            style={{
              background: '#1A2E2D',
              border: '1px solid rgba(0,133,122,0.3)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#00857A'
              e.currentTarget.style.background = 'rgba(0,133,122,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,133,122,0.3)'
              e.currentTarget.style.background = '#1A2E2D'
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">📚</span>
              <div>
                <div
                  className="text-xl font-semibold"
                  style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
                >
                  Study Mode
                </div>
                <div className="text-sm mt-0.5" style={{ color: '#4DB8B0' }}>
                  20 flashcards from the docs &amp; slides — flip through at your own pace
                </div>
              </div>
            </div>
          </button>

          {/* Quiz */}
          <button
            onClick={onQuiz}
            className="w-full rounded-2xl p-6 text-left transition-all duration-200"
            style={{
              background: '#00857A',
              border: '1px solid #00857A',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#00A896'}
            onMouseLeave={e => e.currentTarget.style.background = '#00857A'}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🧠</span>
              <div>
                <div
                  className="text-xl font-semibold"
                  style={{ fontFamily: '"Fredoka One", cursive', color: '#F0FAFA' }}
                >
                  Take the Quiz
                </div>
                <div className="text-sm mt-0.5" style={{ color: '#E0F5F3' }}>
                  10 questions, timed — compete for the leaderboard
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
