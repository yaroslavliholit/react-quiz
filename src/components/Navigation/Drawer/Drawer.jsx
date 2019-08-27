import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../../ui/Backdrop/Backdrop.jsx';
import Classes from './Drawer.module.css';

const links = [
  {to: "/", label: 'Список', exact: true},
  {to: "/auth", label: 'Авторизация', exact: false},
  {to: "/quiz-creator", label: 'Создать тест', exact: false},
];

export default class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index} className={Classes.Drawer__listItem}>
          <NavLink 
            to={link.to} 
            exact={link.exact} 
            activeClassName={Classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    })
  }

  render () {

    const cls = [Classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(Classes.close)
    }

    return(
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul className={Classes.Drawer__list}>
            {this.renderLinks()}
          </ul>
        </nav>
      </>
    );
  }
}