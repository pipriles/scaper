import SELECTORS from '../constants/selectors.json';

export default (state = SELECTORS, action) => {
  let id;
  switch(action.type) {
    case 'ADD_SELECTOR':
      id = action.payload.id;
      return { ...state, [id]: action.payload };
    case 'REMOVE_SELECTOR':
      id = action.payload.id;
      const { [id]: ignore, ...other } = state; 
      return other;
    case 'UPDATE_SELECTOR':
      id = action.payload.id;
      return {
        ...state, 
        [id]: { ...state[id], ...action.payload }
      }
    default:
      return state
  }
};

