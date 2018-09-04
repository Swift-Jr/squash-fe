import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PropTypes from 'prop-types';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';
import DefaultWelcome from './DefaultWelcome';

import {Login} from '../Login';
import {MyLeagues} from '../MyLeagues';
import {HeadToHead} from '../HeadToHead';
import {Scorecard} from '../Scorecard';

//import {Authenticator} from './services/Authenticator';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsVisible: false,
      showJoinClubOrLeague: false,
      clubOrLeague: 0
    }

    this.menuToggled = this.menuToggled.bind(this);
    this.getMenuState = this.getMenuState.bind(this);
    this.handleJoinClub = this.handleJoinClub.bind(this);
    this.handleJoinLeague = this.handleJoinLeague.bind(this);
    this.handleCloseJoinModal = this.handleCloseJoinModal.bind(this);
  }

  getUsername() {
    return "Rob";
  }

  getClubname() {
    return "420 Club";
  }

  isLoggedIn() {
    return true;
  }

  isMemberOfSomething() {
    return false;
  }

  menuToggled(state) {
    this.setState({menuIsVisible: state});
  }

  getMenuState() {
    return this.state.menuIsVisible
      ? 'menuIsVisible'
      : 'menuIsNotVisible';
  }

  handleJoinClub() {
    this.setState({showJoinClubOrLeague: true, clubOrLeague: 1});
  }

  handleJoinLeague() {
    this.setState({showJoinClubOrLeague: true, clubOrLeague: 2});
  }

  handleCloseJoinModal() {
    this.setState({showJoinClubOrLeague: false});
  }

  render() {
    return (<div className={`container ${this.getMenuState()}`}>
      {!this.isLoggedIn() || <AppHeader username={this.getUsername()} clubname={this.getClubname()}></AppHeader>}

      {!this.isLoggedIn() || <AppMenu visible={false} onToggle={this.menuToggled}></AppMenu>}
      <div className="fader">
        {
          !this.isMemberOfSomething() && this.isLoggedIn()
            ? <DefaultWelcome onJoinClub={this.handleJoinClub} onJoinLeague={this.handleJoinLeague}></DefaultWelcome>
            : <Switch>
                <Route path="/login " component={Login}/>
                <Route exact={true} path="/" component={MyLeagues}/>
                <Route path="/myleagues" component={MyLeagues}/>
                <Route path="/headtohead" component={HeadToHead}/>
                <Route path="/scorecard" component={Scorecard}/>
              </Switch>
        }
      </div>
      {
        !this.isMemberOfSomething() || <div className="play-match">
            <button className="large">Play a Match</button>
          </div>
      }
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
