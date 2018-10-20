import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

import {user, alerts} from '../../services';

import {InputText} from '../../components/Inputs';

import {logoSmall} from '../App/images';

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
        const invite = user
          .service
          .getInvite(props.match.params.actionId);
        this.state = {
          action: props.match.params.action,
          invite: invite,
          email: invite.email
        };
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
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
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
    const {recoverySent, recoverRequest} = this.props.user;

    switch (this.state.action) {
      case 'create':
      case 'invite':
        return <div>
          <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
          <form onSubmit={this.handleLogin}>
            {
              this.state.action === 'invite'
                ? <p>Enter some details to accept your invite!</p>
                : null
            }
            <InputText value={this.state.email} name="email" placeholder="E-mail" onChange={this.handleInputChange}/>
            <InputText value={this.state.firstname} name="firstname" placeholder="Firstname" onChange={this.handleInputChange}/>
            <InputText value={this.state.lastname} name="lastname" placeholder="Lastname" onChange={this.handleInputChange}/>
            <InputText value={this.state.password} name="password" placeholder="Password" type="password" onChange={this.handleInputChange} autoComplete="new-password"/>

            <div className="fixedBottom">
              <button className="small" onClick={this.handleSignin}>Already have an account?</button>
              <button className="large" onClick={this.handleCreate}>Create Account</button>
            </div>
          </form>
        </div>
        break;
      case 'forgot':
        return <div>
          <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/> {
            recoverySent
              ? <div>
                  <p>We've sent you a recovery e-mail. Please check your inbox!</p>
                  <div className="fixedBottom">
                    <button className="large" onClick={this.handleSignin}>Login</button>
                  </div>
                </div>
              : <form onSubmit={this.handleLogin}>
                  <p>To recover your account, enter your e-mai and we'll send you a password reset link.</p>
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
          }
        </div>
        break;
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
        break;
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
