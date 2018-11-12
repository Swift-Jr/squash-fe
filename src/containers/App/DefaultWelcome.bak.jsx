import React from 'react';

import {JoinLeagueClub} from '../JoinLeagueClub';
import {CreateClub} from '../CreateClub';
import {leagueService} from '../../services';

import styles from './styles.module.css';

class DefaultWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;

    this.handleCreateType = this
      .handleCreateType
      .bind(this);
    this.handleClubClose = this
      .handleClubClose
      .bind(this);
  }

  handleCreateType(type) {
    if (type === 1) {
      this.setState({createClub: true});
    } else {
      this.setState({createLeague: true});
    }
  }

  handleLeagueOpen = (e) => {
    this
      .props
      .dispatch(leagueService.actions.open());
  }

  handleClubClose() {
    this.setState({createClub: false});
  }

  render() {
    return (<div className={styles.welcome}>
      <h1>Welcome</h1>
      <p>
        Battr, is the French for&nbsp;
        <strong>
          to beat.</strong>
      </p>
      <p>If you’re ready to beat someone, you’ll need to join a league first.</p>
      <JoinLeagueClub createType={this.handleCreateType} buttonClass="large" buttonTitle="Join a League" clubOrLeague={2}></JoinLeagueClub>
      <p>If you’re a member of a club, join to get access to their private leagues.</p>
      <JoinLeagueClub createType={this.handleCreateType} buttonClass="large" buttonTitle="Join a Club" clubOrLeague={1}></JoinLeagueClub>
      <div className={`fixedBottom ${styles.fixedBottom}`}>
        <p>
          Want your own club or league?
        </p>
        <div className="col-xs-6">
          <CreateClub visible={this.state.createClub} onClose={this.handleClubClose} buttonClass="small" buttonTitle="Create a club"></CreateClub>
        </div>
        <div className="col-xs-6">
          <CreateLeague visible={this.state.createLeague} buttonClass="small" buttonTitle="Create a league"></CreateLeague>
        </div>
      </div>
    </div>)
  }
}

export default DefaultWelcome;
