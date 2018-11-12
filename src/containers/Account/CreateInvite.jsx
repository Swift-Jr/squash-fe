import React from 'react';
import GoogleLogin from 'react-google-login';

import {logoSmall} from '../App/images';
import {InputText} from '../../components/Inputs';

import styles from './styles.module.css';
import googleIcon from '../App/images/google-icon.png';

export const CreateInvite = props => (<div>
  <img className="appLogoExternal shorter" src={logoSmall} alt="Application Logo"/>
  <form>
    <div className={styles.googleLogin}>
      <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} isSignedIn={true} onSuccess={props.googleLoginSuccess} onFailure={props.googleLoginFailure} style={{}}>
        <img src={googleIcon} alt="Google logo"/>
        <span>Register with Google</span>
      </GoogleLogin>
      <span className={styles.or}>or</span>
    </div>
    {
      props.action === 'invite'
        ? <p>Enter some details to accept your invite!</p>
        : null
    }
    <InputText disabled={props.state.invite && props.state.email === props.state.invite.email} value={props.state.email} name="email" placeholder="E-mail" onChange={props.handleInputChange}/>
    <InputText value={props.state.firstname} name="firstname" placeholder="Firstname" onChange={props.handleInputChange}/>
    <InputText value={props.state.lastname} name="lastname" placeholder="Lastname" onChange={props.handleInputChange}/>
    <InputText value={props.state.password} name="password" placeholder="Password" type="password" onChange={props.handleInputChange} autoComplete="new-password"/>

    <div className="fixedBottom">
      <button className="small" onClick={props.handleSignin}>Already have an account?</button>
      <button className="large" onClick={props.handleCreate}>Create Account</button>
    </div>
  </form>
</div>);

export default CreateInvite;
