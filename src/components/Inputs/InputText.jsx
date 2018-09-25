import React from 'react';

import styles from './styles.module.css';

export const InputText = (props) => {
  const inputType = props.type || 'text';
  const className = props.darkStyle
    ? styles.dark
    : null;

  return (<div className={styles.inputContainer}>
    {
      props.label
        ? <label>{props.label}</label>
        : null
    }
    <input className={className} type={inputType} placeholder={props.placeholder} onChange={props.onChange}/>
  </div>);
}

export default InputText;
