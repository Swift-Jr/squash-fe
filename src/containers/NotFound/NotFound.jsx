import React from 'react';

import styles from './styles.module.css';

export class NotFound extends React.Component {
  render() {
    return (<div className={styles.missing}>
      <i className="fas fa-robot fa-6x"></i>
      <p>Ahh fork! Thats not supposed to happen.</p>
    </div>)
  }
}

export default NotFound;
