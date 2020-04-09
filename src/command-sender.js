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

export const runCommands = async (commands) => {

  for (const cmd of commands) {
    console.log(cmd.commandType);
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

