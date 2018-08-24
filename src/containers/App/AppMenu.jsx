import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {iconMenu} from './images';

export class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    }
  }

  toggleMenu() {
    const {onToggle} = this.props;
    this.setState({
      visible: !this.state.visible
    }, () => onToggle && onToggle(this.state.visible));
  }

  render() {
    const {visible} = this.state;

    return (<nav>
      <ul className={visible
          ? 'showMenu'
          : 'hideMenu'}>
        <li>
          <Link to="/myleagues">My Leagues</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
        <li>
          <Link to="/headtohead">Head to Head</Link>
        </li>
        <li>
          <Link to="/scorecard">Scorecard</Link>
        </li>
      </ul>
      <img src={iconMenu} onClick={() => this.toggleMenu()} alt="Menu Toggle"/>
    </nav>)
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
