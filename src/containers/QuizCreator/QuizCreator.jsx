import React, {Component} from 'react';
import {createControl, validate, validateForm} from '../../form/formFramework.js';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary.jsx';
import Button from '../../ui/Button/Button.jsx';
import Input from '../../ui/Input/Input.jsx';
import Select from '../../ui/Select/Select.jsx';
import Classes from './QuizCreator.module.css';

function createoptionControl(num) {
  return createControl({
    label: `Вариант ${num}`,
    errorMesage: 'Значение не может быть пустым',
    id: num,
  }, {required: true});
}

function createFormControl() {
  return {
    quastion: createControl({
      label: 'Введите вопрос',
      errorMesage: 'Вопрос не может быть пустым',
    }, {required: true}),
    optionOne: createoptionControl(1),
    optionTwo: createoptionControl(2),
    optionThree: createoptionControl(3),
    optionFour: createoptionControl(4),
  };
}

//Страница позволяет генирировать новые тесты
export default class QuizCreator extends Component {

  state = {
    // Созданый тест может состоять из нескольких вопросов
    // Все вопросы мы будем хранить в поле quiz
    // При создании нового вопроса, он будет попадать в state -> quiz
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControl(),
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={controlName + index}>
          <Input
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shuldValidate={!!control.validation}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </Auxiliary>
      )
    });
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  submitHandler = e => {
    e.preventDefault();
  }

  addQuastionHandler = e => {
    e.preventDefault();
  }
  
  createQuizHandler = e => {
    e.preventDefault();
  }

  selectChangeHandler = e => {
    this.setState({
      rightAnswerId: +e.target.value,
    });
  }

  render() {

    const select = (
      <Select 
        label="Выбирите правельный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
      />
    );

    return (
      <div className={Classes.QuizCreator}>
        <div className={Classes.QuizCreator__wrapper}>
          <h1 className={Classes.QuizCreator__title}>Создание теста</h1>
          <form className={Classes.QuizCreator__form} onChange={this.submitHandler}>

            {this.renderControls()}
            {select}

            <Button disabled={!this.state.isFormValid} type="primary" onCLick={this.addQuastionHandler}>Добавить вопрос</Button>
            <Button disabled={this.state.quiz.length  === 0} type="success" onCLick={this.createQuizHandler}>Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}