import React from 'react';

import styles from './styles.module.css';

export const InputSelect = (props) => {
  const className = props.darkStyle
    ? styles.dark
    : null;

  const {options, selected} = props;

  return (<div className={styles.inputContainer}>
    {
      props.label
        ? <label>{props.label}</label>
        : null
    }
    <select value={selected} className={className} placeholder={props.placeholder} onChange={props.onChange}>
      <SelectOptions options={options}></SelectOptions>
    </select>
  </div>);
}

export const SelectOptions = (props) => {
  return props
    .options
    .map((option) => <option key={option.value} value={option.value} selected={props.default}>{option.option}</option>);
}

export default InputSelect;
