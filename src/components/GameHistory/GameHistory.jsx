import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

import {authService} from '../../services';

import styles from './styles.module.css';

export const GameHistory = (props) => {
  const {games, showLeague} = props;
  return <table className={styles.gameTable}>
    <thead>
      <tr>
        {
          showLeague
            ? <td>League</td>
            : null
        }
        <td>Date</td>
        <td>{
            showLeague
              ? 'Vs'
              : 'Players'
          }
        </td>
        <td className={styles.score}>Score</td>
      </tr>
    </thead>
    <tbody className={styles.bold}>
      <GameHistoryRows games={games} showLeague={showLeague}></GameHistoryRows>
    </tbody>
  </table>
}

export const GameHistoryRows = (props) => {
  const {games, showLeague} = props;
  var counter = 1;

  const selectOtherPlayer = (player1, player2) => player1.id == authService.getUserId()
    ? player2
    : player1;

  return games.map((game) => {
    counter++;
    const rowStyle = counter % 2 === 0
      ? styles.stripedRow
      : null;
    const userStyle = (
      game.player1.id === authService.getUserId() || game.player2.id === authService.getUserId()
      ? styles.currentUserHighlight
      : null);

    return <tr className={`${userStyle} ${rowStyle}`}>
      {
        showLeague
          ? <td>
              <Link to={`/league/${game.league.id}`}>{game.league.shortName}</Link>
            </td>
          : null
      }
      <td>
        <span className={styles.lightText}>
          <Moment format="D">{game.date}</Moment>
        </span>
        <Moment format="MMM">{game.date}</Moment>
        <span className={styles.lightText}>
          <Moment format="YY">{game.date}</Moment>
        </span>
      </td>
      <td>
        {
          showLeague
            ? <Link to={`/scorecard/${selectOtherPlayer(game.player1, game.player2).id}`}>
                <span className={styles.lightText}>{selectOtherPlayer(game.player1, game.player2).firstname}</span>
              </Link>
            : <div>
                <span className={styles.lightText}>
                  <Link to={`/scorecard/${game.player1.id}`}>{
                      game.player1.id === authService.getUserId()
                        ? 'Me'
                        : game.player1.firstname
                    }</Link>
                </span>
                &nbsp;v&nbsp;
                <span className={styles.lightText}>
                  <Link to={`/scorecard/${game.player2.id}`}>{
                      game.player2.id === authService.getUserId()
                        ? 'Me'
                        : game.player2.firstname
                    }</Link>
                </span>
              </div>
        }
      </td>
      <td className={styles.score}>
        <span className={styles.lightText}>{game.player1Score}&nbsp;-&nbsp;{game.player2Score}</span>
      </td>
    </tr>
  })
}
