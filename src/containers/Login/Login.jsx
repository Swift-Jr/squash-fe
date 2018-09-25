import React from 'react';
import {Redirect} from 'react-router-dom';

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

    this.state = props;

    this.handleLogin = this.handleLogin.bind(this);

    if (authService.check()) {
      props.history.push('/myleagues');
    }

    //authService.logout();
  }

  handleLogin(e) {
    e.preventDefault();
    if (authService.login()) {
      this.props.history.push('/myleagues');
    }
  }

  render() {
    return (<div>
      <img className={styles.appLogo} src={logoSmall} alt="Application Logo"/>
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <InputText name="username" placeholder="Username"/>
        <InputText name="password" placeholder="Password" type="password"/>
        <button className={`small ${styles.forgotPassword}`}>Forgot Password</button>
        <div className="fixedBottom">
          <button className="small">Create Account</button>
          <button className="large" type="submit">Sign In</button>
        </div>
      </form>
    </div>)
  }
}

export default Login;
