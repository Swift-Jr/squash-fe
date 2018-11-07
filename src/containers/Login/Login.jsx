import React from 'react';
import GoogleLogin from 'react-google-login';

import {connect} from 'react-redux';

import {authService, alerts} from '../../services';
import {InputText} from '../../components/Inputs';

import {logoSmall} from '../App/images';
import styles from './styles.module.css';

//TODO: Move to history service
//import {createBrowserHistory} from 'history';
//const history = createBrowserHistory();

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.func) {
      switch (this.props.match.params.func) {
        case 'out':
          this
            .props
            .dispatch(authService.logout());
          break;
        default:

      }
    }
    if (authService.check()) {
      props
        .history
        .push(props.user.forward);
    }

    this.state = {
      email: null,
      password: null
    }

  }

  googleLoginSuccess = (data) => {
    const {dispatch} = this.props;

    dispatch(authService.googleLogin(data));
  }

  googleLoginFailure = (data) => {
    const {dispatch} = this.props;
    dispatch(alerts.actions.bad('Hmm... Google login failed!'));
  }

  handleLogin = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const {dispatch} = this.props;

    //if (email && password) {
    dispatch(authService.login(email, password));
    //}
  }

  handleCreate = (e) => {
    e.preventDefault();
    this
      .props
      .history
      .push('/account/create');
  }

  handleForgot = (e) => {
    e.preventDefault();
    this
      .props
      .history
      .push('/account/forgot');
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render = () => {
    const {user} = this.props;
    const {email, password} = this.state;

    const userInputError = user.loginSubmitted && !email
      ? 'Email is required'
      : null;

    const passInputError = user.loginSubmitted && !password
      ? 'Password is required'
      : null;

    return <div>
      <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
      <div className={styles.googleLogin}>
        <GoogleLogin clientId="474168737882-6eb001ad86fc66ktc0dkvhopsedfc203.apps.googleusercontent.com" isSignedIn={true} onSuccess={this.googleLoginSuccess} onFailure={this.googleLoginFailure}>
          <i className="fab fa-google"></i>
          <span>Sign in with Google</span>
        </GoogleLogin>
        <span className={styles.or}>or</span>
      </div>
      <form className={styles.loginForm} onSubmit={this.handleLogin}>
        <InputText value={this.state.email} error={userInputError} name="email" placeholder="Email" onChange={this.onInputChange}/>
        <InputText value={this.state.password} error={passInputError} name="password" placeholder="Password" type="password" onChange={this.onInputChange} autoComplete="current-password"/>
        <button className={`small ${styles.forgotPassword}`} onClick={this.handleForgot}>Forgot Password</button>
        <div className="fixedBottom">
          <button className="small" onClick={this.handleCreate}>Create Account</button>
          <button className="large" onClick={this.handleLogin} disabled={user.loggingIn}>{
              user.loggingIn
                ? <i className="fas fa-spinner fa-spin"></i>
                : <span>Sign In</span>
            }</button>
        </div>
      </form>
    </div>
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {user};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {
  connectedLoginPage as Login
};
