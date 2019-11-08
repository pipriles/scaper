import uuidv4 from 'uuid/v4';

const defaultValue = {
  "id": null,
  "label": "New Selector",
  "query": "",
  "queryType": "CSS",
  "extractionType": "GET_TEXT",
  "parameters": {
    "stripText": true,
    "elementIndex": 0
  }
}

// to specific command
export const addSelector = () => {
  return {
    type: 'ADD_SELECTOR',
    payload: { ...defaultValue, id: uuidv4() }
  };
};

export const removeSelector = (id) => {
  return {
    type: 'REMOVE_SELECTOR',
    payload: { id }
  };
};

export const updateSelector = (payload) => {
  return { type: 'UPDATE_SELECTOR', payload };
};
