/* isolate state queries from components */

export function findSelector(state, id) {
  for ( let s of state.selectors ) 
    if ( s.id === id ) return s;
}

