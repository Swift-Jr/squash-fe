import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux'

import store from './system/store';
import history from './system/history';

import {App} from './containers/App';

import registerServiceWorker from './system/registerServiceWorker';

import './index.css';

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <App/>
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
