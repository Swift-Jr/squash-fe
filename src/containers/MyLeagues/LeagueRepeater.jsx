import React from 'react';
import {Link} from 'react-router-dom';

import {userService, clubService} from '../../services';

import {LeaguePreview} from './LeaguePreview';

import styles from './styles.module.css';

export const LeagueRepeater = (props) => {
  const preview = props.preview || false;
  const header = props.header === false
    ? false
    : true;
  console.log(props.leagues);
  return props
    .leagues
    .map((league) => <LeaguePreview league={league} header={header} preview={preview}></LeaguePreview>);
}

export default LeagueRepeater;
