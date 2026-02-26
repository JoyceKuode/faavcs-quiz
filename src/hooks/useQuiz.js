import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { questions } from '../data/questions'

const QUESTION_TIME = 30  // seconds per question
const BASE_SCORE = 1000
const SPEED_BONUS_MAX = 500

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useQuiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isLocked, setIsLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isFinished, setIsFinished] = useState(false)

  const [resetKey, setResetKey] = useState(0)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  const currentQuestion = shuffledQuestions[currentIndex]

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [currentIndex])

  function handleTimeout() {
    setIsLocked(true)
    setSelectedAnswer(null)
    recordAnswer(null, QUESTION_TIME)
  }

  function selectAnswer(optionId) {
    if (isLocked) return
    clearInterval(timerRef.current)

    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const timeUsed = Math.min(elapsed, QUESTION_TIME)
    const timeRemaining = QUESTION_TIME - timeUsed

    setSelectedAnswer(optionId)
    setIsLocked(true)
    recordAnswer(optionId, timeUsed, timeRemaining)
  }

  function recordAnswer(optionId, timeUsed, timeRemaining = 0) {
    const q = shuffledQuestions[currentIndex]
    const isCorrect = optionId === q.correct
    let points = 0
    if (isCorrect) {
      const speedBonus = Math.round((timeRemaining / QUESTION_TIME) * SPEED_BONUS_MAX)
      points = BASE_SCORE + speedBonus
    }
    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00857A', '#4DB8B0', '#f59e0b', '#fb923c', '#ffffff'],
      })
    }
    setScore(prev => prev + points)
    setTotalTime(prev => prev + Math.round(timeUsed * 1000))
    setAnswers(prev => [...prev, { questionId: q.id, selected: optionId, correct: q.correct, isCorrect, points }])
  }

  function advance() {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setIsFinished(true)
      return
    }
    setCurrentIndex(prev => prev + 1)
    setTimeLeft(QUESTION_TIME)
    setSelectedAnswer(null)
    setIsLocked(false)
  }

  function reset() {
    clearInterval(timerRef.current)
    setShuffledQuestions(shuffle(questions))
    setCurrentIndex(0)
    setTimeLeft(QUESTION_TIME)
    setSelectedAnswer(null)
    setIsLocked(false)
    setScore(0)
    setTotalTime(0)
    setAnswers([])
    setIsFinished(false)
    setResetKey(k => k + 1)
  }

  // Shuffle questions on mount
  useEffect(() => {
    setShuffledQuestions(shuffle(questions))
  }, [])

  // Start timer when question changes
  useEffect(() => {
    if (shuffledQuestions.length === 0 || isFinished) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [currentIndex, shuffledQuestions.length, resetKey])

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: shuffledQuestions.length,
    timeLeft,
    maxTime: QUESTION_TIME,
    selectedAnswer,
    isLocked,
    score,
    totalTime,
    answers,
    isFinished,
    selectAnswer,
    advance,
    reset,
  }
}
