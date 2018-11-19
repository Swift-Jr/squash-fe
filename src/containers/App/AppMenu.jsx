import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TouchEvent from '../../system/TouchEvent';
import {withRouter} from "react-router";
import {connect} from 'react-redux';

import {PlayMatch} from '../PlayMatch';

import {iconMenu} from './images';

export class AppMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    }
  }

  toggleMenu = () => {
    const {onToggle} = this.props;
    this.setState({
      visible: !this.state.visible
    }, () => onToggle && onToggle(this.state.visible));
  }

  handleLinkClick = (e) => {
    //this.setState({visible: false});
    //this.toggleMenu();
  }

  swipeLocations = ['/myleagues', '/results', '/headtohead', '/scorecard'];

  handleSwipeNavigation = (event) => {
    const {history, location} = this.props;

    const pathNo = this
      .swipeLocations
      .indexOf(
        location.pathname === '/'
        ? '/myleagues'
        : location.pathname);

    console.log(pathNo);

    switch (pathNo) {
      case - 1:
        return;
      case 3:
        return history.push(this.swipeLocations[0]);
      default:
        return history.push(this.swipeLocations[pathNo + 1]);
    }
  }

  render() {
    const {visible} = this.state;

    return (<TouchEvent onSwipeLeft={this.handleSwipeNavigation} onSwipeRight={this.handleSwipeNavigation} onSwipeDown={this.toggleMenu} onSwipeUp={this.toggleMenu} onTap={this.toggleMenu}>
      <nav>
        <ul className={visible
            ? 'showMenu'
            : 'hideMenu'}>
          <li>
            <Link to="/myleagues" onClick={this.handleLinkClick}>My Leagues</Link>
          </li>
          <li>
            <Link to="/results" onClick={this.handleLinkClick}>Results</Link>
          </li>
          <li>
            <Link to="/headtohead" onClick={this.handleLinkClick}>Head to Head</Link>
          </li>
          <li>
            <Link to="/scorecard" onClick={this.handleLinkClick}>Scorecard</Link>
          </li>
        </ul>
        <img src={iconMenu} alt="Menu Toggle"/> {
          visible
            ? <div className={`fixedBottom play-match reverseVisible`}>
                <PlayMatch onClose={() => this.toggleMenu()}></PlayMatch>
              </div>
            : null
        }
      </nav>
    </TouchEvent>)
  }
}

AppMenuComponent.propTypes = {
  visible: PropTypes.bool,

  onToggle: PropTypes.func
}

AppMenuComponent.propDefaults = {
  visible: false,
  onToggle: (state) => {}
}

function mapStateToProps(state) {
  return {};
}

const connectedAppMenu = withRouter(connect(mapStateToProps)(AppMenuComponent));
export {
  connectedAppMenu as AppMenu
};

//export default AppMenu;