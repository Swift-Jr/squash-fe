import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

import {user, inviteService} from '../../services';

import {InputText} from '../../components/Inputs';

import {logoSmall} from '../App/images';

import CreateInvite from './CreateInvite';

export class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    switch (props.match.params.action) {
      case 'create':
      case 'forgot':
        this.state = {
          action: props.match.params.action
        };
        break;
      case 'invite':
        inviteService
          .getInvite(props.match.params.actionId)
          .then((invite) => {
            this.setState({action: props.match.params.action, invite, email: invite.email})
          });
        this.state = {
          action: 'create'
        }
        break;
      case 'recover':
        const token = props.match.params.actionId;
        if (user.service.recoveryTokenIsValid(token)) {
          this.state = {
            action: props.match.params.action,
            token: token
          };
        }
        break;
      default:
        props
          .history
          .push('/');
    }
  }

  handleSignin = (e) => {
    e.preventDefault();
    this
      .props
      .history
      .push('/login');
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreate = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;

    const {firstname, lastname, email, password} = this.state;
    const token = this.state.invite
      ? this.state.invite.token
      : null;
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      token: token
    };

    dispatch(user.service.register(data));
  }

  handleRecover = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    const {email} = this.state;

    dispatch(user.service.requestRecoverAccount(email));
  }

  handleRecoverPassword = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    const {password, token} = this.state;

    dispatch(user.service.completeRecoverAccount(token, password));
  }

  render = () => {
    const {action} = this.state;
    const {handleInputChange, handleCreate, handleSignin} = this;

    switch (this.state.action) {
      case 'create':
      case 'invite':
        return <CreateInvite action={action} state={this.state} handleInputChange={handleInputChange} handleSignin={handleSignin} handleCreate={handleCreate}></CreateInvite>

      case 'forgot':
        return <div>
          <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
          <form>
            <p>Lost your password huh? Drop your email to get a new one</p>
            <InputText name="email" placeholder="E-mail" onChange={this.handleInputChange}/>

            <div className="fixedBottom">
              <button className="small" onClick={this.handleSignin}>Already have an account?</button>
              <button className="large" onClick={this.handleRecover}>{
                  user.loggingIn
                    ? <i className="fas fa-spinner fa-spin"></i>
                    : <span>Recover Account</span>
                }</button>
            </div>
          </form>
        </div>
      case 'recover':
        return <div>
          <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
          <form>
            <p>Choose a new password</p>

            <InputText value={this.state.password} name="password" placeholder="Password" type="password" onChange={this.handleInputChange} autoComplete="new-password"/>

            <div className="fixedBottom">
              <button className="small" onClick={this.handleSignin}>Back to login</button>
              <button className="large" onClick={this.handleRecoverPassword}>{
                  user.loading
                    ? <i className="fas fa-spinner fa-spin"></i>
                    : <span>Reset Password</span>
                }</button>
            </div>
          </form>
        </div>
      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {user};
}

const connectedAccountPage = withRouter(connect(mapStateToProps)(AccountPage));
export {
  connectedAccountPage as Account
};
