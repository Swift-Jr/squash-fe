import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {authService} from '../services';

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => (<Route {...rest} render={props => (
    authService.check() !== false
    ? <Component {...props}/>
    : <Redirect to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>)}/>);

export default ProtectedRoute;
