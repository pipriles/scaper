/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

const filterTypes = { windowTypes: ["normal"] }
const focusWindow = (id) => {
  if ( id <= 0 ) return;
  store.dispatch({ type: 'FOCUS_WINDOW', payload: id });
}

chrome.windows.onFocusChanged.addListener(focusWindow, filterTypes);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
