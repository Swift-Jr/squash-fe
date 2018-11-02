import React from 'react';
import {withRouter} from "react-router";

import {connect} from 'react-redux';
import {CreateClub} from '../CreateClub';
import {CreateLeague} from '../CreateLeague';
import {InvitePlayers} from '../InvitePlayers';

import {clubService} from '../../services';

import styles from './styles.module.css';

class DefaultWelcomeComponent extends React.Component {
  handleClubClose = () => {
    this.setState({createClub: false});
  }

  handleLeagueClose = () => {
    this.setState({createLeague: false});
  }

  createClubIsVisible = () => {
    return this.club
      ? true
      : false;
  }

  createLeagueIsVisible = () => {
    return this.createLeague;
  }

  userHasLeagues = () => {
    const usersClubs = clubService.getUserClubs();

    const clubsWithLeagues = usersClubs.filter(clubToCheck => {
      return clubToCheck
        .getLeagues()
        .length > 0;
    });

    return clubsWithLeagues.length > 0;
  }

  userHasClubs = () => {
    return clubService
      .getUserClubs()
      .length > 0;
  }

  render = () => {
    return (<div className={styles.welcome}>
      <h1>Welcome</h1>
      <p>
        Battr, is the French for&nbsp;
        <strong>
          to beat.</strong>
      </p>
      {
        !this.userHasClubs()
          ? <div className={styles.noClubs}>
              <i class="far fa-hand-peace fa-6x"></i>
              <p>If you’re ready to beat someone, ask your friends to invite you or create your own club.</p>
              <CreateClub buttonClass="large" buttonTitle="Create a club"></CreateClub>
            </div>
          : null
      }
      {
        this.userHasClubs() && !this.userHasLeagues()
          ? <div>
              <p>Great! You've created&nbsp;
                <b>
                  {
                    clubService
                      .getUserClubs()[0]
                      .getName()
                  }</b>. Now let's add a League!</p>
              <CreateLeague buttonTitle="Create a league"></CreateLeague>
            </div>
          : null
      }
      {
        this.userHasClubs() && this.userHasLeagues()
          ? <div>
              <p>Finally, invite some friends to battre</p>
              <InvitePlayers></InvitePlayers>
            </div>
          : null
      }
    </div>)
  }
}

//export default DefaultWelcomeComponent;

function mapStateToProps(state) {
  const {user} = state;
  return {user};
}

const connectedDefaultWelcomeComponent = withRouter(connect(mapStateToProps)(DefaultWelcomeComponent));
export {
  connectedDefaultWelcomeComponent as DefaultWelcome
};
