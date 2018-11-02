import React from 'react';
import {withRouter} from "react-router";
import {connect} from 'react-redux';
//import Moment from 'react-moment';
//import 'moment-timezone';

import {FullModal} from '../../components/FullModal';
import {InputText} from '../../components/Inputs';

import {inviteService, clubService} from '../../services';

import styles from './styles.module.css';

export const BodyContent = (props) => {
  return (<div>
    <ul className={styles.inviteList}>
      {
        props
          .invites
          .map(invite => <li>{invite}<span>
              <i className="far fa-trash-alt fa-1x" onClick={() => props.removeInvite(invite)}></i>
            </span>
          </li>)
      }
    </ul>
    <div className="fixedBottom">
      <button className="large" onClick={props.onSubmit} disabled={props.loading || props.invites.length == 0}>Send Invites</button>
    </div>
  </div>);
}
export class InvitePlayersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      buttonClass: props.buttonClass || 'large',
      buttonTitle: props.buttonTitle || 'Invite Players',
      pendingInvites: [],
      emailValid: false,
      email: null
    }

    this.handleOnOpen = this
      .handleOnOpen
      .bind(this);
    this.handleOnClose = this
      .handleOnClose
      .bind(this);

    this.getHeadContent = this
      .getHeadContent
      .bind(this);
    this.getBodyContent = this
      .getBodyContent
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps) {
      this.setState(nextProps);
    }
  }

  handleOnClose() {
    const {onClose} = this.state;
    this.setState({
      visible: false
    }, () => onClose && onClose(this.state.visible));
  }

  handleOnOpen() {
    const {onOpen} = this.state;
    this.setState({
      visible: true,
      email: null,
      pendingInvites: []
    }, () => onOpen && onOpen(this.state.visible));
  }

  handleSubmit = () => {
    const club_id = clubService
      .getUserClubs()[0]
      .getId();
    this
      .props
      .dispatch(inviteService.actions.create(this.state.pendingInvites, club_id));
  }

  onChangeEmail = e => {
    this.setState({email: e.target.value});
  }

  onAddEmail = () => {
    let emailExists = this
      .state
      .pendingInvites
      .filter(invite => invite == this.state.email)
      .length;

    if (emailExists) 
      return this.setState({email: null});
    
    this.setState({
      pendingInvites: this
        .state
        .pendingInvites
        .concat([this.state.email]),
      email: null
    })
  }

  removeInvite = (removed) => {
    this.setState((state) => {
      state.pendingInvites = state
        .pendingInvites
        .filter(invite => invite != removed);

      return state;
    })
  }

  updateEmailValiditiy = (valid) => {
    this.setState({emailValid: valid});
  }

  getHeadContent = () => {
    return <div className="row">
      <div className="col-xs-10">
        <form>
          <InputText isValid={this.updateEmailValiditiy} value={this.state.email} label="Email" placeholder="Email address" onChange={this.onChangeEmail} type="email"/>
        </form>
      </div>
      <div className={`col-xs-2 ${styles.buttonAddInvite}`}>
        <button disabled={!this.state.emailValid || !this.state.email} onClick={this.onAddEmail}>
          <i className="fas fa-plus fa-2x"></i>
        </button>
      </div>
    </div>
  }

  getBodyContent = () => {
    return <BodyContent removeInvite={this.removeInvite} invites={this.state.pendingInvites} onSubmit={this.handleSubmit} loading={this.props.invites.submitted}></BodyContent>;
  }

  isVisible = () => {
    return this.props.invites.error || (this.props.invites.submitted && this.props.invites.created === false) || this.state.visible;
  }

  render() {
    return (<div>
      {
        this.props.noButton
          ? null
          : <button className={this.state.buttonClass} onClick={this.handleOnOpen}>{this.state.buttonTitle}</button>
      }
      {
        this.isVisible()
          ? <FullModal onClose={this.handleOnClose} headContent={this.getHeadContent()} bodyContent={this.getBodyContent()}></FullModal>
          : null
      }
    </div>);
  }
}

function mapStateToProps(state) {
  const {invites} = state;
  return {invites};
}

const connectedInvitePlayersComponent = withRouter(connect(mapStateToProps)(InvitePlayersComponent));
export {
  connectedInvitePlayersComponent as InvitePlayers
};
