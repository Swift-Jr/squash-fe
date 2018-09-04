import React from 'react';

import styles from './styles.module.css';

export const InputText = (props) => {
  return (<input type="text" placeholder={props.placeholder} onChange={props.onChange}/>);
}

export default InputText;
