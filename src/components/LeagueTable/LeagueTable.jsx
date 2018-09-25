import React from 'react';

import {Link} from 'react-router-dom';
import {authService} from '../../services';

import styles from './styles.module.css';

export const LeagueTable = (props) => {
  const {league, header, preview} = props;

  return <div>
    <table>
      {
        header === true
          ? <thead>
              <tr>
                <td>Player</td>
                <td>Played</td>
                <td>Won</td>
                <td>For</td>
                <td>Lost</td>
                <td>Diff</td>
                <td>Pts</td>
              </tr>
            </thead>
          : null
      }
      <tbody>
        <LeagueTableRows rows={league.results} preview={preview}></LeagueTableRows>
      </tbody>
    </table>
  </div>
}

export const LeagueTableRows = (props) => {
  const {rows, preview} = props;
  var leagueRows = [];

  if (preview) {
    var i;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].player.id === authService.getUserId()) {
        break;
      }
    }

    if (i === 0) {
      if (rows[0]) 
        leagueRows[0] = rows[0];
      if (rows[1]) 
        leagueRows[1] = rows[1];
      if (rows[2]) 
        leagueRows[2] = rows[2];
      }
    else if (i >= rows.length - 1) {
      if (rows[i - 2]) 
        leagueRows[0] = rows[i - 2];
      if (rows[i - 1]) 
        leagueRows[1] = rows[i - 1];
      if (rows[i]) 
        leagueRows[2] = rows[i];
      }
    else {
      if (rows[i - 1]) 
        leagueRows[0] = rows[i - 1];
      if (rows[i]) 
        leagueRows[1] = rows[i];
      if (rows[i + 1]) 
        leagueRows[2] = rows[i + 1];
      }
    } else {
    leagueRows = rows;
  }

  var counter = 0;

  return leagueRows.map((row) => {
    const pointDiff = row.pointsWon - row.pointsLost;
    const isUserScore = authService.getUserId() === row.player.id;

    counter++;
    const rowStyle = counter % 2 === 0
      ? styles.stripedRow
      : null;

    return (<tr className={`${rowStyle} ${isUserScore
        ? styles.currentUserHighlight
        : null}`}>
      <td className={styles.bold}>{
          isUserScore
            ? numberToPlace(row.place)
            : <Link to={`/scorecard/${row.player.id}`}>{row.player.name}</Link>
        }</td>
      <td>{row.played}</td>
      <td>{row.won}</td>
      <td>{row.pointsWon}</td>
      <td>{row.pointsLost}</td>
      <td>{
          pointDiff > 0
            ? '+'
            : '-'
        }{pointDiff}</td>
      <td className={styles.bold}>{row.score}</td>
    </tr>);
  })
}

export const numberToPlace = (number) => {
  var postfix;
  switch (number) {
    case 1:
      postfix = 'st';
      break;
    case 2:
      postfix = 'nd';
      break;
    case 3:
      postfix = 'rd';
      break;
    default:
      postfix = 'th';
  }
  return number + postfix;
}
