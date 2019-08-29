import React from 'react';
import Classes from './Input.module.css';

const isInvalid = ({valid, touched, shuldValidate}) => {
  return !valid && shuldValidate && touched;
};

const Input = props => {

  const inputType = props.type || 'text';
  const cls = [Classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(Classes.Invalid);
  }

  return (
    <div className={cls.join(' ')}>

      <label className={Classes.Input__label} htmlFor={htmlFor} >
        {props.label}
      </label>

      <input 
        className={Classes.Input__field}
        id={htmlFor} 
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props) 
          ? <span className={Classes.Field_error}> { props.errorMessage || 'Введите верное значение' } </span> 
          : null 
      }

    </div>
  );

};

export default Input;