import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.jsx';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.jsx';
import Classes from './Quiz.module.css';

// Страница где мы будем проходить тест
// Компонент отвечает за голосование (опрос)

export default class Quiz extends Component {

  state = {
    // Ключ results будет хранить информацию о том как пользователь отвечал на вопросы
    results: {}, // {[id]: succes error}
    isFinished: false,
    activeQuestion: 0,
    // Будем хранить инф. о текущем клике юзера (0 или 1)
    answerState: null, // {[id]: succes error}
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

  RetryHendler = () => {
    this.setState({
      activeQuestion: 0,
      isFinished: false,
      answerState: null,
      results: {},
    });
  }

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
      if ( this.state.answerState[key] === 'success' ) {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      // Если в первый раз правильно ответели на вопрос
      if ( !results[question.id] ) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      // Создание Timeout необходимо для того что бы дать время на отображения ответа (правильно/неправильно)
      const timeout = window.setTimeout(() => {
        // Нужно проверить является ли активный вопрос последним из всех вопросов
        if (this.isQuizFinish()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  }

  render () {
    return (
      <div className={Classes.Quiz}>
          <div className={Classes.QuizWrapper}>
            <h1 className={Classes.Quiz__title}>Ответьте на все вопросы</h1>

            {
              this.state.isFinished 
              ? <FinishedQuiz 
                  results={this.state.results} 
                  quiz={this.state.quiz}
                  onRetry={this.RetryHendler}
                />
              : <ActiveQuiz 
                // TODO: Переписать onAnswerClick на Context API
                onAnswerClick={this.onAnswerClickHandler}
                
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
            }


          </div>
      </div>
    );
  }
}
