import browser from 'webextension-polyfill';
import Selenium from './selenium-ide/content/selenium-api.js';

console.log('Listening to commands...');

const selenium = new Selenium.createForWindow(window, true);

const getElementByXPATH = (query) => {
  const result = document.evaluate(
    query, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
  return result.singleNodeValue;
};

const getElementByCSS = (query, index) => {
  index = !index ? 0 : index;
  console.log(query, index);
  return document.querySelectorAll(query)[index];
};

const getElement = (locator) => {

  const { query, queryType } = locator;
  const extractor = queryType !== 'XPATH' ? getElementByCSS : getElementByXPATH;

  return !query ? null : extractor(query);
};

const encodeLocator = locator => {
  const { query, queryType } = locator;
  const prefix = queryType !== 'XPATH' ? 'css=' : 'xpath=';
  return !query ? null : prefix + query;
};

const extractText = ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const element = getElement(locator);

  const stripText = parameters['STRIP'];
  const string    = element.textContent;

  return string && stripText ? string.trim() : string;

};

const extractAttribute = ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const element = getElement(locator);

  const name = parameters['ATTRIBUTE'];
  const stripText = parameters['STRIP'];
  const attribute = element.getAttribute(name);

  return attribute && stripText ? attribute.trim() : attribute;
}

const extractUrl = ({ parameters }) => {
  return window.location.href;
};

const extractTitle = ({ parameters }) => {
  return document.title;
};

const doClick = ({ parameters }) => {
  const locator = parameters['LOCATOR'];
  const encoded = encodeLocator(locator);
  console.log('ENCODED!', encoded);
  return selenium.doClick(encoded);
};

const makeResponse      = (payload) => ({ type: 'SUCCESS', payload });
const makeErrorResponse = (payload) => ({ type: 'ERROR'  , payload });

const commandExecutorMap = {
  'EXTRACT_TEXT':       extractText,
  'EXTRACT_ATTRIBUTE':  extractAttribute,
  'EXTRACT_URL':        extractUrl,
  'EXTRACT_TITLE':      extractTitle,
  'CLICK':              doClick
};

const executeCommand = (command) => {

  console.log(command);
  const action = commandExecutorMap[command.commandType];

  if ( action === undefined ) {
    const payload = { 'message': 'Invalid command type' }
    return makeErrorResponse(payload);
  }

  const payload = action(command);
  return makeResponse(payload);

};

const handleMessage = (message) => {
  switch (message.type) {
    case 'COMMAND':
      return executeCommand(message.payload);
    default:
      return null;
  }
};

browser.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const url = window.location.href;
    const response = handleMessage(request);
    console.log(response);
    console.log(request, sender, url);
    sendResponse(response);
    return true;
  }
);

