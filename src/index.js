import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import store from './store.js';
import App from './App';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary:   { main: "#1e2127" },
    secondary: { main: "#282c34" }
  },
})

console.log(theme);

ReactDOM.render(
  <Provider store={ store }>
    <ThemeProvider theme={ theme }>
      <App />
    </ThemeProvider>
  </Provider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
