import React from 'react';
import {withRouter} from "react-router";
import {connect} from 'react-redux';

import {FullModal} from '../../components/FullModal';
import {InputText, InputSelect} from '../../components/Inputs';

import styles from './styles.module.css';

import {leagueService} from '../../services';

export const TopContent = (props) => {
  return (<InputText name="leagueName" value={props.value} onChange={props.onChange} label="Name" placeholder="League Name" autoComplete="off"/>);
}

export const BodyContent = (props) => {
  const sportOptions = [
    {
      value: 1,
      option: 'Squash'
    }
  ];

  const clubOptions = [
    {
      value: null,
      option: 'No Club',
      default: true
    }, {
      value: null,
      option: 'Your club'
    }
  ];

  const inviteOptions = [
    {
      value: 1,
      option: 'Anyone can Join'
    }, {
      value: 0,
      option: 'Requires Invite to Join'
    }
  ];

  return (<div className={styles.bottomContent}>
    {/*<InputSelect darkStyle={true} label="Sport" placeholder="Select a Sport" options={sportOptions}/>
    <InputSelect darkStyle={true} label="Club Association" placeholder="Select an option" options={clubOptions}/>
    <InputSelect darkStyle={true} label="Invite only league?" placeholder="Select an option" options={inviteOptions}/> */
    }
    <InputText name="shortLeagueName" value={props.value} onChange={props.onChange} darkStyle={true} label="Short Name" placeholder="Max 10 characters" maxLength="10" autoComplete="off"/>
    <div className="fixedBottom">
      <button className="large" onClick={props.onSubmit}>Create League</button>
    </div>
  </div>);
}

export class CreateLeagueComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      clubOrLeague: props.clubOrLeague || 1,
      buttonClass: props.buttonClass || 'large',
      buttonTitle: props.buttonTitle || 'Create a league'
    }

    this.handleOnOpen = this
      .handleOnOpen
      .bind(this);
    this.handleOnClose = this
      .handleOnClose
      .bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== nextProps) {
      this.setState(nextProps);
    }
  }

  handleOnClose() {
    const {onClose} = this.state;
    this.setState({
      visible: false
    }, () => onClose && onClose(this.state.visible));
  }

  handleOnOpen() {
    const {onOpen} = this.state;
    this.setState({
      visible: true,
      shortLeagueName: null,
      leagueName: null
    }, () => onOpen && onOpen(this.state.visible));
  }

  handleSubmit = () => {
    this
      .props
      .dispatch(leagueService.actions.create(this.state.leagueName, this.state.shortLeagueName));
  }

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});

    if (name === "leagueName") {
      let shortName = value.substring(0, 8);

      if (value.split(' ').length > 1) {
        shortName = '';
        value
          .split(' ')
          .map(value => shortName = shortName + ' ' + value.substring(0, 4));
        shortName = shortName.trim();
      }

      this.setState({shortLeagueName: shortName});
    }
  }

  getHeadContent = () => {
    return <TopContent onChange={this.handleInputChange} value={this.state.leagueName}></TopContent>;
  }

  getBodyContent = () => {
    return <BodyContent onSubmit={this.handleSubmit} onChange={this.handleInputChange} value={this.state.shortLeagueName}></BodyContent>;
  }

  isVisible = () => {
    return this.props.league.submitted || this.props.league.created === false || this.state.visible;
  }

  render() {
    return (<div>
      <button className={this.state.buttonClass} onClick={this.handleOnOpen}>{this.state.buttonTitle}</button>
      {
        this.isVisible()
          ? <FullModal onClose={this.handleOnClose} headContent={this.getHeadContent()} bodyContent={this.getBodyContent()}></FullModal>
          : null
      }
    </div>);
  }
}

function mapStateToProps(state) {
  const {league} = state;
  return {league};
}

const connectedCreateLeagueComponent = withRouter(connect(mapStateToProps)(CreateLeagueComponent));
export {
  connectedCreateLeagueComponent as CreateLeague
};
