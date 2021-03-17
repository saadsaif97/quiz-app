import { useState } from 'react'
import { getQuestions } from './API'
import QuestionsCard from './components/QuestionsCard'
import EndScreen from './components/EndScreen'

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [over, setOver] = useState(true)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<any>([])
  const [gameOver, setGameOver] = useState(false)

  const startQuiz = async () => {
    setLoading(true)
    const fetchedQuestions = await getQuestions()
    setQuestions(fetchedQuestions)
    setLoading(false)
    setOver(false)
    setGameOver(false)
    setUserAnswers([])
    setNumber(0)
    setScore(0)
  }

  const selectQuestion = (answer: string): void => {
    // filling the array index with object
    userAnswers[number] = {
      question: questions[number].question.question,
      user_answer: answer,
      correct_answer: questions[number].question.correct_answer,
      answers: questions[number].answers,
    }
    setUserAnswers([...userAnswers])
  }

  const EndScreenProps = {
    userAnswers,
    startQuiz,
    score,
  }

  const cardProps = {
    number,
    setNumber,
    questions,
    selectQuestion,
    userAnswers,
    setUserAnswers,
    score,
    setScore,
    setGameOver,
  }

  return (
    <div>
      {gameOver && <EndScreen {...EndScreenProps} />}
      <h1 style={{ marginBottom: '20px' }}>Quiz</h1>
      {!over && (
        <>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Question: {number + 1}/10</span>
            <span>Score: {score}</span>
          </p>
          <hr />
        </>
      )}
      {/* show when loading data */}
      {loading && <h4>Loading...</h4>}
      {/* show start button when game is over */}
      {!loading && over && (
        <button className='btn' onClick={startQuiz}>
          Start Quiz
        </button>
      )}
      {/* show card when game is not over */}
      {!over && <QuestionsCard {...cardProps} />}
    </div>
  )
}

export default App
