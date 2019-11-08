import { createReducer } from 'redux-starter-kit';
import FIELDS from '../constants/fields.json';

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

