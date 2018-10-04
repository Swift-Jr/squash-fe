import React from 'react';

import {iconChevronLeft, iconClear} from './images';
import {logoSmall} from '../../containers/App/images';

import styles from './styles.module.css';

export class FullModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headContent: props.headContent,
      modalTitle: props.title || 'Title',
      bodyContent: props.bodyContent,
      animationStyle: null,
      onClose: props.onClose || null,
      onBack: props.onBack || null
    }

    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
  }

  componentDidMount() {
    this.setState({animationStyle: 'slideInUp'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.close === true) {
      return this.handleOnClose();
    }
    if (this.state !== nextProps) {
      this.setState(nextProps);
    }
  }

  handleOnClose() {
    this.setState({animationStyle: 'slideOutDown'});

    const {onClose} = this.props;

    setTimeout(() => onClose && onClose(), 500);
  }

  handleOnBack() {
    const {onBack} = this.props;
    onBack && onBack();
  }

  render() {
    return (<div className={`container animated ${styles.wrapper} ${this.state.animationStyle}`}>
      <div className={`row ${styles.topContent}`}>
        {
          this.state.onBack
            ? <div className='col-xs-2' onClick={this.handleOnBack}>
                <img src={iconChevronLeft} alt="Back Button"/>
              </div>
            : <div className='col-xs-2'></div>
        }
        <div className='col-xs-8'></div>
        <div className='col-xs-2' onClick={this.handleOnClose}>
          <img className={styles.closeIcon} src={iconClear} alt="Close Button"/>
        </div>

        <div className="col-xs-12">
          <img className={styles.appLogo} src={logoSmall} alt="Application Logo"/>
        </div>
        <div className="col-xs-12">
          {
            this.state.headContent
              ? this.state.headContent
              : <h1>{this.state.modalTitle}</h1>
          }
        </div>
      </div>
      <div className={styles.bodyContent}>
        {this.state.forcedUpdate}
        {this.state.bodyContent}
      </div>
    </div>);
  }
}

export default FullModal;
