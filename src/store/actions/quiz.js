import axios from '../../axios/axios-quiz';
import {FETCH_QUZES_START, FETCH_QUZES_SUCCESS, FETCH_QUZES_ERROR} from './actionsType';

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

export function fetchQuizesError (e) {
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