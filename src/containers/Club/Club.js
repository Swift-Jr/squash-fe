import React from "react";
import {connect} from "react-redux";

import {clubService} from '../../services';

export class ClubComponent extends React.Component {
  getLeagues = () => {
    return this
      .props
      .club
      .getLeagues()
      .map(league => <li key={league.getId()}>
        <h2>{league.getName()}</h2>
        <p>{
            league
              .getResults()
              .length
          }&nbsp;players</p>
      </li>)
  }

  getMembers = () => {
    return this
      .props
      .club
      .getMembers()
      .map(member => <li key={member.getUserId()}>{member.getFirstname()}&nbsp;{member.getLastname()}</li>)
  }

  getInvites = () => {
    return this
      .props
      .club
      .getInvites()
      .map(invite => <li key={invite.id}>{invite.email}</li>)
  }

  render() {
    const {club} = this.props;
    return <div>
      <h1>{club.getName()}</h1>
      <h3>Leagues</h3>
      <ul>{this.getLeagues()}</ul>
      <h3>Members</h3>
      <ul>{this.getMembers()}</ul>
      <h3>Invites</h3>
      <ul>{this.getInvites()}</ul>
    </div>;
  }
}

function mapStateToProps(state) {
  return {club: clubService.getCurrentClub()};
}

const connectedClubComponent = connect(mapStateToProps)(ClubComponent);
export {
  connectedClubComponent as Club
};
