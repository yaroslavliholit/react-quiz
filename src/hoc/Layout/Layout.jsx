import React, {Component} from 'react';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle.jsx';
import Drawer from '../../components/Navigation/Drawer/Drawer.jsx';
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

  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  }

  render () {
    return (
      <div className={Classes.Layout}>
        <main className={Classes.Layout__main}>
          <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
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