import React from 'react';
import Classes from './Backdrop.module.css';

const Backdrop = props => {
  return (
    <div className={Classes.Backdrop} onClick={props.onClick}></div>
  );
};

export default Backdrop;