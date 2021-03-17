import { htmlDecode } from '../utils/utils'

type userAnswer = {
  answers: string[]
  question: string
  correct_answer: string
  user_answer: string
}

type EndScreenPropTypes = {
  userAnswers: userAnswer[]
  startQuiz: Function
  score: number
}

const EndScreen: React.FC<EndScreenPropTypes> = ({
  userAnswers,
  startQuiz,
  score,
}) => {
  return (
    <div className='backdrop'>
      <h2>GameOver</h2>
      <h4>Score: {score}/10</h4>
      {userAnswers.map(({ question, correct_answer, user_answer }, idx) => (
        <div style={{ maxWidth: '1280px', justifySelf: 'left' }} key={idx}>
          <h6>{htmlDecode(question)}</h6>
          <p>Correct Answer: {correct_answer}</p>
          <p>Your Answer: {user_answer}</p>
        </div>
      ))}
      <button
        className='btn'
        onClick={() => startQuiz()}
        style={{ border: '2px solid #e9e9e9' }}
      >
        Restart Game
      </button>
    </div>
  )
}

export default EndScreen
