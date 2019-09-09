import React, {Component} from 'react';
import {connect} from 'react-redux';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.jsx';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.jsx';
import Loader from '../../ui/Loader/Loader.jsx';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz.js';
 import Classes from './Quiz.module.css';

// Страница где мы будем проходить тест
// Компонент отвечает за голосование (опрос)

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render () {
    return (
      <div className={Classes.Quiz}>
          <div className={Classes.QuizWrapper}>
            <h1 className={Classes.Quiz__title}>Ответьте на все вопросы</h1>

            {
              this.props.loading || !this.props.quiz
                ? <Loader />
                :  this.props.isFinished 
                    ? <FinishedQuiz 
                        results={this.props.results} 
                        quiz={this.props.quiz}
                        onRetry={this.props.retryQuiz}
                      />
                    : <ActiveQuiz 
                        // TODO: Переписать onAnswerClick на Context API
                        onAnswerClick={this.props.quizAnswerClick}
                        
                        question={this.props.quiz[this.props.activeQuestion].question}
                        answers={this.props.quiz[this.props.activeQuestion].answers}
                        quizLength={this.props.quiz.length}
                        answerNumber={this.props.activeQuestion + 1}
                        state={this.props.answerState}
                      />
            }
            
          </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
