// import COMMANDS from './state/commands.json';
import { createStore, combineReducers } from 'redux';

import selectors from './reducers/selector';
import fields from './reducers/field';
import commands from './reducers/command';

const activeTab = (state = null, action) => {
  switch(action.type) {
    case 'CHANGE_TAB':
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  activeTab,
  selectors,
  fields,
  commands
});

export default createStore(reducer);

