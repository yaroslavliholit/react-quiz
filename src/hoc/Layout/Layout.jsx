import React, {Component} from 'react';
import Classes from './Layout.module.css';

// Корневой компонент всего приложения

export default class Layout extends Component {
  render () {
    return (
      <div className={Classes.Layout}>
        <main className={Classes.Layout__main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}