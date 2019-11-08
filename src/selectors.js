/* isolate state queries from components */

export const getSelector = (state, id) => {
  return state.selectors[id]
}

export const getField = (state, id) => {
  return state.fields[id];
}

