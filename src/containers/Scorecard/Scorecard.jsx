import React from 'react';
import CountUp from 'react-countup';

import {leagueService, gameService} from '../../services';
import {authService, userService} from '../../services';

import {InputSelect} from '../../components/Inputs';
import {GameHistory} from '../../components/GameHistory';
import {Scoreboard} from '../../components/Scoreboard';

import styles from './styles.module.css';

export class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: parseInt(this.props.match.params.id, 10) || authService.getUserId()
    }

    setTimeout(() => this.getUsersScores(), 200);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.userid !== parseInt(nextProps.match.params.id, 10)) {
      this.setState({
        userid: parseInt(nextProps.match.params.id, 10) || authService.getUserId()
      });

    }
  }

  getLeagues = () => {
    const leagues = leagueService.getUsersLeagues(this.state.userid);
    const leagueList = leagues.map((league) => {
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
    const leagues = leagueService.getUsersLeagues(this.state.userid);
    const filteredLeagues = this.state.leagueId
      ? leagues.filter((league) => league.getId() === this.state.leagueId)
      : leagues;

    const scores = leagueService.getUserScorecard(this.state.userid, filteredLeagues);

    return scores;
  }

  getUsersGames = () => {
    return gameService.getUsersGames(this.state.userid);
  }

  selectMyOrName = () => {
    return authService.getUserId() === this.state.userid
      ? 'My'
      : userService.getUserById(this.state.userid).getFirstname() + "'s";
  }

  leagueChange = (e) => {
    this.setState({
      leagueId: parseInt(e.target.value, 10)
    });
  }

  render = () => {
    const {gamesPlayed, gamesWon, gamesLost, pointsWon, pointsLost} = this.getUsersScores();

    return (<div>
      <h1>{this.selectMyOrName()}&nbsp;Scorecard</h1>
      <h4 className="light">League</h4>
      <span className={styles.displayPicker}><InputSelect placeholder="All Leagues" options={this.getLeagues()} onChange={this.leagueChange}/></span>
      <p className={styles.gamesPlayed}>
        <CountUp end={gamesPlayed || 0} duration={2}></CountUp>
      </p>
      <h3 className="light">Games Played</h3>
      <Scoreboard forName="won" againstName="lost" forPoints={gamesWon || 0} againstPoints={gamesLost || 0}></Scoreboard>
      <Scoreboard forName="for" againstName="against" forPoints={pointsWon || 0} againstPoints={pointsLost || 0}></Scoreboard>
      <GameHistory games={this.getUsersGames()} showLeague={true} userContext={this.state.userid}></GameHistory>
    </div>)
  }
}

export default Scorecard;
