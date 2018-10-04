import React from 'react';

import {authService} from '../../services';

import {InputText} from '../../components/Inputs';

import {logoSmall} from '../App/images';

import styles from './styles.module.css';

//TODO: Move to history service
//import {createBrowserHistory} from 'history';
//const history = createBrowserHistory();

export class Login extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.func) {
      switch (this.props.match.params.func) {
        case 'out':
          authService.logout();
          break;
        default:

      }
    }
    if (authService.check()) {
      props.history.push('/myleagues');
    }

  }

  handleLogin = (e) => {
    e.preventDefault();
    if (authService.login()) {
      this.props.history.push('/myleagues');
    }
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.props.history.push('/account/create');
  }

  handleForgot = (e) => {
    e.preventDefault();
    this.props.history.push('/account/forgot');
  }

  render() {
    return (<div>
      <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <InputText name="username" placeholder="Username"/>
        <InputText name="password" placeholder="Password" type="password"/>
        <button className={`small ${styles.forgotPassword}`} onClick={this.handleForgot}>Forgot Password</button>
        <div className="fixedBottom">
          <button className="small" onClick={this.handleCreate}>Create Account</button>
          <button className="large" onClick={this.handleLogin}>Sign In</button>
        </div>
      </form>
    </div>)
  }
}

export default Login;
