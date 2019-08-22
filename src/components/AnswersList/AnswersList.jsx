import React from 'react';
import AnswerItem from '../AnswerItem/AnswerItem.jsx';
import Classes from './AnswersList.module.css';

// Компонент получает массив возможных ответов и выводит их на экран

const AnswersList = props => {
  return (
    <div>
      <ul className={Classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
              <AnswerItem 
                onAnswerClick={props.onAnswerClick}
                key={index}
                answer={answer}
                state={props.state ? props.state[answer.id] : null}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default AnswersList;