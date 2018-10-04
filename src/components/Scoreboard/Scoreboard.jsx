import React from 'react';
import CountUp from 'react-countup';

import styles from './styles.module.css';

export const Scoreboard = (props) => {
  const {
    forName,
    forPoints,
    againstName,
    againstPoints,
    centreName,
    colorChange
  } = props;

  const colorInvert = props.colorInvert === true
    ? styles.invert
    : null;

  const pointTotal = parseInt(forPoints, 10) + parseInt(againstPoints, 10);
  const forPercent = Math.floor((100 / pointTotal) * forPoints);
  const againstPercent = 100 - forPercent;

  const swapColor = colorChange && againstPercent > forPercent
    ? styles.swap
    : null;

  return <div>
    <div className={styles.bar}>
      <div className={`${styles.for} ${swapColor} ${colorInvert}`} style={{
          width: forPercent + '%'
        }}></div>
      <div className={`${styles.against} ${swapColor} ${colorInvert}`} style={{
          width: againstPercent + '%'
        }}></div>
    </div>
    <div className={styles.detail}>
      <div className={styles.for}>
        <div className={styles.number}>
          <CountUp end={forPoints} duration={2}></CountUp>
        </div>
        <div className={styles.text}>{forName}</div>
      </div>
      <div className={styles.against}>
        <div className={styles.text}>{againstName}</div>
        <div className={styles.number}>
          <CountUp end={againstPoints} duration={2}></CountUp>
        </div>
      </div>
      {
        centreName
          ? <div className={styles.centreText}>
              <p>{centreName}</p>
            </div>
          : null
      }
    </div>
  </div>
}
