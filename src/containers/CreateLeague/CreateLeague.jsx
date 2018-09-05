import React from 'react';

import Moment from 'react-moment';
//import 'moment-timezone';

import {FullModal} from '../../components/FullModal';
import {InputText} from '../../components/Inputs';

import styles from './styles.module.css';

export const TopContent = (props) => {
  return (<InputText label="Name" placeholder="League Name"/>);
}

export const BodyContent = (props) => {
  return (<div>
    <InputText label="Sport" placeholder="Yes No"/>
    <InputText label="Club Association" placeholder="Yes No"/>
    <InputText label="Free to Join" placeholder="Yes No"/>
    <InputText label="Short Name" placeholder="Yes No"/>
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
    if (this.state != nextProps) {
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
