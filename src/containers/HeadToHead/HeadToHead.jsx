import React from 'react';
import CountUp from 'react-countup';
import {withRouter} from "react-router";
import {connect} from 'react-redux'

import {userService, leagueService, gameService} from '../../services';

import {InputSelect} from '../../components/Inputs';
import {GameHistory} from '../../components/GameHistory';
import {Scoreboard} from '../../components/Scoreboard';
import {Loading} from '../App/Loading';

import styles from './styles.module.css';

export class HeadToHeadComponent extends React.Component {
  constructor(props) {
    super(props);

    var p1Id = userService
      .getCurrentUser()
      .getUserId();

    var p2Id = null;

    if (gameService.getLeagueGames('*')[0]) {
      p2Id = gameService
        .getLeagueGames('*')[0]
        .getOtherUser(p1Id)
        .getUserId();
    }

    this.state = {
      player1Id: p1Id,
      player2Id: p2Id,
      leagueId: null
    }

  }

  componentWillReceiveProps = (props) => {
    if (!this.state.player2Id && gameService.getLeagueGames('*')[0]) {
      let p2Id = gameService
        .getLeagueGames('*')[0]
        .getOtherUser(this.state.player1Id)
        .getUserId();

      this.setState({player2Id: p2Id})
    }
  }

  getLeagues() {
    const leagueList = leagueService
      .getUsersLeagues()
      .filter(league => league.getResults().length)
      .map((league) => {
        return {value: league.getId(), option: league.getShortname()};
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
    let games = gameService.getLeagueGames(leagueId || '*')

    games = games.filter(match => {
      return (match.getPlayer1().getUserId() === player1Id && match.getPlayer2().getUserId() === player2Id) || (match.getPlayer1().getUserId() === player2Id && match.getPlayer2().getUserId() === player1Id)
    });

    return games;
  }

  getPlayers = (key) => {
    const leagues = (this.state.leagueId > 0)
      ? [leagueService.getLeagueById(this.state.leagueId)]
      : leagueService.getUsersLeagues();

    var players = [];
    leagues.forEach((league) => {
      league
        .getResults()
        .forEach((result) => {
          players = [
            ...players,
            ...[result.getPlayer()]
          ];
        });
    });

    var foundPlayerIds = [];
    const options = players
      .filter((player) => {
        if (foundPlayerIds[player.getUserId()]) {
          return null;
        } else {
          foundPlayerIds[player.getUserId()] = player;
          return true;
        }
      })
      .filter(player => {
        if (key === 2 && player.getUserId() === this.state.player1Id) {
          return false;
        }
        if (key === 1 && player.getUserId() === this.state.player2Id) {
          return false;
        }
        return true;
      })
      .map((player) => {
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

  isLoading = () => {
    return this
      .getPlayers()
      .length === 0 || !this.state.player2Id;
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
      {
        this.isLoading()
          ? <Loading></Loading>
          : <div>
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
            </div>
      }
    </div>)
  }
}

//export default HeadToHead;

function mapStateToProps(state) {
  const {user, games, league} = state;
  return {user, games, league};
}

const connectedHeadToHead = withRouter(connect(mapStateToProps)(HeadToHeadComponent));
export {
  connectedHeadToHead as HeadToHead
};
