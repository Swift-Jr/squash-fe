import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {clubService, leagueService} from '../../services';
import {InputButton} from '../../components/Inputs';

import styles from './styles.module.css';

export class ClubComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedLeague: false,
      archiveConfirm: false,
      unarchiveConfirm: false,
      deleteConfirm: false
    }
  }
  openLeague = (id) => {
    if (id === this.state.openedLeague) {
      id = false;
    }
    this.setState({openedLeague: id});
  }

  archiveLeague = (id, confirm) => {
    if (id !== confirm) {
      this.setState({archiveConfirm: id});
      setTimeout(() => {
        this.setState({archiveConfirm: false})
      }, 2000);
      return;
    }

    if (id === confirm) {
      this
        .props
        .dispatch(leagueService.actions.updateLeague(id, {archived: true}))
    }
  }

  unarchiveLeague = (id, confirm) => {
    if (id !== confirm) {
      this.setState({unarchiveConfirm: id});
      setTimeout(() => {
        this.setState({unarchiveConfirm: false})
      }, 2000);
      return;
    }

    if (id === confirm) {
      this
        .props
        .dispatch(leagueService.actions.updateLeague(id, {archived: false}))
    }
  }

  deleteLeague = (id, confirm) => {
    if (id !== confirm) {
      this.setState({deleteConfirm: id});
      setTimeout(() => {
        this.setState({deleteConfirm: false})
      }, 2000);
      return;
    }

    if (id === confirm) {
      this
        .props
        .dispatch(leagueService.actions.updateLeague(id, {deleted: true}))
    }
  }

  getLeagues = () => {
    const {archiveConfirm, unarchiveConfirm, deleteConfirm} = this.state;
    return this
      .props
      .club
      .getLeagues(true)
      .map(league => <li key={league.getId()} className={`${league.getArchived() && styles.archived}`}>
        <i className={`fas fa-trophy fa-2x ${styles.leftIcon}`}></i>
        <i className={`fas fa-ellipsis-h fa-2x ${styles.rightIcon}`} onClick={() => this.openLeague(league.getId())}></i>
        <h2>
          <Link to={`/league/${league.getId()}`}>{league.getName()}</Link>
        </h2>
        <p>
          <span className={styles.badge}>
            <span>{
                league
                  .getResults()
                  .length
              }</span>players</span>
          <span className={styles.badge}>
            <span>{
                league
                  .getGames()
                  .length
              }</span>games</span>
        </p>
        {
          this.state.openedLeague === league.getId() && <div className={`row ${styles.actions && styles.actions}`}>
              <div className="col-xs-6">
                {
                  league.getArchived()
                    ? <InputButton className="small" onClick={() => this.unarchiveLeague(league.getId(), unarchiveConfirm)}>
                        <i className="far fa-file-archive"></i>
                        {
                          unarchiveConfirm === league.getId()
                            ? `Sure?`
                            : `Unarchive`
                        }</InputButton>
                    : <InputButton className="small" onClick={() => this.archiveLeague(league.getId(), archiveConfirm)}>
                        <i className="far fa-file-archive"></i>
                        {
                          archiveConfirm === league.getId()
                            ? `Sure?`
                            : `Archive`
                        }</InputButton>
                }
              </div>
              <div className="col-xs-6">
                <InputButton className={`small ${styles.badAction}`} onClick={() => this.deleteLeague(league.getId(), deleteConfirm)}>
                  <i className="far fa-trash-alt"></i>
                  {
                    deleteConfirm === league.getId()
                      ? `Sure?`
                      : `Delete`
                  }</InputButton>
              </div>

            </div>
        }
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
      {
        this
          .getLeagues()
          .length
            ? <ul className={styles.leaguesList}>{this.getLeagues()}</ul>
            : <p>No leagues...</p>
      }
      <h3>Members</h3>
      <ul className={styles.membersList}>{this.getMembers()}</ul>
      <h3>Invites</h3>
      <ul className={styles.invitesList}>{this.getInvites()}</ul>
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
