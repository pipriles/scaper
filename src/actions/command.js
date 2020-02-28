import uuidv4 from 'uuid/v4';

const defaultValue = {
  "id": null,
  "commandType": null,
  "parameters": null
}

export const addCommand = () => {
  return {
    type: 'ADD_COMMAND',
    payload: { ...defaultValue, id: uuidv4() }
  };
};

export const removeCommand = (command) => {
  return {
    type: 'REMOVE_COMMAND',
    payload: { id: command }
  }
};
