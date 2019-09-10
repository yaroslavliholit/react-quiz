import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import fetchQuizes from '../../store/actions/quiz';
import Loader from '../../ui/Loader/Loader.jsx';
import Classes from './QuizList.module.css';

class QuizList extends Component {

  // обращаемся к массиву всех тестов которые есть в приложении
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li className={Classes.QuizList__item } key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={Classes.QuizList}>
        <h1 className={Classes.QuizList__title}>Список тестов</h1>
        {
          // this.props.loading && this.props.quizes.length !== 0 -> This is disable LOADER component
          this.props.loading 
            ? <Loader />
            : <ul className={Classes.QuizList__list }>
                {  this.renderQuizes() }
              </ul>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);