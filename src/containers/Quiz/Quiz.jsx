import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.jsx';
import Classes from './Quiz.module.css';

// Страница где мы будем проходить тест
// Компонент отвечает за голосование (опрос)

export default class Quiz extends Component {

  state = {
    activeQuestion: 0,
    // Будем хранить инф. о текущем клике юзера (0 или 1)
    answerState: null,
    // В ключе quiz будут хранится все вопросы, правильные ответы, которые относятся к голосованию 
    quiz: [
      // question item
      {
        question: 'Сколько будет 2^2?',
        rightAnswerId: 1,
        id: 1,
        answers: [
          {text: '4', id: 1},
          {text: '2 ', id: 2},
          {text: '3 ', id: 3},
          {text: '1', id: 4},
        ],
      },
      {
        question: 'Сколько будет 3^2?',
        rightAnswerId: 3,
        id: 2,
        answers: [
          {text: '4', id: 1},
          {text: '2 ', id: 2},
          {text: '6 ', id: 3},
          {text: '1', id: 4},
        ],
      },
      // question item
    ],
  };

  isQuizFinish(){
    if ( (this.state.activeQuestion + 1) >= this.state.quiz.length ) {
      return true;
    }
  }

  // Правильный вариант ответа
  onAnswerClickHandler = (answerId) => {

    // Условие запрещает обрабатывать клики, если уже есть правильный ответ
    if ( this.state.answerState ) {
      const key = Object.keys(this.state.answerState)[0];
      if ( this.state.answerState[key] === 'succes' ) {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {

      this.setState({
        answerState: { [answerId]: 'succes' }
      });

      // Создание Timeout необходимо для того что бы дать время на отображения ответа (правильно/неправильно)
      const timeout = window.setTimeout(() => {
        // Нужно проверить является ли активный вопрос последним из всех вопросов
        if (this.isQuizFinish()) {
          console.log('Finish Quiz');
        } else {
          this.setState({
            answerState: null,
            activeQuestion: this.state.activeQuestion + 1,
          });
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      this.setState({
        answerState: { [answerId]: 'error' }
      });
      console.log(false);
    }
  }

  render () {
    return (
      <div className={Classes.Quiz}>
          <div className={Classes.QuizWrapper}>
            <h1 className={Classes.Quiz__title}>Ответьте на все вопросы</h1>
            <ActiveQuiz 
              // TODO: Переписать onAnswerClick на Context API
              onAnswerClick={this.onAnswerClickHandler}
              
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          </div>
      </div>
    );
  }
}
