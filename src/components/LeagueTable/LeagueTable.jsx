import React from 'react';

import {Link} from 'react-router-dom';
import {authService, userService} from '../../services';

import styles from './styles.module.css';

export const LeagueTable = (props) => {
  const {league, header, preview} = props;

  if (!league) 
    return null;
  
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
        <LeagueTableRows rows={league.getResults()} preview={preview}></LeagueTableRows>
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
      if (rows[i].getPlayer().getUserId() === userService.getCurrentUser().getUserId()) {
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
    const pointDiff = row.getPointsWon() - row.getPointsLost();
    const isUserScore = userService
      .getCurrentUser()
      .getUserId() === row
      .getPlayer()
      .getUserId();

    counter++;
    const rowStyle = counter % 2 === 0
      ? styles.stripedRow
      : null;

    /*<td>{
          pointDiff > 0
            ? '+'
            : null
        }{pointDiff}/{row.getScoreDiff()}</td>*/
    return (<tr className={`${rowStyle} ${isUserScore
        ? styles.currentUserHighlight
        : null}`}>
      <td className={styles.bold}>{
          isUserScore
            ? numberToPlace(row.getPlace())
            : <Link to={`/scorecard/${row
                  .getPlayer()
                  .getUserId()}`}>{
                  row
                    .getPlayer()
                    .getFirstname()
                }</Link>
        }</td>
      <td>{row.getMatchesPlayed()}</td>
      <td>{row.getMatchesWon()}</td>
      <td>{row.getPointsWon()}</td>
      <td>{row.getPointsLost()}</td>
      <td>{row.getScoreDiff()}</td>
      <td className={styles.bold}>{row.getScorePoints()}</td>
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
