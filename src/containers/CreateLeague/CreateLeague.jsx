import React from 'react';

import {FullModal} from '../../components/FullModal';
import {InputText, InputSelect} from '../../components/Inputs';

import styles from './styles.module.css';

export const TopContent = (props) => {
  return (<InputText label="Name" placeholder="League Name"/>);
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
    <InputSelect darkStyle={true} label="Sport" placeholder="Select a Sport" options={sportOptions}/>
    <InputSelect darkStyle={true} label="Club Association" placeholder="Select an option" options={clubOptions}/>
    <InputSelect darkStyle={true} label="Invite only league?" placeholder="Select an option" options={inviteOptions}/>
    <InputText darkStyle={true} label="Short Name" placeholder="Max 10 characters"/>
    <div className="fixedBottom">
      <button className="large">Create League</button>
    </div>
  </div>);
}

export class CreateLeague extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      clubOrLeague: props.clubOrLeague || 1,
      buttonClass: props.buttonClass || 'large',
      buttonTitle: props.buttonTitle || 'Create a league'
    }

    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);

    this.getHeadContent = this.getHeadContent.bind(this);
    this.getBodyContent = this.getBodyContent.bind(this);
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
      visible: true
    }, () => onOpen && onOpen(this.state.visible));
  }

  getHeadContent() {
    return <TopContent></TopContent>;
  }

  getBodyContent() {
    return <BodyContent></BodyContent>;
  }

  render() {
    return (<div>
      <button className={this.state.buttonClass} onClick={this.handleOnOpen}>{this.state.buttonTitle}</button>
      {
        this.state.visible
          ? <FullModal onClose={this.handleOnClose} headContent={this.getHeadContent()} bodyContent={this.getBodyContent()}></FullModal>
          : null
      }
    </div>);
  }
}

export default CreateLeague;
