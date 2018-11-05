import React from 'react';
import {withRouter} from "react-router";
import {connect} from 'react-redux';
//import Moment from 'react-moment';
//import 'moment-timezone';

import {FullModal} from '../../components/FullModal';
import {InputText} from '../../components/Inputs';

import {clubService} from '../../services';

import styles from './styles.module.css';

export const BodyContent = (props) => {
  return (<div>
    <ul className={styles.clubSteps}>
      <li>
        <span>1</span>Create a Club</li>
      <li>
        <span>2</span>Setup a League</li>
      <li>
        <span>3</span>Invite your friends</li>
      <li>
        <span>4</span>Play!</li>
    </ul>
    <div className="fixedBottom">
      <button className="large" onClick={props.onSubmit} disabled={props.loading}>Create Club</button>
    </div>
  </div>);
}
export class CreateClubComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      clubOrLeague: props.clubOrLeague || 1,
      buttonClass: props.buttonClass || 'large',
      buttonTitle: props.buttonTitle || 'Create a club'
    }

    this.handleOnOpen = this
      .handleOnOpen
      .bind(this);
    this.handleOnClose = this
      .handleOnClose
      .bind(this);

    this.getHeadContent = this
      .getHeadContent
      .bind(this);
    this.getBodyContent = this
      .getBodyContent
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
      clubname: null
    }, () => onOpen && onOpen(this.state.visible));
  }

  handleSubmit = () => {
    this
      .props
      .dispatch(clubService.actions.create(this.state.clubname));
  }

  onChangeName = e => {
    this.setState({clubname: e.target.value});
  }

  getHeadContent = () => {
    return <InputText value={this.state.clubname} label="Name" placeholder="Club Name" onChange={this.onChangeName} autoComplete="off"/>;
  }

  getBodyContent = () => {
    return <BodyContent onSubmit={this.handleSubmit} loading={this.props.club.submitted}></BodyContent>;
  }

  isVisible = () => {
    return this.props.club.submitted || this.props.club.created === false || this.state.visible;
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
  const {club} = state;
  return {club};
}

const connectedCreateClubComponent = withRouter(connect(mapStateToProps)(CreateClubComponent));
export {
  connectedCreateClubComponent as CreateClub
};
