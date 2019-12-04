import store from './store';
import browser from './browser-proxy';

const sendCommand = async (command) => {
  switch (command.commandType) {
    case 'EXTRACT_DATA':
      return sendExtractCommand(command);
    default:
      return command;
  }
};

const sendExtractCommand = async (command) => {
  const { parameters } = command;

  // need store
  const state = store.getState();

  const fields    = parameters.fields.map(id => state.fields[id]);
  const responses = await Promise.all(
    fields
      .map(f => state.selectors[f.selectorId])
      .map(sendSelector)
  );

  let data = {};
  let key, value;

  for (let i=0; i < fields.length; i++) {
    key = fields[i].fieldKey;
    value = responses[i];
    data[key] = value;
  }

  return data;
};

const sendSelector = async (selector) => {
  return await sendMessageActiveTab({ 
    type: 'EXTRACT', 
    payload: selector 
  });
};

const sendMessageActiveTab = async (payload) => {
  const { activeTab } = store.getState();
  if ( !activeTab ) return;
  return await browser.tabs.sendMessage(activeTab.id, payload);
}

export default sendCommand;

