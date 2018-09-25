import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PropTypes from 'prop-types';
import {ProtectedRoute} from '../../system'

import {authService} from '../../services';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import DefaultWelcome from './DefaultWelcome';

import {Login} from '../Login';
import {MyLeagues} from '../MyLeagues';
import {HeadToHead} from '../HeadToHead';
import {Scorecard} from '../Scorecard';
import {PlayMatch} from '../PlayMatch';
import {NotFound} from '../NotFound';
import {ViewLeague} from '../ViewLeague';

//import {Authenticator} from './services/Authenticator';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
      authState: null
    }

    this.menuToggled = this.menuToggled.bind(this);
    this.getMenuState = this.getMenuState.bind(this);
    this.handleAuthChange = this.handleAuthChange.bind(this);

    authService.registerAuthChange(this.handleAuthChange);
  }

  getUsername() {
    return "Rob";
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

  menuToggled(state) {
    if (!authService.check()) {
      state = false;
    }
    this.setState({menuIsVisible: state});
  }

  getMenuState() {
    return this.state.menuIsVisible
      ? 'menuIsVisible'
      : 'menuIsNotVisible';
  }

  handleAuthChange(state) {
    //this.menuToggled(false);
    this.setState({
      authState: state/*, menuIsVisible: true*/
    });
  }

  render() {
    return (<div className={`container ${this.getMenuState()}`}>
      {
        this.isLoggedIn()
          ? <div className="fixedTop">
              <AppHeader username={this.getUsername()} clubname={this.getClubname()}></AppHeader>
              <AppMenu visible={this.state.menuIsVisible} onToggle={this.menuToggled}></AppMenu>
            </div>
          : null
      }

      <div className="fader">
        {
          this.isLoggedIn() && !this.isMemberOfSomething()
            ? <DefaultWelcome></DefaultWelcome>
            : <Switch>
                <ProtectedRoute exact={true} path="/" component={MyLeagues}/>
                <ProtectedRoute path="/myleagues" component={MyLeagues}/>
                <ProtectedRoute path="/league/:id" component={ViewLeague}/>
                <ProtectedRoute path="/headtohead" component={HeadToHead}/>
                <ProtectedRoute path="/scorecard/:id?" component={Scorecard}/>
                <ProtectedRoute path="/" component={NotFound}/>
                <Route path="/login" component={Login}/>
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
