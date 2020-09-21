## Instructions

Run with `NODE_ENV=development npx webpack`

## Current model

- Steps are ordered command IDs that represent the order of execution
- Commands are indexed by ID and each value is an object
  - Each command has parameters depending on what it does
  - A command is rendered based on its parameters, every parameter has a React component
  - Interaction commands translate to a browser action
  - Extraction commands read from browser current state
- Selectors were replaced by commands to simplify the UI
  - We need to remove selectors
- Fields can be changed to work with extraction commands instead of selectors
  - Fields represet the labels of the data to store later when the extraction process ends

### Commands

```
{
  "id": UUID4,
  "commandType": String,
  "description": String,
  "parameters": {
    ...
  }
}
```

### Parameters

```
{
  "LOCATOR": {
    "query": "",
    "queryType": "CSS",
    "elementIndex": null
  },
  "TEXT": "",
  "URL": "",
  "TIMEOUT": 1000,
  "COORDINATES": {
    "x": null,
    "y": null
  },
  "STRIP": true,
  "COLLECTION": false,
  "ATTRIBUTE": "",
  "REGEX": ""
}
```

### Fields

```
{
  "id": UUID4,
  "selectorType":
  "parameter": "",
  "extractionType": "",
}
```

## Notes

- Decided to not use code from selenium ide because required a lot of effort to understand how it is integrated
- Error cannot resolved module `closure-loader` solved by installing with version "^9.0.2"
- Need to solve `Cannot read property 'findElement' of undefined` when using functions from selenium api

## TODO

- [x] Implement `EXTRACT_TEXT` command
- [x] Implement `EXTRACT_ATTRIBUTE` command
- [ ] Improve webpack config file
- [ ] Remove Selenium API dependencies and code included to simplify project
- [ ] Add recipe to Redux state
- [ ] Create default test recipe
- [ ] Implement `EXTRACT_URL` command
- [ ] Implement `EXTRACT_TITLE` command
- [ ] Implement `WAIT_FOR_ELEMENT_PRESENT` command
- [ ] Implement `WAIT_FOR_ELEMENT_NOT_PRESENT` command
- [ ] Implement `WAIT_FOR_ELEMENT_VISIBLE` command
- [ ] Implement `WAIT_FOR_ELEMENT_NOT_VISIBLE` command
- [ ] Implement `WAIT_FOR_ELEMENT_EDITABLE` command
- [ ] Implement `WAIT_FOR_ELEMENT_NOT_EDITABLE` command
- [ ] Implement `PAGE_WAIT` command
- [ ] Implement `CLICK` command
- [ ] Implement `DOUBLE_CLICK` command
- [ ] Implement `CLICK_AT` command
- [ ] Implement `DOUBLE_CLICK_AT` command
- [ ] Implement `FOCUS` command
- [ ] Implement `MOUSE_OVER` command
- [ ] Implement `MOUSE_OUT` command
- [ ] Implement `MOUSE_DOWN` command
- [ ] Implement `MOUSE_DOWN_RIGHT` command
- [ ] Implement `MOUSE_DOWN_AT` command
- [ ] Implement `MOUSE_DOWN_RIGHT_AT` command
- [ ] Implement `MOUSE_UP` command
- [ ] Implement `MOUSE_UP_RIGHT` command
- [ ] Implement `MOUSE_UP_AT` command
- [ ] Implement `MOUSE_UP_RIGHT_AT` command
- [ ] Implement `MOUSE_MOVE` command
- [ ] Implement `MOUSE_MOVE_AT` command
- [ ] Implement `TYPE` command
- [ ] Implement `SEND_KEYS` command
- [ ] Implement `CHECK` command
- [ ] Implement `UNCHECK` command
- [ ] Implement `SUBMIT` command
- [ ] Implement `OPEN` command

