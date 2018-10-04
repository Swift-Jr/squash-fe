import React from 'react';
import {logoSmall} from '../App/images';

import {userService, authService} from '../../services';

import {InputText} from '../../components/Inputs';

export class Account extends React.Component {
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
        const invite = userService.getInvite(props.match.params.inviteId);
        this.state = {
          action: props.match.params.action,
          invite: invite,
          email: invite.email
        };
        break;
      default:
        props.history.push('/');
    }
  }

  handleSignin = (e) => {
    e.preventDefault();
    this.props.history.push('/login');
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreate = (e) => {
    e.preventDefault();

    const {firstname, lastname, email, password} = this.state;
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    };

    if (userService.createUser(user)) {
      if (authService.login(user.email, user.password)) {
        this.props.history.push('/');
      }
    }
    console.log(this.state);
  }

  handleRecover = (e) => {
    e.preventDefault();

    const {email} = this.state;

    if (userService.requestRecoverAccount(email)) {
      this.setState({recoverySent: true});
    }
  }

  render = () => {
    const {recoverySent} = this.state;

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
            <InputText name="firstname" placeholder="Firstname" onChange={this.handleInputChange}/>
            <InputText name="lastname" placeholder="Lastname" onChange={this.handleInputChange}/>
            <InputText name="password" placeholder="Password" type="password" onChange={this.handleInputChange}/>

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
                    <button className="large" onClick={this.handleRecover}>Recover Account</button>
                  </div>
                </form>
          }
        </div>
        break;
      default:
        return null;
    }
  }
}
