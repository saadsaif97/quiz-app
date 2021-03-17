import React from 'react'
import { htmlDecode } from '../utils/utils'

type QuestionCardProps = {
  number: number
  setNumber: Function
  questions: any
  selectQuestion: Function
  userAnswers: any
  setUserAnswers: Function
  score: number
  setScore: Function
  setGameOver: Function
}

const QuestionsCard: React.FC<QuestionCardProps> = ({
  number,
  setNumber,
  questions,
  selectQuestion,
  userAnswers,
  setUserAnswers,
  score,
  setScore,
  setGameOver,
}) => {
  const checkAndIncreaseScore = () => {
    // user has selected the answer and answer is correct
    if (
      userAnswers[number] &&
      userAnswers[number]['user_answer'] ===
        userAnswers[number]['correct_answer']
    ) {
      setScore(score + 1)
    }
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <h5>{htmlDecode(questions[number].question.question)}</h5>
      <hr className='light' />
      {questions[number].answers.map((answer: string, idx: number) => (
        <button
          key={idx}
          onClick={() => {
            selectQuestion(answer)
          }}
          // if user has selected answer and user_answer matches answer to map, add selected class
          className={`btn answer ${
            userAnswers[number] && userAnswers[number].user_answer === answer
              ? 'selected'
              : ''
          }`}
        >
          {htmlDecode(answer)}
        </button>
      ))}
      {userAnswers[number] && (
        <button
          className='btn'
          onClick={() => {
            setNumber(number + 1)
            checkAndIncreaseScore()
          }}
          disabled={number >= 9}
        >
          Next
        </button>
      )}
      {userAnswers[9] && number === 9 && (
        <button onClick={() => setGameOver(true)} className='btn'>
          Submit All
        </button>
      )}
    </div>
  )
}

export default QuestionsCard
