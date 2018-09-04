import React from 'react';

import Moment from 'react-moment';
//import 'moment-timezone';

import {FullModal} from '../../components/FullModal';
import {InputText} from '../../components/Inputs';

import styles from './styles.module.css';

export const TopContent = (props) => {
  return (<div className={styles.searchBar}>
    <InputText placeholder={`Find a ${props.noun}`} onChange={props.onChange}/>
  </div>);
}

export const ListItems = (props) => {
  return props.options.map((option) => <li className={`animated ${option.optionVisibility
      ? 'slideInDown' + styles.optionVisible
      : 'slideOutUp ' + styles.optionHidden}`}>
    <i className="fas fa-plus-square fa-2x"></i>
    <p className={styles.optionTitle}>{option.title}</p>
    <p className={styles.optionDetail}>Active since&nbsp;
      <Moment format="MMM YYYY">{option.created}</Moment>, {option.players}&nbsp;players</p>
  </li>);
}

export const BodyContent = (props) => {
  const filterValue = props.filterValue.toLowerCase();

  /*const filteredOptions = props.options.filter((option) => {
    return !filterValue || option.title.toLowerCase().indexOf(filterValue) >= 0;
  });*/

  var visibleOptions = 0;

  const filteredOptions = props.options.map((option) => {
    !filterValue || option.title.toLowerCase().indexOf(filterValue) >= 0
      ? option.optionVisibility = 1
      : option.optionVisibility = 0;
    visibleOptions += option.optionVisibility;
    return option;
  });

  return (<div>
    <ul className={styles.optionList}>
      {
        visibleOptions
          ? <ListItems options={filteredOptions}></ListItems>
          : <li className={styles.optionTitle}>Nothing found :(</li>
      }
    </ul>
    <div className={`fixedBottom ${styles.addOption}`}>Create a new {props.noun}</div>
  </div>);
}

export class JoinLeagueClub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false,
      clubOrLeague: props.clubOrLeague || 1,
      buttonClass: props.buttonClass,
      buttonTitle: props.buttonTitle,
      filterValue: '',
      options: [
        {
          id: 1,
          players: 5,
          title: 'Something',
          created: '2018-08-08T12:30:12.123'
        }, {
          id: 2,
          players: 6,
          title: 'Else',
          created: '2018-07-08T12:30:12.123'
        }, {
          id: 3,
          players: 2,
          title: 'And',
          created: '2018-08-19T12:30:12.123'
        }
      ]
    }

    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getNoun = this.getNoun.bind(this);

    this.getHeadContent = this.getHeadContent.bind(this);
    this.getBodyContent = this.getBodyContent.bind(this);
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

  handleOnChange(e) {
    this.setState({filterValue: e.target.value});
  }

  getNoun() {
    return this.state.clubOrLeague === 1
      ? 'club'
      : 'league';
  }

  getHeadContent() {
    return <TopContent noun={this.getNoun()} onChange={this.handleOnChange}></TopContent>;
  }

  getBodyContent() {
    return <BodyContent noun={this.getNoun()} options={this.state.options} filterValue={this.state.filterValue}></BodyContent>;
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

export default JoinLeagueClub;
