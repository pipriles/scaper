This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

Run with `NODE_ENV=development npx webpack`

## Notes

- Error cannot resolved module `closure-loader` solved by installing with version "^9.0.2"
- Need to solve `Cannot read property 'findElement' of undefined` when using functions from selenium api
- Decided to not use code from selenium ide because required a lot of effort to understand how it is integrated

Steps represent the order of execution

Commands have parameters

Interaction commmands take parameters and convert it to brower actions
Interaction commands interact with parameters directly

Extraction commands take parameters and convert it to data
Extraction commands have fields with selectors

Selectors take one parameter and transform it to data
Selectors can change the way that it transforms the data

Commands
{
  "id": "",
  "commandType": "",
  "parameters": []
}

Parameters
{
  parameterType: "",
  ...
}

Selectors
{
  "id": "",
  "selectorType":
  "parameter": "",
  "extractionType": "",
}

