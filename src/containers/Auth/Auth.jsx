import React, {Component} from 'react';
import axios from 'axios';
import data from '../../axios/database';
import Button from '../../ui/Button/Button.jsx';
import Input from '../../ui/Input/Input.jsx';
import Classes from './Auth.module.css';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный e-mail',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    },
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    } 

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  submitHandler = e => {
    e.preventDefault();
  }
  
  loginHendler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(data.signInWithPassword, authData);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  registerHendler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(data.signUp, authData);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) =>{
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  }

  inputsRender = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shuldValidate={!!control.validation}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    });
  }

  render() {

    return (
      <div className={Classes.Auth}>
        <div className={Classes.Auth__wrapper}>
          <h1 className={Classes.Auth__title}>Авторизация</h1>

          <form className={Classes.Auth_form} onSubmit={this.submitHandler}>
            { this.inputsRender() }
            <Button type="success" disabled={!this.state.isFormValid} onClick={this.loginHendler}> Войти </Button>
            <Button type="primary" disabled={!this.state.isFormValid} onClick={this.registerHendler}> Регистрация </Button>
          </form>

        </div>
      </div>
    );
  }
}
