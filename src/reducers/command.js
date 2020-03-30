import COMMANDS from '../defaults/commands.json';
import PARAMETERS from '../defaults/parameterTypes.json';
import COMMAND_TYPES from '../constants/commandTypes.json';
import { createReducer } from 'redux-starter-kit';
import _ from 'lodash';

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

    if ( !COMMAND_TYPES.hasOwnProperty(type) )
      return;

    // Set default parameters values
    console.log(COMMAND_TYPES, type, action)
    
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

    console.log(action);

    // not sure if immer does the magic here
    const parameters = state[command].parameters;

    if ( _.isPlainObject( parameters[type] ) )
      parameters[type] = { ...parameters[type], ...value };
    else
      parameters[type] = value;

  }
});

