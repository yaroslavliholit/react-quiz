import React from 'react';
import Classes from './FinishedQuiz.module.css';
import done from './done.svg';
import error from './error.svg';

// Компонент для подведения итогов.
// Будем выводить список всех вопросов с результатми.
// Правильно или не правильно ответели. 

const FinishedQuiz = props => {
  return (
    <div className={Classes.FinishedQuiz}>
      <h2 className={Classes.FinishedQuiz__title}>Finishes</h2>

      <ol className={Classes.FinishedQuiz__list}>

        <li className={Classes.FinishedQuiz__list_item}>
          Text
          <img src={done} alt="done" className={Classes.FinishedQuiz__img}/>
        </li>
        <li className={Classes.FinishedQuiz__list_item}>
          Text
          <img src={error} alt="error" className={Classes.FinishedQuiz__img}/>
        </li>
        
      </ol>

      <strong>Правильно 4 из 10</strong>

      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
}

export default FinishedQuiz;