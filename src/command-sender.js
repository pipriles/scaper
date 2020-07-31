import store from './store.js';
import browser from './browser-proxy.js';

/* We may need to pass different kind of data 
 * to the browser using this same interface
 */

export const sendCommand = async (command) => {
  return await sendMessageActiveTab({
    type: 'COMMAND',
    payload: command
  });
};

export const waitPageLoad = (tab) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const updated = await browser.tabs.get(tab.id);
      console.log(updated.status);
      if (updated.status === 'complete') {
        resolve(updated);
        clearInterval(interval);
      }
      /* reject after timeout? */
    }, 100);
  });
};

export const runCommands = async (commands) => {

  const { activeTab } = store.getState();

  for (const cmd of commands) {
    console.log(cmd);

    let tab = await waitPageLoad(activeTab);

    // Wait until it is ready
    const resp = await sendCommand(cmd);
    console.log(resp);

    /* Store command results on an intermediate area */ 
  }

};

const sendMessageActiveTab = async (payload) => {
  const { activeTab } = store.getState();
  if ( !activeTab ) return;
  return await browser.tabs.sendMessage(activeTab.id, payload);
}

