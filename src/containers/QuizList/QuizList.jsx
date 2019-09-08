import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../axios/axios-quiz.js';
import Loader from '../../ui/Loader/Loader.jsx';
import Classes from './QuizList.module.css';

export default class QuizList extends Component {

  state = {
    loading: true,
    quizes: [],
  };

  // обращаемся к массиву всех тестов которые есть в приложении
  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li className={Classes.QuizList__item } key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
    
      this.setState({
        quizes,
        loading: false
      });

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={Classes.QuizList}>
        <h1>Список тестов</h1>

        {
          this.state.loading 
            ? <Loader />
            : <ul className={Classes.QuizList__list }>
                {  this.renderQuizes() }
              </ul>
        }
      </div>
    );
  }
}