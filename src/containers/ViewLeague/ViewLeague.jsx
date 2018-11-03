import React from 'react';
import {connect} from 'react-redux';

import {leagueService} from '../../services';
import {gameService} from '../../services';

import {LeagueTable} from '../../components/LeagueTable';
import {GameHistory} from '../../components/GameHistory';

import {PlayMatch} from '../PlayMatch';

//import styles from './styles.module.css';

export class ViewLeagueComponent extends React.Component {
  getLeagueId = () => {
    return parseInt(this.props.match.params.id);
  }

  getLeague = () => {
    return leagueService.getLeagueById(this.getLeagueId());
  }

  getLeagueName = () => {
    let league = this.getLeague();
    if (league) {
      return this
        .getLeague()
        .getName();
    }
    return null;
  }

  getLeagueGames = () => {
    let league = this.getLeague();
    if (league) {
      return gameService.getLeagueGames(league.getId());
    }
    return [];
  }

  render = () => {
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

function mapStateToProps(state) {
  const {league, games} = state;
  return {league, games};
}

const connectedViewLeagueComponent = connect(mapStateToProps)(ViewLeagueComponent);
export {
  connectedViewLeagueComponent as ViewLeague
};
