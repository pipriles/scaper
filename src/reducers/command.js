import COMMANDS from '../defaults/commands.json';
import PARAMETERS from '../defaults/parameterTypes.json';
import COMMAND_TYPES from '../constants/commandTypes.json';
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
  },
  'UPDATE_COMMAND_TYPE': (state, action) => {

    const command = action.payload.id;
    const type = action.payload.commandType;

    // Set default parameters values
    
    const parameters = COMMAND_TYPES[type].reduce((obj, type) => {
      obj[type] = PARAMETERS[type];
      return obj
    }, {});


    state[command].commandType = type;
    state[command].parameters  = parameters;

  },
  'UPDATE_COMMAND_PARAMETER': (state, action) => {

    const command = action.payload.id;
    const type    = action.payload.parameter;
    const value   = action.payload.value;

    // not sure if immer does the magic here
    const parameters = state[command].parameters;
    parameters[type] = { ...parameters[type], ...value };

  }
});

