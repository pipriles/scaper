import FIELDS from '../defaults/fields.json';
import { createReducer } from 'redux-starter-kit';

export default createReducer(FIELDS, {
  'ADD_FIELD': (state, action) => {
    state[action.payload.id] = { ...action.payload };
  },
  'REMOVE_FIELD': (state, action) => {
    delete state[action.id];
  },
  'UPDATE_FIELD': (state, action) => {
    const field = state[action.payload.id]
    state[action.payload.id] = { ...field, ...action.payload };
  }
});

