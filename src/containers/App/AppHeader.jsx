import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";
import {connect} from 'react-redux';

import {iconSettings, logoSmall} from './images';

import {userService, authService, inviteService} from '../../services';

import styles from './styles.module.css';

export class AppHeaderComponent extends React.Component {
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

  handleSignOut = (e) => {
    this.handleLinkClick(e);
    setTimeout(() => this.props.dispatch(authService.logout()), 1000);
  }

  handleInvite = (e) => {
    this.handleLinkClick(e);
    e.preventDefault();
    this
      .props
      .dispatch(inviteService.actions.open());
    return false;
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
        <p className="name col-xs-10">
          <Link to="/profile">{username}</Link>
          <span>
            <Link to="/club">{clubname}</Link>
          </span>
        </p>
        <p className="settings col-xs-2"><img src={iconSettings} alt="Settings Menu" onClick={this.toggleMenu}/></p>
      </div>
      <ul className={`${styles.settingMenu} ${menuState}`}>
        <li>
          <Link to="/" onClick={this.handleLinkClick}>Create a League</Link>
        </li>
        <li>
          <Link to="/" onClick={this.handleInvite}>Invite</Link>
        </li>
        <li>
          <Link to="/profile" onClick={this.handleLinkClick}>Profile</Link>
        </li>
        <li>
          <Link to="/login/out" onClick={this.handleSignOut}>Sign Out</Link>
        </li>
      </ul>
      <img className="app-logo" src={logoSmall} alt="Application Logo"/>
    </header>
  }
}

const connectedAppHeader = withRouter(connect()(AppHeaderComponent));
export {
  connectedAppHeader as AppHeader
};
