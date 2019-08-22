import React from 'react';
import AnswersList from '../AnswersList/AnswersList.jsx';
import Classes from './ActiveQuiz.module.css';

// Компонент активного вопроса (отвечает за текущий вопрос)
// Оболочка

const ActiveQuiz = props => {
  return (
    <div className={Classes.ActiveQuiz}>
      <p className={Classes.Question}>
        <span>{`${props.answerNumber}. ${props.question}`}</span>
        <small>{`${props.answerNumber} из ${props.quizLength}`}</small>
      </p>
      <AnswersList 
        onAnswerClick={props.onAnswerClick}
        answers={props.answers}
        state={props.state}
      />
    </div>
  );
}

export default ActiveQuiz;