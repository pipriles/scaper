// import COMMANDS from './state/commands.json';
import SELECTORS from './state/selectors.json';
import COMMANDS from './state/commands.json';
import { createStore, combineReducers } from 'redux';

const activeTab = (state = null, action) => {
  switch(action.type) {
    case 'CHANGE_TAB':
      return action.payload;
    default:
      return state;
  }
}

const selectors = (state = SELECTORS, action) => {
  switch(action.type) {
    case 'ADD_SELECTOR':
      // merge with default structure?
      return [ ...state, action.payload ]
    case 'REMOVE_SELECTOR':
      return state.filter(s => s.id !== action.payload.id);
    case 'UPDATE_SELECTOR':
      let id = action.id;
      return state.map( 
        s => (s.id !== id) ? s : { ...s, ...action.payload });
    default:
      return state
  }
};

const commands = (state = COMMANDS, action) => {
  return state;
};

const reducer = combineReducers({
  activeTab,
  selectors,
  commands
});

export default createStore(reducer);
