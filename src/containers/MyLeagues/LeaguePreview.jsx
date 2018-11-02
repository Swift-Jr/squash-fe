import React from 'react';
import {Link} from 'react-router-dom';

import {userService, clubService} from '../../services';

import {LeagueTable} from '../../components/LeagueTable';
import {PlayMatch} from '../PlayMatch';

import styles from './styles.module.css';

export const LeaguePreview = (props) => {
  const {league, header, preview} = props;

  const noGames = league
    .getResults()
    .length === 0;

  const notPlayed = league
    .getResults()
    .filter(result => result.getPlayer().getUserId() == userService.getCurrentUser().getUserId())
    .length === 0;

  return <div>
    <h2>
      <Link to={`/league/${league.getId()}`}>{league.getName()}</Link>
    </h2>
    {
      !noGames && !notPlayed
        ? <LeagueTable league={league} header={header} preview={preview}></LeagueTable>
        : null
    }
    {
      noGames
        ? <p className={styles.noResults}>No one has played in this league yet!</p>
        : null
    }
    {
      !noGames && notPlayed
        ? <p className={styles.noResults}>You need to play at least one match to rank in this league</p>
        : null
    }
  </div>
}

export default LeaguePreview;
