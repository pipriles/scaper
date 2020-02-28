import COMMANDS from '../constants/commands.json';
import { createReducer } from 'redux-starter-kit';

export default createReducer(COMMANDS, {
  'ADD_FIELD': (state, action) => {
    const command = state[action.command];
    command.parameters.fields.push(action.payload.id);
  },
  'REMOVE_FIELD': (state, action) => {
    const command = state[action.command];
    const distint = (id) => id !== action.id;
    const fields  = command.parameters.fields.filter(distint);
    command.parameters.fields = fields;
  },
  'ADD_COMMAND': (state, action) => {
    const command = action.payload.id;
    state[command] = action.payload;
  },
  'REMOVE_COMMAND': (state, action) => {
    const command = action.payload.id;
    delete state[command];
  }
});

