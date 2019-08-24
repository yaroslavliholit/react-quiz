import React from 'react';
import Classes from './FinishedQuiz.module.css';
import success from './done.svg';
import error from './error.svg';

// Компонент для подведения итогов.
// Будем выводить список всех вопросов с результатми.
// Правильно или не правильно ответели. 

const FinishedQuiz = props => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={Classes.FinishedQuiz}>
      <h2 className={Classes.FinishedQuiz__title}>Finishes</h2>

      <ol className={Classes.FinishedQuiz__list}>
        {
          props.quiz.map((quizItem, index) => {
            return (
              <li 
                className={Classes.FinishedQuiz__list_item} 
                key={index}
              >
                { quizItem.question }
                <img 
                  src={ props.results[quizItem.id] === 'error' ? error : success } 
                  alt="result" 
                  className={Classes.FinishedQuiz__img}
                />
              </li>
            );
          })
        }
      </ol>

      <strong>Правильно {successCount} из {props.quiz.length}</strong>

      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  );
}

export default FinishedQuiz;