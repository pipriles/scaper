import uuidv4 from 'uuid/v4';

const defaultValue = {
  "id": null,
  "commandType": null,
  "description": "",
  "parameters": []
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

export const changeCommandType = (commandId, commandType) => {
  return {
    type: 'UPDATE_COMMAND_TYPE',
    payload: { id: commandId, commandType }
  }
}

export const updateCommandParameter = (commandId, parameter, value) => {
  return {
    type: 'UPDATE_COMMAND_PARAMETER',
    payload: { id: commandId, parameter, value }
  }
}
