import React, {Component} from 'react';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle.jsx';
import Classes from './Layout.module.css';

// Корневой компонент всего приложения

export default class Layout extends Component {

  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  }

  render () {
    return (
      <div className={Classes.Layout}>
        <main className={Classes.Layout__main}>
          <MenuToggle 
            isOpen={this.state.menu}
            onToggle={this.toggleMenuHandler}
          />
          {this.props.children}
        </main>
      </div>
    );
  }
}