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

const getElement = (selector) => {
  const { query } = selector;
  if (!query) return null;
  return selector.queryType === 'CSS' 
    ? getElementByCSS(query) 
    : getElementByXPATH(query);
};

const getElementText = (element, params) => {
  let text = element.textContent;
  if (text && params.stripText) 
    text = text.trim()
  return text;
};

const getElementAttr = (element, params) => {
  let attr = element.getAttribute(params.name);
  if (attr && params.stripText) 
    attr = attr.trim()
  return attr;
};

const extractSelector = (selector) => {
  const element = getElement(selector);
  const params  = selector.parameters;

  if (!element) 
    return null;

  switch (selector.extractionType) {
    case 'GET_TEXT': 
      return getElementText(element, params);
    case 'GET_ATTRIBUTE': 
      return getElementAttr(element, params);
    default:
      console.log('Extraction type not found');
      return null;
  }
};

const handleMessage = (message) => {
  switch (message.type) {
    case 'EXTRACT':
      return extractSelector(message.payload);
    default:
      return null;
  }
};

browser.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const url = window.location.href;
    const data = handleMessage(request);
    console.log(data);
    console.log(request, sender, url);
    sendResponse(data);
    return true;
  }
);

