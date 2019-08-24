import React from 'react';
import Classes from './Button.module.css';

const Button = props => {

  const cls = [
    Classes.Button,
    Classes[props.type]
  ];

  return (
      <button 
        className={cls.join(' ')}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
  );
};

export default Button;