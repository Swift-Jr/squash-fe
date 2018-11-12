import React from 'react';

import {logoSmall} from './images';

import styles from './styles.module.css';

const InstallPrompt = (props) => {
  const {prompt, appInstalled, onInstall} = props;

  let showPrompt = () => {
    prompt.prompt();
    prompt
      .userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          onInstall();
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
  }

  console.log(prompt);

  return <div className={`container ${styles.installer}`}>
    <header><img className="app-logo" src={logoSmall} alt="Application Logo"/></header>

    <div>
      <img src="/icon128.png" alt="Battre icon"/> {
        appInstalled === -1
          ? <div>
              <h1>App Installed!</h1>
              <p>Launch the App from your device</p>
            </div>
          : <div>
              <h1>Get the experience!</h1>
              <p>Install Battre app to your phone for the best experience!</p>
              <div className="fixedBottom">
                <button className="large" onClick={showPrompt}>
                  <i className="far fa-arrow-alt-circle-down"></i>Install App</button>
              </div>
            </div>
      }
    </div>
  </div>

}

export default InstallPrompt;
