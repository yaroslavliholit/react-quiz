// reducer который относится к тестам
import {
  FETCH_QUZES_START,
   FETCH_QUZES_SUCCESS,
   FETCH_QUZES_ERROR,
   FETCH_QUIZ_SUCCES,
   QUIZ_SET_STATE,
   FINISH_QUIZ,
   QUIZ_NEXT_QUESTION,
   QUIZ_RETRY
} from '../actions/actionsType';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  // Ключ results будет хранить информацию о том как пользователь отвечал на вопросы
  results: {}, // {[id]: succes error}
  isFinished: false,
  activeQuestion: 0,
  // Будем хранить инф. о текущем клике юзера (0 или 1)
  answerState: null, // {[id]: succes error}
  // В ключе quiz будут хранится все вопросы, правильные ответы, которые относятся к голосованию 
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUZES_START: 
      return {
        ...state,
        loading: true
      };
    case FETCH_QUZES_SUCCESS: 
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUZES_ERROR: 
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCES:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      }
    case QUIZ_SET_STATE: 
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      }
    case FINISH_QUIZ: 
      return {
        ...state,
        isFinished: true,
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      }
    case QUIZ_RETRY: 
      return {
        ...state,
        activeQuestion: 0,
        isFinished: false,
        answerState: null,
        results: {},
      }
    default:
      return state;
  }
}