import React from 'react';
import {Link} from 'react-router-dom';

import {iconSettings, logoSmall} from './images';

import {userService} from '../../services';

import styles from './styles.module.css';

export class AppHeader extends React.Component {
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
    this.setState({visible: false});
    this.toggleMenu();
  }

  render = () => {
    const {clubname} = this.props;
    const username = userService
      .getCurrentUser()
      .getFirstname();
    const menuState = this.state.visible
      ? styles.open
      : styles.hide;

    return <header className="row">
      <div id="topBar">
        <p className="name col-xs-10">{username}<span>{clubname}</span>
        </p>
        <p className="settings col-xs-2"><img src={iconSettings} alt="Settings Menu" onClick={this.toggleMenu}/></p>
      </div>
      <ul className={`${styles.settingMenu} ${menuState}`}>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Find a League</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Find a Club</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Create a League</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Create a Club</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Invite</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Profile</Link>
        </li>
        <li>
          <Link to="/login/out" onClick={this.handleLinkClick}>Sign Out</Link>
        </li>
      </ul>
      <img className="app-logo" src={logoSmall} alt="Application Logo"/>
    </header>
  }
}

export default AppHeader;
