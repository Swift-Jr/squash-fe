import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PropTypes from 'prop-types';
import {ProtectedRoute} from '../../system'

import {authService} from '../../services';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import DefaultWelcome from './DefaultWelcome';

import {Account} from '../Account';
import {Login} from '../Login';
import {MyLeagues} from '../MyLeagues';
import {HeadToHead} from '../HeadToHead';
import {Scorecard} from '../Scorecard';
import {NotFound} from '../NotFound';
import {ViewLeague} from '../ViewLeague';
import {MyLeaguesClubs} from '../MyLeaguesClubs';

//import {Authenticator} from './services/Authenticator';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
      settingsMenuIsVisible: false,
      authState: null
    }

    authService.registerAuthChange(this.handleAuthChange);
  }

  getClubname() {
    return "Jam Club";
  }

  isLoggedIn() {
    return authService.check();
  }

  isMemberOfSomething() {
    return authService.getClubs().length > 0 || authService.getLeagues().length > 0;
  }

  menuToggled = (state) => {
    if (!authService.check()) {
      state = false;
    }
    this.setState({menuIsVisible: state});
  }

  settingsMenuToggled = (state) => {
    if (!authService.check()) {
      state = false;
    }
    this.setState({menuIsVisible: state, settingsMenuIsVisible: state});
  }

  getMenuState = () => {
    return this.state.menuIsVisible
      ? 'menuIsVisible'
      : 'menuIsNotVisible';
  }

  getSettingsMenuState = () => {
    return this.state.settingsMenuIsVisible
      ? 'settingsMenuIsVisible'
      : 'settingsMenuIsNotVisible';
  }

  handleAuthChange = (state) => {
    //this.menuToggled(false);
    this.setState({
      authState: state/*, menuIsVisible: true*/
    });
  }

  getContentPadding = () => {
    var style = {};
    if (this.state.menuIsVisible) {
      style = {
        paddingTop: '211px'
      }
    }

    if (this.state.settingsMenuIsVisible) {
      style = {
        paddingTop: '307px'
      }
    }

    return style;
  }

  render() {
    return (<div className={`container ${this.getMenuState()} ${this.getSettingsMenuState()}`}>
      {
        this.isLoggedIn()
          ? <div className="fixedTop">
              <AppHeader visible={this.state.settingsMenuIsVisible} onToggle={this.settingsMenuToggled} clubname={this.getClubname()}></AppHeader>
              <AppMenu visible={this.state.menuIsVisible} onToggle={this.menuToggled}></AppMenu>
            </div>
          : null
      }

      <div className="fader" style={this.getContentPadding()}>
        {
          this.isLoggedIn() && !this.isMemberOfSomething()
            ? <DefaultWelcome></DefaultWelcome>
            : <Switch>
                <Route path="/login/:func?" component={Login}/>
                <Route path="/account/:action?/:inviteId?" component={Account}/>
                <ProtectedRoute exact={true} path="/" component={MyLeagues}/>
                <ProtectedRoute path="/myleagues" component={MyLeagues}/>
                <ProtectedRoute path="/leagueclublist" component={MyLeaguesClubs}/>
                <ProtectedRoute path="/league/:id" component={ViewLeague}/>
                <ProtectedRoute path="/headtohead" component={HeadToHead}/>
                <ProtectedRoute path="/scorecard/:id?" component={Scorecard}/>
                <ProtectedRoute path="/" component={NotFound}/>
              </Switch>
        }
      </div>

    </div>)
  }
}

App.propTypes = {
  menuIsVisible: PropTypes.bool,

  getUsername: PropTypes.func,
  getClubname: PropTypes.func,
  menuToggled: PropTypes.func,
  getMenuState: PropTypes.func
}

App.defaultProps = {
  menuIsVisible: false,
  showJoinClubOrLeague: 0
}

export default App;
