import React from 'react';
import styles from './styles.module.css';

const DefaultWelcome = () => {
  return (<div className={styles.welcome}>
    <h1>Welcome</h1>
    <p>
      Battr, is the French for&nbsp;
      <strong>
        to beat.</strong>
    </p>
    <p>If you’re ready to beat someone, you’ll need to join a league first.</p>
    <button className="large">Join a League</button>
    <p>
      If you’re a member of a club, join to get access to their private leagues.</p>
    <button className="large">Join a Club</button>
    <div className={`fixedBottom ${styles.fixedBottom}`}>
      <p>
        Want your own club or league?
      </p>
      <div className="col-xs-6">
        <button className="small">Create a Club</button>
      </div>
      <div className="col-xs-6">
        <button className="small">Create a League</button>
      </div>
    </div>
  </div>)
}

export default DefaultWelcome;
