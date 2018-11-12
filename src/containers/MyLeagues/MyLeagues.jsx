import React from 'react';
import {connect} from 'react-redux';

import {clubService, inviteService, leagueService} from '../../services';

import {LeagueRepeater} from './LeagueRepeater';
import {PlayMatch} from '../PlayMatch';
import {Loading} from '../App/Loading';

import styles from './styles.module.css';

export class MyLeaguesComponent extends React.Component {
  getLeaguesForClub = () => {
    return clubService
      .getCurrentClub()
      .getLeagues();
  }

  clubHasLeagues = () => {
    return this
      .getLeaguesForClub()
      .length > 0
  }

  clubHasMembers = () => {
    return clubService
      .getCurrentClub()
      .hasPlayers();
  }

  clubPendingInvites = () => {
    let clubId = clubService
      .getCurrentClub()
      .getId();
    return inviteService.getPendingInvites(clubId);
  }

  openInvites = () => {
    this
      .props
      .dispatch(inviteService.actions.open());
  }

  handleLeagueOpen = (e) => {
    this
      .props
      .dispatch(leagueService.actions.open());
  }

  render() {
    return (<div className="fixedPaddingBottom">
      <h1>Club Leagues</h1>
      {
        this.clubHasLeagues() && this.clubHasMembers()
          ? <div>
              <LeagueRepeater header={false} preview={true} leagues={this.getLeaguesForClub()}></LeagueRepeater>
              <div className={`fixedBottom play-match`}>
                <PlayMatch></PlayMatch>
              </div>
            </div>
          : null
      }
      {
        !this.clubHasLeagues() && typeof(this.props.league.listUpdated) === "boolean"
          ? <Loading></Loading>
          : null
      }
      {
        !this.clubHasLeagues() && typeof(this.props.league.listUpdated) !== "boolean"
          ? <div className={styles.noLeagues}>
              <i className="far fa-grin-beam-sweat fa-6x"></i>
              <p>You'll need to add a League to this Club to get playing!</p>
              <button className="large" onClick={this.handleLeagueOpen}>Add a league</button>
            </div>
          : null
      } {
        this.clubHasLeagues() && !this.clubHasMembers()
          ? <div className={styles.noLeagues}>
              <i className="far fa-sad-cry fa-6x"></i>
              <p>Sad times! You've got no one to play with. Time to get some friends involed!</p>
              <button className="large" onClick={this.openInvites}>Invite Players</button>
              <PendingInvites invites={this.clubPendingInvites()}></PendingInvites>
            </div>
          : null
      }</div>)
  }
}

export const PendingInvites = (props) => {
  return (<div className={styles.pendingInvites}>
    <h3>Your pending Invites</h3>{
      props.invites.length > 0
        ? <ul>{
              props
                .invites
                .map(invite => <li key={invite.token}>
                  {invite.email}</li>)
            }</ul>
        : <p>No pending invites</p>
    }</div>)
}

function mapStateToProps(state) {
  const {league, invites} = state;
  return {league, invites};
}

const connectedMyLeaguesComponent = connect(mapStateToProps)(MyLeaguesComponent);
export {
  connectedMyLeaguesComponent as MyLeagues
};
