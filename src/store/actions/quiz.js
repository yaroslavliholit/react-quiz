import axios from '../../axios/axios-quiz';
import {
  FETCH_QUZES_START,
  FETCH_QUZES_SUCCESS,
  FETCH_QUZES_ERROR,
  FETCH_QUIZ_SUCCES,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionsType';

export default function fetchQuizes() {
  return async dispatch => {

    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUZES_ERROR,
    error: e,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUZES_SUCCESS,
    quizes,
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUZES_START,
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz,
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }

  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  }
}

// Правильный вариант ответа
export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {

    const state = getState().quiz;

    // Условие запрещает обрабатывать клики, если уже есть правильный ответ
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      // Если в первый раз правильно ответели на вопрос
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({
        [answerId]: 'success'
      }, results));

      // Создание Timeout необходимо для того что бы дать время на отображения ответа (правильно/неправильно)
      const timeout = window.setTimeout(() => {
        // Нужно проверить является ли активный вопрос последним из всех вопросов
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      dispatch(quizSetState({
        [answerId]: 'error'
      }, results));
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
