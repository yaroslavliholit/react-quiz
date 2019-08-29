import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Classes from './QuizList.module.css';

export default class QuizList extends Component {

  // обращаемся к массиву всех тестов которые есть в приложении
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li className={Classes.QuizList__item } key={index}>
          <NavLink to={'/quiz/' + quiz}>
            Тест {quiz}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={Classes.QuizList}>
        <h1>Список тестов</h1>
        <ul className={Classes.QuizList__list }>
          { this.renderQuizes() }
        </ul>
      </div>
    );
  }
}