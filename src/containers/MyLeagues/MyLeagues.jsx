import React from 'react';
import {Link} from 'react-router-dom';

import {userService} from '../../services';

import {LeagueTable} from '../../components/LeagueTable';
import {PlayMatch} from '../PlayMatch';

import styles from './styles.module.css';

export const LeagueRepeater = (props) => {
  const preview = props.preview || false;
  const header = props.header === false
    ? false
    : true;

  const LeagueDetails = userService.getCurrentUser().getLeagues();

  return LeagueDetails.map((league) => <LeaguePreview league={league} header={header} preview={preview}></LeaguePreview>);
}

const LeaguePreview = (props) => {
  const {league, header, preview} = props;

  return <div>
    <h2>
      <Link to={`/league/${league.getId()}`}>{league.getName()}</Link>
    </h2>
    {
      league.getResults().length > 0
        ? <LeagueTable league={league} header={header} preview={preview}></LeagueTable>
        : <p className={styles.noResults}>You need to play at least one match to rank in this league</p>
    }
  </div>
}

export class MyLeagues extends React.Component {
  render() {
    return (<div className="fixedPaddingBottom">
      <h1>Club Leagues</h1>
      <LeagueRepeater header={false} preview={true}></LeagueRepeater>
      <div className={`fixedBottom play-match`}>
        <PlayMatch></PlayMatch>
      </div>
    </div>)
  }
}

export default MyLeagues;
