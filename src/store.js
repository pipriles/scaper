// import COMMANDS from './state/commands.json';
import SELECTORS from './state/selectors.json';
import COMMANDS from './state/commands.json';
import { createStore, combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit';
import uuidv4 from 'uuid/v4';

const activeTab = (state = null, action) => {
  switch(action.type) {
    case 'CHANGE_TAB':
      return action.payload;
    default:
      return state;
  }
}

const defaultValue = {
  "id": null,
  "label": "New Selector",
  "query": "",
  "queryType": "CSS",
  "extractionType": "GET_TEXT",
  "parameters": {
    "stripText": true,
    "elementIndex": 0
  }
}

const selectors = (state = SELECTORS, action) => {
  switch(action.type) {
    case 'ADD_SELECTOR':
      // generate random id
      let newSelector = { ...defaultValue };
      newSelector.id = uuidv4();
      return [ ...state, newSelector ];
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

const commands = createReducer(COMMANDS, {
  'UPDATE_FIELD': (state, action) => {
    const command = state[action.commandId];
    const fields = command.parameters.fields;
    fields[action.fieldId] = { 
      ...fields[action.fieldId], 
      ...action.payload 
    };
  }
});

const reducer = combineReducers({
  activeTab,
  selectors,
  commands
});

export default createStore(reducer);

