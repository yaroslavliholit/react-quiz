import React, {Component} from 'react';
import {connect} from 'react-redux';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle.jsx';
import Drawer from '../../components/Navigation/Drawer/Drawer.jsx';
import Classes from './Layout.module.css';

// Корневой компонент всего приложения

class Layout extends Component {

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
          <Drawer 
            isOpen={this.state.menu} 
            onClose={this.menuCloseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
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

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(Layout);
