import React from 'react';
import {logoSmall} from '../App/images';
import {InputText} from '../../components/Inputs';

export const CreateInvite = props => (<div>
  <img className="appLogoExternal" src={logoSmall} alt="Application Logo"/>
  <form>
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
