import React from 'react';

import styles from './styles.module.css';

export const InputText = (props) => {
  const inputType = props.type || 'text';
  const className = props.darkStyle
    ? styles.dark
    : null;
  const inputName = props.name || 'input' + Math.rand();
  const value = props.value || '';
  const error = props.error || '';
  const autoComplete = props.autoComplete || 'on';

  return (<div className={styles.inputContainer}>
    {
      props.label
        ? <label>{props.label}</label>
        : null
    }
    {
      value
        ? <input value={value} className={className} name={inputName} type={inputType} placeholder={props.placeholder} onChange={props.onChange} autoComplete={autoComplete}/>
        : <input className={className} name={inputName} type={inputType} placeholder={props.placeholder} onChange={props.onChange} autoComplete={autoComplete}/>
    }
    {
      error
        ? <p className={styles.error}>{error}</p>
        : null
    }
  </div>);
}

export default InputText;
