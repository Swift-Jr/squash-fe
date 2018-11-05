import React from 'react';
import {connect} from 'react-redux';

import CountUp from 'react-countup';

import {leagueService, gameService} from '../../services';
import {userService} from '../../services';

import {InputSelect} from '../../components/Inputs';
import {GameHistory} from '../../components/GameHistory';
import {Scoreboard} from '../../components/Scoreboard';
import {Loading} from '../App/Loading';

import styles from './styles.module.css';

export class ScorecardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: parseInt(this.props.match.params.id, 10) || userService
        .getCurrentUser()
        .getUserId()
    }

    setTimeout(() => this.getUsersScores(), 200);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.userid !== parseInt(nextProps.match.params.id, 10)) {
      this.setState({
        userid: parseInt(nextProps.match.params.id, 10) || userService
          .getCurrentUser()
          .getUserId()
      });

    }
  }

  getLeagues = () => {
    const leagues = leagueService.getUsersLeagues();
    const leagueList = leagues
      .filter(league => league.getResults().filter(result => result.getPlayer().getUserId() === this.state.userid).length > 0)
      .map((league) => {
        return {value: league.getId(), option: league.getName()};
      });

    return [
      {
        value: null,
        option: 'All Leagues'
      }
    ].concat(leagueList);
  }

  getUsersScores = () => {
    const leagues = leagueService.getUsersLeagues();
    const filteredLeagues = this.state.leagueId
      ? leagues.filter((league) => league.getId() === this.state.leagueId)
      : leagues;

    const scores = leagueService.getUserScorecard(this.state.userid, filteredLeagues);

    return scores;
  }

  getUsersGames = () => {
    let {userid, leagueId} = this.state;

    let queryLeagueId = leagueId || '*';

    return gameService
      .getLeagueGames(queryLeagueId)
      .filter(match => match.getPlayer1().getUserId() === userid || match.getPlayer2().getUserId() === userid);
  }

  selectMyOrName = () => {
    return userService
      .getCurrentUser()
      .getUserId() === this
      .state
      .userid
        ? 'My'
        : userService
          .getUserById(this.state.userid)
          .getFirstname() + "'s";
  }

  leagueChange = (e) => {
    this.setState({
      leagueId: parseInt(e.target.value, 10)
    });
  }

  isLoading = () => {
    return this
      .getUsersGames()
      .length === 0
  }

  render = () => {
    const {gamesPlayed, gamesWon, gamesLost, pointsWon, pointsLost} = this.getUsersScores();

    return <div>
      <h1>{this.selectMyOrName()}&nbsp;Scorecard</h1>
      {
        this.isLoading()
          ? <Loading></Loading>
          : <div>
              <h4 className="light">League</h4>
              <span className={styles.displayPicker}><InputSelect placeholder="All Leagues" options={this.getLeagues()} onChange={this.leagueChange}/></span>
              <p className={styles.gamesPlayed}>
                <CountUp end={gamesPlayed || 0} duration={2}></CountUp>
              </p>
              <h3 className="light">Games Played</h3>
              <Scoreboard forName="won" againstName="lost" forPoints={gamesWon || 0} againstPoints={gamesLost || 0}></Scoreboard>
              <Scoreboard forName="for" againstName="against" forPoints={pointsWon || 0} againstPoints={pointsLost || 0}></Scoreboard>
              <GameHistory games={this.getUsersGames()} showLeague={true} userContext={this.state.userid}></GameHistory>
            </div>
      }</div>;
  }
}

function mapStateToProps(state) {
  const {league, games} = state;
  return {league, games};
}

const connectedScorecardComponent = connect(mapStateToProps)(ScorecardComponent);
export {
  connectedScorecardComponent as Scorecard
};
