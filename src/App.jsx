import { useState } from 'react'
import { useQuiz } from './hooks/useQuiz'
import SplashScreen from './components/SplashScreen'
import NameEntry from './components/NameEntry'
import FlashcardsScreen from './components/FlashcardsScreen'
import QuizQuestion from './components/QuizQuestion'
import ResultsScreen from './components/ResultsScreen'
import Leaderboard from './components/Leaderboard'

// Screens: splash | name | study | quiz | results | leaderboard
export default function App() {
  const [screen, setScreen] = useState('splash')
  const [playerName, setPlayerName] = useState('')

  const quiz = useQuiz()

  function handleStart() {
    setScreen('name')
  }

  function handleStudy(name) {
    setPlayerName(name)
    setScreen('study')
  }

  function handleQuiz(name) {
    setPlayerName(name)
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

  function handleLeaderboard() {
    setScreen('leaderboard')
  }

  function handlePlayAgain() {
    quiz.reset()
    setScreen('name')
  }

  if (screen === 'splash') {
    return <SplashScreen onStart={handleStart} />
  }

  if (screen === 'name') {
    return <NameEntry onStudy={handleStudy} onQuiz={handleQuiz} />
  }

  if (screen === 'study') {
    return (
      <FlashcardsScreen
        onStartQuiz={() => { quiz.reset(); setScreen('quiz') }}
        onBack={() => setScreen('name')}
      />
    )
  }

  if (screen === 'quiz' && quiz.currentQuestion) {
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
        playerName={playerName}
        onLeaderboard={handleLeaderboard}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  if (screen === 'leaderboard') {
    return (
      <Leaderboard
        playerName={playerName}
        playerScore={quiz.score}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  return null
}
