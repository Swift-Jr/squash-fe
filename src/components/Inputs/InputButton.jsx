import React from "react";

import styles from "./styles.module.css";

export const InputButton = props => {
  const className = props.className || "large";
  const onClick = props.onClick || null;
  const isLoading = props.isLoading || false;
  const disabled = props.disabled || isLoading || false;

  return (<button className={`${className} ${styles.button}`} onClick={onClick} disabled={disabled}>
    {
      isLoading
        ? (<i className="fas fa-spinner fa-spin"/>)
        : (<span>{props.children}</span>)
    }
  </button>);
};

export default InputButton;
