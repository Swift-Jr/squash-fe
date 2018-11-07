import React from "react";
import {connect} from "react-redux";

import {InputText, InputButton} from "../../components/Inputs";
import userService from "../../services/user";

export class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: props.profile,
      isSaving: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({isSaving: nextProps.isSaving});
  }

  onInputChange = e => {
    const {name, value} = e.target;
    this.setState({
      profile: {
        ...this.state.profile,
        [name]: value
      }
    });
  };

  onSubmit = e => {
    const {dispatch} = this.props;
    const {profile} = this.state;
    const updateValues = {
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email
    }
    dispatch(userService.actions.updateProfile(updateValues));
  }

  render() {
    const {profile} = this.state;
    const isDisabled = profile.google_id
      ? true
      : false;
    const isSaving = this.state.isSaving;
    const missingValues = profile.email === '' || profile.firstname === '' || profile.lastname === '';

    return (<div>
      <h1>Your Profile</h1>
      {isDisabled && <h3>Your profile is managed by Google</h3>}
      <InputText name="email" label="Email" value={profile.email} disabled={isDisabled} onChange={this.onInputChange}/>
      <InputText name="firstname" label="First name" value={profile.firstname} disabled={isDisabled} onChange={this.onInputChange}/>
      <InputText name="lastname" label="Last name" value={profile.lastname} disabled={isDisabled} onChange={this.onInputChange}/>
      <div className="fixedBottom">
        <InputButton className="large" onClick={this.onSubmit} disabled={isDisabled || missingValues} isLoading={isSaving}>
          Save Profile
        </InputButton>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {profile: state.user.profile, isSaving: state.user.request.submitted};
}

const connectedProfileComponent = connect(mapStateToProps)(ProfileComponent);
export {
  connectedProfileComponent as Profile
};
