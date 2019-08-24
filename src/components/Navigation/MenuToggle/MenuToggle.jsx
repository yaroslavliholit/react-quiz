import React from 'react';
import Classes from './MenuToggle.module.css';
import menuOpen from './menuOpen.svg';
import menuCancel from './menuCancel.svg';

const MenuToggle = props => {

  const cls = [Classes.MenuToggle];

  if (props.isOpen) {
    cls.push(Classes.open)
  }

  return (
    <img 
      src={ props.isOpen ? menuCancel : menuOpen } 
      alt="menu"
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;