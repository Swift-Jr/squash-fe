import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

import {userService} from '../../services';

import styles from './styles.module.css';

export const GameHistory = (props) => {
  const {games, showLeague} = props;

  const userId = parseInt(props.userContext || userService.getCurrentUser().getUserId(), 10);
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
      <GameHistoryRows games={games.slice(0, props.listSize)} showLeague={showLeague} userId={userId}></GameHistoryRows>
    </tbody>
  </table>
}

export const GameHistoryRows = (props) => {
  const {games, showLeague, userId} = props;
  var counter = 1;

  const selectOtherPlayer = (player1, player2) => player1.getUserId() === userId
    ? player2
    : player1;

  return games.map((game) => {
    counter++;
    const rowStyle = counter % 2 === 0
      ? styles.stripedRow
      : null;

    const userStyle = (
      game.getPlayer1().getUserId() === userId || game.getPlayer2().getUserId() === userId
      ? styles.currentUserHighlight
      : null);

    return <tr key={game.getId()} className={`${userStyle} ${rowStyle}`}>
      {
        showLeague
          ? <td>
              <Link to={`/league/${game
                  .getLeague()
                  .getId()}`}>{
                  game
                    .getLeague()
                    .getShortname()
                }</Link>
            </td>
          : null
      }
      <td>
        <span className={styles.lightText}>
          <Moment format="D">{game.getDate()}</Moment>
        </span>
        <Moment format="MMM">{game.getDate()}</Moment>
        <span className={styles.lightText}>
          <Moment format="YY">{game.getDate()}</Moment>
        </span>
      </td>
      <td>
        {
          showLeague
            ? <Link to={`/scorecard/${selectOtherPlayer(game.getPlayer1(), game.getPlayer2()).getUserId()}`}>
                <span className={styles.lightText}>{selectOtherPlayer(game.getPlayer1(), game.getPlayer2()).getFirstname()}</span>
              </Link>
            : <div>
                <span className={styles.lightText}>
                  <Link to={`/scorecard/${game
                      .getPlayer1()
                      .getUserId()}`}>{
                      game
                        .getPlayer1()
                        .getUserId() === userService
                        .getCurrentUser()
                        .getUserId()
                          ? 'Me'
                          : game
                            .getPlayer1()
                            .getFirstname()
                    }</Link>
                </span>
                &nbsp;v&nbsp;
                <span className={styles.lightText}>
                  <Link to={`/scorecard/${game
                      .getPlayer2()
                      .getUserId()}`}>{
                      game
                        .getPlayer2()
                        .getUserId() === userService
                        .getCurrentUser()
                        .getUserId()
                          ? 'Me'
                          : game
                            .getPlayer2()
                            .getFirstname()
                    }</Link>
                </span>
              </div>
        }
      </td>
      <td className={styles.score}>
        <span className={styles.lightText}>{game.getPlayer1Score()}&nbsp;-&nbsp;{game.getPlayer2Score()}</span>
      </td>
    </tr>
  })
}
