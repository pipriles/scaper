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
  const { commandType, parameters } = command;

  // need store
  state = store.getState();

  const fields    = parameters.fields.map(id => state.fields[id]);
  const selectors = fields.map(f => state.selector[f.selectorId]);
  const promises  = selectors.map(sendSelector);
  const responses = await Promise.all(extractor);
  const data = {};

  for (let i=0; i <= fields.length; i++) {
    const key = fields[i].fieldKey;
    const value = responses[i];
    data[key] = value;
  }

  return data;
};

const sendSelector = async (selector) => {
  return await sendMessageActiveTab(selector);
};

const sendMessageActiveTab = async (type, payload) => {
  const { activeTab } = store.getState();
  if ( !activeTab ) return;
  return await browser.tabs.sendMessage(
    activeTab.id, { type, payload });
}

