import React from 'react';

import styles from './styles.module.css';

export class InputText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationError: false
    }
  }

  validateInput = (event) => {
    let message = null;

    if (!event.currentTarget.validity.valid) {
      message = event.currentTarget.validationMessage
    }

    this.setState({
      validationError: message
    }, () => this.checkIfValid());
  }

  validateOnChange = (event) => {
    if (!this.getError()) {
      let eventToPass = {
        ...event
      };

      clearTimeout(this.timer);

      this.timer = setTimeout(() => this.validateInput(eventToPass), 750);
    } else {
      this.validateInput(event);
    }
  }

  getError = () => {
    return this.props.error || this.state.validationError || false;
  }

  checkIfValid = () => {
    this.props.isValid && this
      .props
      .isValid(!this.getError());
  }

  render = () => {
    let inputProps = {
      type: this.props.type || 'text',
      name: this.props.name || null,
      autoComplete: this.props.autoComplete || 'on',
      disabled: this.props.disabled || false,
      value: this.props.value || null,
      placeholder: this.props.placeholder || null,
      className: this.props.darkStyle
        ? styles.dark
        : null,
      onChange: this.props.onChange,
      onBlur: this.validateInput,
      onKeyDown: this.validateOnChange
    };

    if (this.props.maxLength) {
      inputProps.maxLength = this.props.maxLength;
    }

    return <div className={`${styles
        .inputContainer} ${this
        .getError()
          ? styles.invalidInput
          : null}`}>
      {
        this.props.label
          ? <label>{this.props.label}</label>
          : null
      }
      {React.createElement('input', inputProps)}
      {
        this.getError()
          ? <p className={styles.error}>{this.getError()}</p>
          : null
      }
    </div>
  };
}

export default InputText;
