import store from './store.js';

let browser = null;

if ( window.location.protocol !== 'https:' 
  && window.location.protocol !== 'http:') 
  browser = require('webextension-polyfill');

if ( browser ) {
  console.log('Loading from extension');
  const filterTypes = { windowTypes: ["normal"] }                      
  const focusWindow = async (windowId) => {
    if ( windowId <= 0 ) return;
    let opts = { active: true, url: '*://*/*', windowId }    
    let [ tab ] = await browser.tabs.query(opts);
    if ( !tab ) return;
    store.dispatch({ type: 'CHANGE_TAB', payload: tab });
  }

  browser.windows.onFocusChanged.addListener(
    focusWindow, filterTypes);
}

window.browser = browser;

export default browser;

