import React from 'react';
import CountUp from 'react-countup';

import {userService, leagueService} from '../../services';

import {InputSelect} from '../../components/Inputs';
import {GameHistory} from '../../components/GameHistory';
import {Scoreboard} from '../../components/Scoreboard';

import styles from './styles.module.css';

export class HeadToHead extends React.Component {
  constructor(props) {
    super(props);

    var p1Id = userService.getCurrentUser().getUserId();
    var p2Id = userService.getCurrentUser().getGames()[0].getOtherUser(p1Id).getUserId();

    this.state = {
      player1Id: p1Id,
      player2Id: p2Id,
      leagueId: null
    }

  }

  getLeagues() {
    const user = userService.getCurrentUser();

    const leagues = user.getLeagues();
    const leagueList = leagues.map((league) => {
      return {value: league.getId(), option: league.getShortName()};
    });

    return [
      {
        value: null,
        option: 'All'
      }
    ].concat(leagueList);
  }

  leagueChange = (e) => {
    this.setState({
      leagueId: parseInt(e.target.value, 10)
    });
  }

  player1Change = (e) => {
    this.setState({
      player1Id: parseInt(e.target.value, 10)
    });
  }

  player2Change = (e) => {
    this.setState({
      player2Id: parseInt(e.target.value, 10)
    });
  }

  getPlayedGames = () => {
    const {player1Id, player2Id, leagueId} = this.state;
    const games = userService.getUserById(player1Id).getGames(leagueId, player2Id);

    return games;
  }

  getPlayers = (key) => {
    const leagues = (this.state.leagueId > 0)
      ? [leagueService.getLeagueById(this.state.leagueId)]
      : userService.getCurrentUser().getLeagues();

    var players = [];
    leagues.forEach((league) => {
      league.getResults().forEach((result) => {
        players = [
          ...players,
          ...[result.getPlayer()]
        ];
      });
    });

    var foundPlayerIds = [];
    const options = players.filter((player) => {
      if (foundPlayerIds[player.getUserId()]) {
        return null;
      } else {
        foundPlayerIds[player.getUserId()] = player;
        return true;
      }
    }).map((player) => {
      return {value: player.getUserId(), option: player.getFirstname()}
    });

    return options;
  }

  getUsersScores = () => {
    const {player1Id} = this.state;

    const games = this.getPlayedGames();
    var scores = {
      gamesPlayed: 0,
      p1gamesWon: 0,
      p2gamesWon: 0,
      p1pointsLost: 0,
      p2pointsLost: 0,
      p1pointsWon: 0,
      p2pointsWon: 0
    };

    games.forEach((game) => {
      scores.gamesPlayed++;
      if (game.getPlayer1().getUserId() === player1Id) {
        game.getPlayer1Score() > game.getPlayer2Score()
          ? scores.p1gamesWon++
          : scores.p2gamesWon++;
        scores.p1pointsWon += game.getPlayer1Score();
        scores.p2pointsWon += game.getPlayer2Score();
        scores.p1pointsLost += game.getPlayer2Score();
        scores.p2pointsLost += game.getPlayer1Score();
      } else {
        game.getPlayer1Score() > game.getPlayer2Score()
          ? scores.p2gamesWon++
          : scores.p1gamesWon++;
        scores.p2pointsWon += game.getPlayer1Score();
        scores.p1pointsWon += game.getPlayer2Score();
        scores.p2pointsLost += game.getPlayer2Score();
        scores.p1pointsLost += game.getPlayer1Score();
      }
    })
    return scores;
  }

  render() {
    const {
      gamesPlayed,
      p1gamesWon,
      p2gamesWon,
      p1pointsLost,
      p2pointsLost,
      p1pointsWon,
      p2pointsWon
    } = this.getUsersScores();

    return (<div>
      <h1>Head to Head</h1>
      <div className="row">
        <div className="col-xs-4">
          <h4 className="light">P1</h4>
          <span className={styles.displayPicker}><InputSelect placeholder="All Leagues" options={this.getPlayers(1)} onChange={this.player1Change} selected={this.state.player1Id}/></span>
        </div>
        <div className="col-xs-4">
          <h4 className="light">League</h4>
          <span className={styles.displayPicker}><InputSelect placeholder="All Leagues" options={this.getLeagues()} onChange={this.leagueChange}/></span>
        </div>
        <div className="col-xs-4">
          <h4 className="light">P2</h4>
          <span className={styles.displayPicker}><InputSelect placeholder="All Leagues" options={this.getPlayers(2)} onChange={this.player2Change} selected={this.state.player2Id}/></span>
        </div>
      </div>
      <p className={styles.gamesPlayed}>
        <CountUp end={gamesPlayed || 0} duration={2}></CountUp>
      </p>
      <h3 className="light">Games Played</h3>
      <Scoreboard colorChange={true} centreName="Wins" forPoints={p1gamesWon || 0} againstPoints={p2gamesWon || 0}></Scoreboard>
      <Scoreboard colorChange={true} centreName="Points Won" forPoints={p1pointsWon || 0} againstPoints={p2pointsWon || 0}></Scoreboard>
      <Scoreboard colorChange={true} colorInvert={true} centreName="Points Lost" forPoints={p1pointsLost || 0} againstPoints={p2pointsLost || 0}></Scoreboard>
      <GameHistory games={this.getPlayedGames()}></GameHistory>
    </div>)
  }
}

export default HeadToHead;
