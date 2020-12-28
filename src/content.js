import browser from 'webextension-polyfill';

console.log('Listening to commands...');

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

const extractText = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const element = getElement(locator);

  if (!element) return null;

  const stripText = parameters['STRIP'];
  const string    = element.textContent;

  return string && stripText ? string.trim() : string;

};

const extractAttribute = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const element = getElement(locator);

  const name = parameters['ATTRIBUTE'];
  const stripText = parameters['STRIP'];
  const attribute = element.getAttribute(name);

  return attribute && stripText ? attribute.trim() : attribute;
}

const extractUrl = async ({ parameters }) => {
  return window.location.href;
};

const extractTitle = async ({ parameters }) => {
  return document.title;
};

const doClick = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const element = getElement(locator);

  if (!element) return;

  return element.click()
};

const waitForElementPresent = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const timeout = parameters['TIMEOUT'];
  const dtStart = Date.now();

  while (!getElement(locator)) {
    if (Date.now() - dtStart > timeout ) return false;
    await new Promise( resolve => requestAnimationFrame(resolve) ); 
  }

  return true;
};

const waitForElementNotPresent = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const timeout = parameters['TIMEOUT'];
  const dtStart = Date.now();

  while (getElement(locator)) {
    if (Date.now() - dtStart > timeout ) return false;
  }

  return true;
};

const sendKeys = async ({ parameters }) => {

  const locator = parameters['LOCATOR'];
  const string  = parameters['TEXT'];
  const element = getElement(locator);

  if (!element) return false;

  for(let i=0; i < string.length; i++) {
    console.log(string[i]);

    const keydown = new KeyboardEvent('keydown', { 'key': string[i] });
    element.dispatchEvent(keydown);
    
    const keyup = new KeyboardEvent('keyup', { 'key': string[i] });
    element.dispatchEvent(keyup);
  }

  return true
};

const makeResponse      = (payload) => ({ type: 'SUCCESS', payload });
const makeErrorResponse = (payload) => ({ type: 'ERROR'  , payload });

const commandExecutorMap = {
  'EXTRACT_TEXT':                 extractText,
  'EXTRACT_ATTRIBUTE':            extractAttribute,
  'EXTRACT_URL':                  extractUrl,
  'EXTRACT_TITLE':                extractTitle,
  'WAIT_FOR_ELEMENT_PRESENT':     waitForElementPresent,
  'WAIT_FOR_ELEMENT_NOT_PRESENT': waitForElementNotPresent,
  'CLICK':                        doClick,
  'SEND_KEYS':                    sendKeys
};

const executeCommand = async (command) => {

  console.log(command);
  const action = commandExecutorMap[command.commandType];

  if ( action === undefined ) {
    const payload = { 'message': 'Invalid command type' }
    return makeErrorResponse(payload);
  }

  return action(command)
    .then(makeResponse)
    .catch(makeErrorResponse);

  // const payload = await action(command);
  // return makeResponse(payload);
};

const handleMessage = async (message, sendResponse) => {
  switch (message.type) {
    case 'COMMAND':
      let response = await executeCommand(message.payload);
      sendResponse(response);
    default:
      return null;
  }
};

browser.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const url = window.location.href;
    console.log(request, sender, url);
    handleMessage(request, sendResponse);
    return true;
  }
);

