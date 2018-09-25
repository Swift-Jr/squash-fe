import React from 'react';

import {leagueService} from '../../services';
import {authService} from '../../services';

import {LeagueTable} from '../../components/LeagueTable';
import {GameHistory} from '../../components/GameHistory';

import {PlayMatch} from '../PlayMatch';

import styles from './styles.module.css';

export class ViewLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueId: this.props.match.params.id
    }

    this.getLeagueName = this.getLeagueName.bind(this);
  }

  getLeague() {
    return leagueService.getLeagueById(this.state.leagueId);
  }

  getLeagueName() {
    const league = this.getLeague();
    return league.name;
  }

  getLeagueGames() {
    const league = this.getLeague();
    return leagueService.getLeagueGames(league.id);
  }

  render() {
    return (<div className="fixedPaddingBottom">
      <h1>{this.getLeagueName()}</h1>
      <LeagueTable league={this.getLeague()} header={true}></LeagueTable>
      <GameHistory games={this.getLeagueGames()}></GameHistory>
      <div className="fixedBottom play-match">
        <PlayMatch></PlayMatch>
      </div>
    </div>)
  }
}

export default ViewLeague;
