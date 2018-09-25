import React from 'react';
import CountUp from 'react-countup';

import {leagueService} from '../../services';
import {authService} from '../../services';

import {InputSelect} from '../../components/Inputs';
import {GameHistory} from '../../components/GameHistory';

import styles from './styles.module.css';

export const Scoreboard = (props) => {
  const {forName, forPoints, againstName, againstPoints} = props;
  const pointTotal = parseInt(forPoints) + parseInt(againstPoints);
  const forPercent = Math.floor((100 / pointTotal) * forPoints);
  const againstPercent = 100 - forPercent;

  return <div>
    <div className={styles.bar}>
      <div className={styles.for} style={{
          width: forPercent + '%'
        }}></div>
      <div className={styles.against} style={{
          width: againstPercent + '%'
        }}></div>
    </div>
    <div className={styles.detail}>
      <div className={styles.for}>
        <div className={styles.number}>
          <CountUp end={forPoints} duration={2}></CountUp>
        </div>
        <div className={styles.text}>{forName}</div>
      </div>
      <div className={styles.against}>
        <div className={styles.text}>{againstName}</div>
        <div className={styles.number}>
          <CountUp end={againstPoints} duration={2}></CountUp>
        </div>
      </div>
    </div>
  </div>
}

export class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: parseInt(this.props.match.params.id) || authService.getUserId()
    }

    this.getLeagues = this.getLeagues.bind(this);
    this.getUsersGames = this.getUsersGames.bind(this);
    this.selectMyOrName = this.selectMyOrName.bind(this);
    this.leagueChange = this.leagueChange.bind(this);

    setTimeout(() => this.getUsersScores(), 200);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.userid !== parseInt(nextProps.match.params.id)) {
      this.setState({
        userid: parseInt(nextProps.match.params.id) || authService.getUserId()
      });

    }
  }

  getLeagues() {
    const leagues = leagueService.getUsersLeagues(this.state.userid);
    const leagueList = leagues.map((league) => {
      return {value: league.id, option: league.name};
    });

    return [
      {
        value: null,
        option: 'All Leagues'
      }
    ].concat(leagueList);
  }

  getUsersScores() {
    const leagues = leagueService.getUsersLeagues(this.state.userid);
    const filteredLeagues = this.state.leagueId
      ? leagues.filter((league) => league.id === this.state.leagueId)
      : leagues;

    var gamesPlayed = 0,
      gamesWon = 0,
      gamesLost = 0,
      pointsWon = 0,
      pointsLost = 0;

    filteredLeagues.forEach((league) => {
      const result = league.results.filter((result) => parseInt(result.player.id) === parseInt(this.state.userid))[0];

      if (result) {
        gamesPlayed += result.played;
        gamesWon += result.won;
        gamesLost += result.played - result.won;
        pointsWon += result.pointsWon;
        pointsLost += result.pointsLost;
      }
    });

    const scores = {
      gamesPlayed: gamesPlayed,
      gamesWon: gamesWon,
      gamesLost: gamesLost,
      pointsWon: pointsWon,
      pointsLost: pointsLost
    };

    return scores;
  }

  getUsersGames() {
    return leagueService.getUsersGames(this.state.userid);
  }

  selectMyOrName() {
    return authService.getUserId() == this.state.userid
      ? 'My'
      : authService.getUserById(this.state.userid).firstname + "'s";
  }

  leagueChange(e) {
    this.setState({
      leagueId: parseInt(e.target.value)
    });
  }

  render() {
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
      <GameHistory games={this.getUsersGames()} showLeague={true}></GameHistory>
    </div>)
  }
}

export default Scorecard;
