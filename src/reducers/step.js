import STEPS from '../constants/steps.json';
import { createReducer } from 'redux-starter-kit';

export default createReducer(STEPS, {
  'ADD_COMMAND': (state, action) => {
    const command = action.payload.id;
    state.push(command);
  },
  'REMOVE_COMMAND': (state, action) => {
    const command = action.payload.id;
    return state.filter((id) => id !== command);
  }
});
