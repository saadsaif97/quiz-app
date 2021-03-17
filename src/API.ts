import { shuffleArray } from './utils/utils'

export type Question = {
  category: string
  question: string
  answer: string
  difficulty: string
  correct_answer: string
  incorrect_answers: string[]
  type: string
}

export type QuestionStat = Question & { answers: string[] }

const getQuestions = async (): Promise<QuestionStat> => {
  const endPoint =
    'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
  const data = await (await fetch(endPoint)).json()

  return data.results.map((question: Question) => ({
    question,
    answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }))
}

export { getQuestions }
