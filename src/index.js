import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

import {App} from './containers/App';

import registerServiceWorker from './system/registerServiceWorker';

ReactDOM.render(<BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
