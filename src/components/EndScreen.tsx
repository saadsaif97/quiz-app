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
  const scoreColor = score < 5 ? 'orangered' : 'green'
  const scoreImoji = score < 5 ? '😔' : '😀'

  return (
    <div className='backdrop'>
      <h2>Quiz Completed</h2>
      <h4>
        Score:{' '}
        <span style={{ color: scoreColor }}>
          {scoreImoji} {score}
        </span>
        /10
      </h4>
      <hr className='light' />
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {userAnswers.map(({ question, correct_answer, user_answer }, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <h6>{htmlDecode(question)}</h6>
            <p>Correct Answer: {correct_answer}</p>
            <p>Your Answer: {user_answer}</p>
          </div>
        ))}
      </div>
      <button
        className='btn'
        onClick={() => startQuiz()}
        style={{ border: '2px solid #e9e9e9' }}
      >
        Restart Quiz
      </button>
    </div>
  )
}

export default EndScreen
