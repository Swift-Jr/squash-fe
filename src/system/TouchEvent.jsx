import React from 'react';
import PropTypes from 'prop-types';

class TouchEvent extends React.Component {
  defaultEvent = null;

  currentX = 0;
  currentY = 0;

  startX = 0;
  startY = 0;

  isLongPress = false;
  touchStarted = false;
  touchMoved = false;
  swipeOutBounded = false;

  timeout = undefined;

  state = {
    touch: true,
    offsetX: 0,
    offsetY: 0
  };

  componentDidMount() {
    try {
      document.createEvent('TouchEvent');
    } catch (e) {
      this.setState({touch: false});
    }
  }

  componentWillUnmount() {
    this.cancelTimeout();
  }

  addScrollEventListener() {
    if (!this.hasSwipeEvents()) 
      return;
    document.addEventListener('touchstart', this.scrollEventListener, {passive: false});
    document.addEventListener('touchmove', this.scrollEventListener, {passive: false});
  }

  scrollEventListener(event) {
    event.preventDefault();
  }

  removeScrollEventListener() {
    setTimeout(() => {
      document.removeEventListener('touchstart', this.scrollEventListener);
      document.removeEventListener('touchmove', this.scrollEventListener);
    }, 1000);
  }

  startTimeout = () => {
    const {holdTolerance} = this.props;
    this.timeout = setTimeout(this.handleLongPressed, holdTolerance);
  };

  cancelTimeout = () => {
    clearTimeout(this.timeout);
  };

  hasSwipeEvents = () => {
    return typeof this.props.onSwipe === 'function' || typeof this.props.onSwipeUp === 'function' || typeof this.props.onSwipeDown === 'function' || typeof this.props.onSwipeLeft === 'function' || typeof this.props.onSwipeRight === 'function';
  }

  handleLongPressed = () => {
    this.isLongPress = true;
    if (typeof this.props.onLongPress === 'function' && this.touchMoved === false) {
      this
        .props
        .onLongPress();
    }
  };

  handleTouchStart = (event) => {
    if (this.touchStarted) {
      return;
    }

    this.addScrollEventListener();

    this.startTimeout();

    this.isLongPress = false;
    this.touchStarted = true;
    this.touchMoved = false;
    this.swipeOutBounded = false;

    this.startX = getXFromEvent(event);
    this.startY = getYFromEvent(event);

    this.currentX = 0;
    this.currentY = 0;

    if (typeof this.props.onTouchStart === 'function') {
      this
        .props
        .onTouchStart(event);
    }
  };

  handleTouchMove = (event) => {
    this.currentX = getXFromEvent(event);
    this.currentY = getYFromEvent(event);

    if (!this.touchMoved) {
      const tapTolerance = this.props.tapTolerance;

      this.touchMoved = Math.abs(this.startX - this.currentX) > tapTolerance || Math.abs(this.startY - this.currentY) > tapTolerance;

    } else if (!this.swipeOutBounded) {
      const swipeOutBounded = this.props.swipeTolerance;

      this.swipeOutBounded = Math.abs(this.startX - this.currentX) > swipeOutBounded && Math.abs(this.startY - this.currentY) > swipeOutBounded;
    }

    if (this.props.swipeDragEnabled) {
      let directionAndDistance = this.calculateDirectionAndDistance();

      let {direction, distance} = directionAndDistance;

      switch (direction) {
        case TouchEvent.SWIPE_UP:
          this.setState({
            offsetY: -distance
          });
          break;
        case TouchEvent.SWIPE_DOWN:
          this.setState({offsetY: distance});
          break;
        case TouchEvent.SWIPE_LEFT:
          this.setState({
            offsetX: -distance
          });
          break;
        case TouchEvent.SWIPE_RIGHT:
          this.setState({offsetX: distance});
          break;
        default:

      }

    }

    if (typeof this.props.onTouchMove === 'function') {
      this
        .props
        .onTouchMove(event);
    }
  };

  handleTouchCancel = (event) => {
    this.touchStarted = this.touchMoved = false;
    this.startX = this.startY = 0;

    this.handleTouchFinal();

    if (typeof this.props.onTouchCancel === 'function') {
      this
        .props
        .onTouchCancel(event);
    }
  };

  handleTouchEnd = (event) => {
    this.handleTouchFinal();

    this.touchStarted = false;

    if (this.touchMoved === false && this.isLongPress === false) {
      if (typeof this.props.onTap === 'function') {
        this
          .props
          .onTap(event);
      }

    } else if (!this.swipeOutBounded && this.isLongPress === false && this.hasSwipeEvents()) {
      let directionAndDistance = this.calculateDirectionAndDistance();
      let {direction, distance} = directionAndDistance;

      if (typeof this.props.onSwipe === 'function') {
        this
          .props
          .onSwipe(direction, event, distance);
      }

      if (direction === TouchEvent.SWIPE_RIGHT && typeof this.props.onSwipeRight === 'function') {
        this
          .props
          .onSwipeRight(event, distance);
      }

      if (direction === TouchEvent.SWIPE_LEFT && typeof this.props.onSwipeLeft === 'function') {
        this
          .props
          .onSwipeLeft(event, distance);
      }

      if (direction === TouchEvent.SWIPE_UP && typeof this.props.onSwipeUp === 'function') {
        this
          .props
          .onSwipeUp(event, distance);
      }

      if (direction === TouchEvent.SWIPE_DOWN && typeof this.props.onSwipeDown === 'function') {
        this
          .props
          .onSwipeDown(event, distance);
      }
    }

    if (typeof this.props.onTouchEnd === 'function') {
      this
        .props
        .onTouchEnd(event);
    }
  };

  handleTouchFinal = () => {
    this.cancelTimeout();
    this.removeScrollEventListener();
    this.setState({offsetX: 0, offsetY: 0})
  }

  calculateDirectionAndDistance = () => {
    let swipeOutBounded = this.props.swipeTolerance,
      direction,
      distance;

    if (Math.abs(this.startX - this.currentX) < swipeOutBounded) {
      distance = Math.abs(this.startY - this.currentY);
      direction = this.startY > this.currentY
        ? TouchEvent.SWIPE_UP
        : TouchEvent.SWIPE_DOWN;

    } else {
      distance = Math.abs(this.startX - this.currentX);
      direction = this.startX > this.currentX
        ? TouchEvent.SWIPE_LEFT
        : TouchEvent.SWIPE_RIGHT;
    }

    return {direction, distance};
  }

  renderChild = (child) => {
    if (child === false || child === null || child === undefined) {
      return child;
    }

    let offsetStyle = {};
    if (this.props.swipeDragEnabled) {
      offsetStyle.marginLeft = this.state.offsetX;
      offsetStyle.marginTop = this.state.offsetY;
    }

    const newProps = {
      onContextMenu: e => e.preventDefault(),
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchCancel: this.handleTouchCancel,
      onTouchEnd: this.handleTouchEnd,
      style: {
        ...child.props.style,
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        ...offsetStyle
      }
    };

    return React.cloneElement(child, {
      ...child.props,
      ...newProps
    });
  }

  render() {
    const {children, disabled} = this.props;
    const {touch} = this.state;

    if (!touch || disabled) {
      return children;
    }

    const childrenEL = Array.isArray(children)
      ? children
      : [children];

    return React
      .Children
      .map(childrenEL, this.renderChild);
  }
}

TouchEvent.SWIPE_UP = '@TouchEvent/swipe/up';
TouchEvent.SWIPE_DOWN = '@TouchEvent/swipe/down';
TouchEvent.SWIPE_LEFT = '@TouchEvent/swipe/left';
TouchEvent.SWIPE_RIGHT = '@TouchEvent/swipe/right';

TouchEvent.defaultProps = {
  tapTolerance: 10,
  swipeTolerance: 100,
  holdTolerance: 500,
  disabled: false,
  swipeDragEnabled: false
};

TouchEvent.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  tapTolerance: PropTypes.number,
  swipeTolerance: PropTypes.number,
  holdTolerance: PropTypes.number,
  onTap: PropTypes.func,
  onLongPress: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onSwipe: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func
};

function getXFromEvent(event) {
  return event
    .touches[0]
    .clientX;
}

function getYFromEvent(event) {
  return event
    .touches[0]
    .clientY;
}

export default TouchEvent;
