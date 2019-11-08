import uuidv4 from 'uuid/v4';

const defaultValue = {
  "id": null,
  "fieldKey": "",
  "fieldKeyType": "STRING",
  "selectorId": null
}

export const addField = (command) => {
  return {
    type: 'ADD_FIELD',
    command,
    payload: { ...defaultValue, id: uuidv4() }
  };
};

export const updateField = (payload) => {
  return { type: 'UPDATE_FIELD', payload };
};

export const removeField = (command, id) => {
  return { type: 'REMOVE_FIELD', command, id };
}

