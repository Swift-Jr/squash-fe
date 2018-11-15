import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TouchEvent from '../../system/TouchEvent';

import {PlayMatch} from '../PlayMatch';

import {iconMenu} from './images';

export class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    }
  }

  toggleMenu = () => {
    const {onToggle} = this.props;
    this.setState({
      visible: !this.state.visible
    }, () => onToggle && onToggle(this.state.visible));
  }

  handleLinkClick = (e) => {
    //this.setState({visible: false});
    //this.toggleMenu();
  }

  render() {
    const {visible} = this.state;

    return (<TouchEvent onSwipeDown={this.toggleMenu} onSwipeUp={this.toggleMenu} onTap={this.toggleMenu}>
      <nav>
        <ul className={visible
            ? 'showMenu'
            : 'hideMenu'}>
          <li>
            <Link to="/myleagues" onClick={this.handleLinkClick}>My Leagues</Link>
          </li>
          <li>
            <Link to="/results" onClick={this.handleLinkClick}>Results</Link>
          </li>
          <li>
            <Link to="/headtohead" onClick={this.handleLinkClick}>Head to Head</Link>
          </li>
          <li>
            <Link to="/scorecard" onClick={this.handleLinkClick}>Scorecard</Link>
          </li>
        </ul>
        <img src={iconMenu} alt="Menu Toggle"/> {
          visible
            ? <div className={`fixedBottom play-match reverseVisible`}>
                <PlayMatch onClose={() => this.toggleMenu()}></PlayMatch>
              </div>
            : null
        }
      </nav>
    </TouchEvent>)
  }
}

AppMenu.propTypes = {
  visible: PropTypes.bool,

  onToggle: PropTypes.func
}

AppMenu.propDefaults = {
  visible: false,
  onToggle: (state) => {}
}

export default AppMenu;
