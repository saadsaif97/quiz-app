import React, { useEffect, useRef } from 'react'
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
  const appContainer = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const detectClickOutsideCard = (e: any): void => {
      // if the click is in the card, do nothing and return
      if (appContainer.current.contains(e.target)) return

      console.log('outside')
      // else remove userAnswer from current number
      setUserAnswers((prev: any) =>
        prev.filter((ans: any, i: number) => i !== number)
      )
    }

    document.addEventListener('click', detectClickOutsideCard)
    return () => {
      document.removeEventListener('click', detectClickOutsideCard)
    }
  }, [])

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
  console.log('userAnswers', userAnswers)

  return (
    <div style={{ maxWidth: '400px' }} ref={appContainer}>
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
