import React from 'react';
import Classes from './AnswerItem.module.css';

const AnswerItem = props => {

  const itemClasses = [Classes.AnswerItem];

  if ( props.state ) {
    itemClasses.push(Classes[props.state]);
  }

  return (
    <li 
      onClick={() => props.onAnswerClick(props.answer.id)}
      className={itemClasses.join(' ')} >
      {props.answer.text}
    </li>
  );
}

export default AnswerItem;