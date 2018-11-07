import React from 'react';

import {LeaguePreview} from './LeaguePreview';

export const LeagueRepeater = (props) => {
  const preview = props.preview || false;
  const header = props.header === false
    ? false
    : true;
  return props
    .leagues
    .map((league) => <LeaguePreview key={league.getId()} league={league} header={header} preview={preview}></LeaguePreview>);
}

export default LeagueRepeater;
