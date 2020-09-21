import { createStore, combineReducers } from 'redux';

import fields from './reducers/field';
import commands from './reducers/command';
import steps from './reducers/step';

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
  fields,
  commands,
  steps
});

export default createStore(reducer);
