/* isolate state queries from components */

export const getSelector = (state, id) => {
  return state.selectors[id] || null;
}

export const getField = (state, id) => {
  return state.fields[id] || null;
}

