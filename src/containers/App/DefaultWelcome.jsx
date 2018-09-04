import React from 'react';

import {JoinLeagueClub} from '../JoinLeagueClub';

import styles from './styles.module.css';

const DefaultWelcome = (props) => {
  return (<div className={styles.welcome}>
    <h1>Welcome</h1>
    <p>
      Battr, is the French for&nbsp;
      <strong>
        to beat.</strong>
    </p>
    <p>If you’re ready to beat someone, you’ll need to join a league first.</p>
    <JoinLeagueClub buttonClass="large" buttonTitle="Join a League" clubOrLeague={2}></JoinLeagueClub>
    <p>If you’re a member of a club, join to get access to their private leagues.</p>
    <JoinLeagueClub buttonClass="large" buttonTitle="Join a Club" clubOrLeague={1}></JoinLeagueClub>
    <div className={`fixedBottom ${styles.fixedBottom}`}>
      <p>
        Want your own club or league?
      </p>
      <div className="col-xs-6">
        <button className="small" onClick={props.onCreateLeague}>Create a Club</button>
      </div>
      <div className="col-xs-6">
        <button className="small" onClick={props.onCreateLeague}>Create a League</button>
      </div>
    </div>
  </div>)
}

export default DefaultWelcome;
