import React, {Component} from 'react';
import Backdrop from '../../../ui/Backdrop/Backdrop.jsx';
import Classes from './Drawer.module.css';

const links = [1, 2, 3];

export default class Drawer extends Component {
  renderLinks() {
    return links.map((item, index) => {
      return (
        <li key={index} className={Classes.Drawer__listItem}>
          <a className={Classes.Drawer__listLink}>
            Link {item}
          </a>
        </li>
      );
    })
  }
  render () {

    const cls = [Classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(Classes.close)
    }

    return(
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul className={Classes.Drawer__list}>
            {this.renderLinks()}
          </ul>
        </nav>
      </>
    );
  }
}