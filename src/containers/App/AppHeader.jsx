import React from 'react';
import {iconSettings, logoSmall} from './images';

const AppHeader = ({username, clubname}) => {
  return (<header className="row">
    <div id="topBar">
      <p className="name col-xs-10">{username}<span>{clubname}</span>
      </p>
      <p className="settings col-xs-2"><img src={iconSettings} alt="Settings Menu"/></p>
    </div>
    <img className="app-logo" src={logoSmall} alt="Application Logo"/>
  </header>)
}

export default AppHeader;
