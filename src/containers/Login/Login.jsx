import React from 'react';

export class Login extends React.Component {
  render() {
    return (<div>
      <img className="app-logo" src="/logo-small.png"/>
      <form>
        <input name="username" placeholder="Username"/>
        <input name="password" placeholder="Password"/>
        <span>Forgot Password</span>
        <span>Create Account</span>
        <button>Sign In</button>
      </form>
    </div>)
  }
}

export default Login;
