import { useState } from 'react'
import { useQuiz } from './hooks/useQuiz'
import SplashScreen from './components/SplashScreen'
import ModeSelect from './components/ModeSelect'
import FlashcardsScreen from './components/FlashcardsScreen'
import QuizQuestion from './components/QuizQuestion'
import ResultsScreen from './components/ResultsScreen'
import Leaderboard from './components/Leaderboard'

// Screens: splash | mode | study | quiz | results | leaderboard
export default function App() {
  const [screen, setScreen] = useState('splash')
  const [playerName, setPlayerName] = useState(null)
  const [playerScore, setPlayerScore] = useState(null)

  const quiz = useQuiz()

  function handleStartQuiz() {
    quiz.reset()
    setScreen('quiz')
  }

  function handleNext() {
    if (quiz.isFinished || quiz.currentIndex + 1 >= quiz.totalQuestions) {
      quiz.advance()
      setScreen('results')
    } else {
      quiz.advance()
    }
  }

  function handleLeaderboard(name, score) {
    setPlayerName(name)
    setPlayerScore(score)
    setScreen('leaderboard')
  }

  function handlePlayAgain() {
    setScreen('mode')
  }

  if (screen === 'splash') {
    return <SplashScreen onStart={() => setScreen('mode')} />
  }

  if (screen === 'mode') {
    return (
      <ModeSelect
        onQuiz={handleStartQuiz}
        onStudy={() => setScreen('study')}
        onLeaderboard={() => handleLeaderboard(null, null)}
      />
    )
  }

  if (screen === 'study') {
    return (
      <FlashcardsScreen
        onStartQuiz={handleStartQuiz}
        onBack={() => setScreen('mode')}
      />
    )
  }

  if (screen === 'quiz') {
    if (!quiz.currentQuestion) return null
    return (
      <QuizQuestion
        question={quiz.currentQuestion}
        currentIndex={quiz.currentIndex}
        totalQuestions={quiz.totalQuestions}
        timeLeft={quiz.timeLeft}
        maxTime={quiz.maxTime}
        selectedAnswer={quiz.selectedAnswer}
        isLocked={quiz.isLocked}
        score={quiz.score}
        answers={quiz.answers}
        onSelect={quiz.selectAnswer}
        onNext={handleNext}
      />
    )
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        score={quiz.score}
        totalTime={quiz.totalTime}
        onLeaderboard={handleLeaderboard}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  if (screen === 'leaderboard') {
    return (
      <Leaderboard
        playerName={playerName}
        playerScore={playerScore}
        onBack={() => setScreen('mode')}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  return null
}
