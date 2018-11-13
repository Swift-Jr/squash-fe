import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";

import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {ProtectedRoute} from '../../system'

import {authService} from '../../services';
import {alerts, user, clubService} from '../../services';

import {AppHeader} from './AppHeader';
import AppMenu from './AppMenu';
import {DefaultWelcome} from './DefaultWelcome';
import AlertDisplay from './AlertDisplay';
import Loading from './Loading';
import InstallPrompt from './InstallPrompt';

import {Account} from '../Account';
import {Login} from '../Login';
import {MyLeagues} from '../MyLeagues';
import {Club} from '../Club';
import {HeadToHead} from '../HeadToHead';
import {Scorecard} from '../Scorecard';
import {Profile} from '../Profile';
import {Privacy} from '../Privacy';
import {NotFound} from '../NotFound';
import {ViewLeague} from '../ViewLeague';
import {MyLeaguesClubs} from '../MyLeaguesClubs';
import {Results} from '../Results';

import {InvitePlayers} from '../InvitePlayers';
import {CreateLeague} from '../CreateLeague';

//import {Authenticator} from './services/Authenticator';

export class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    let appInstalled = true;

    if (!window.matchMedia('(display-mode: standalone)').matches && process.env.NODE_ENV === "production") {
      appInstalled = false;
    }

    this.state = {
      menuIsVisible: false,
      settingsMenuIsVisible: false,
      authState: null,
      appInstalled
    }

    authService.registerAuthChange(this.handleAuthChange);

    if (!props.user.profile && this.isLoggedIn()) {
      props.dispatch(user.service.getUserProfile());
    }

    window.addEventListener('beforeinstallprompt', this.homescreenPreflight);

  }

  homescreenPreflight = (e) => {
    e.preventDefault();
    let saveToHomescreenPrompt = e;
    this.setState({appInstalled: false, saveToHomescreenPrompt});
  }

  componentDidUpdate = () => {
    this
      .props
      .dispatch(alerts.actions.clear());
  }

  getClubname() {
    if (clubService.getUserClubs().length > 0) {
      return clubService
        .getUserClubs()[0]
        .getName();
    } else {
      return null;
    }
  }

  isLoggedIn = () => {
    return authService.check();
  }

  isMemberOfSomething = () => {
    return user
      .service
      .userHasClubs();
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
    this.setState({settingsMenuIsVisible: state});
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

  onAppInstall = () => {
    this.setState({appInstalled: -1});
  }

  render() {
    const {alerts} = this.props;

    if (this.state.appInstalled !== true && this.isLoggedIn()) {
      return (<InstallPrompt prompt={this.state.saveToHomescreenPrompt} appInstalled={this.state.appInstalled} onInstall={this.onAppInstall}></InstallPrompt>);
    }

    if (!this.props.user.profile && this.isLoggedIn()) {
      return (<Loading></Loading>);
    }

    return (<div className={`container ${this.getMenuState()} ${this.getSettingsMenuState()}`}>
      <AlertDisplay alerts={alerts}></AlertDisplay>
      {
        this.isLoggedIn()
          ? <div className="stickyHeader">
              <AppHeader visible={this.state.settingsMenuIsVisible} onToggle={this.settingsMenuToggled} clubname={this.getClubname()}></AppHeader>
              {
                this.isMemberOfSomething()
                  ? <AppMenu visible={this.state.menuIsVisible} onToggle={this.menuToggled}></AppMenu>
                  : null
              }
            </div>
          : null
      }

      <div className="fader">
        {
          this.isLoggedIn() && !this.isMemberOfSomething()
            ? <DefaultWelcome club={this.props.club}></DefaultWelcome>
            : <Switch>
                <Route path="/login/:func?" component={Login}/>
                <Route path="/account/:action?/:actionId?" component={Account}/>
                <Route path="/privacy/" component={Privacy}/>
                <ProtectedRoute exact={true} path="/" component={MyLeagues}/>
                <ProtectedRoute path="/myleagues" component={MyLeagues}/>
                <ProtectedRoute path="/club" component={Club}/>
                <ProtectedRoute path="/leagueclublist" component={MyLeaguesClubs}/>
                <ProtectedRoute path="/league/:id" component={ViewLeague}/>
                <ProtectedRoute path="/headtohead" component={HeadToHead}/>
                <ProtectedRoute path="/results" component={Results}/>
                <ProtectedRoute path="/profile" component={Profile}/>
                <ProtectedRoute path="/scorecard/:id?" component={Scorecard}/>
                <ProtectedRoute path="/" component={NotFound}/>
              </Switch>
        }
      </div>

      <InvitePlayers noButton={true}></InvitePlayers>
      <CreateLeague noButton={true}></CreateLeague>

    </div>)
  }
}

AppWrapper.propTypes = {
  menuIsVisible: PropTypes.bool,

  getUsername: PropTypes.func,
  getClubname: PropTypes.func,
  menuToggled: PropTypes.func,
  getMenuState: PropTypes.func
}

AppWrapper.defaultProps = {
  menuIsVisible: false,
  showJoinClubOrLeague: 0
}

function mapStateToProps(state) {
  const {alerts, user} = state;
  return {alerts, user};
}

const connectedApp = withRouter(connect(mapStateToProps)(AppWrapper));
export {
  connectedApp as App
};
