import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import CheckBox from '@material-ui/core/CheckBox';

function SelectorParams({ selector, setParams }) {

  const extractionType = selector.extractionType;
  const params = selector.parameters;

  const onChangeStrip = (event) => {
    params.stripText = event.target.checked
    setParams(params);
  };

  const onChangeFirstElement = (event) => {
    params.elementIndex = (event.target.checked) ? 0 : null;
    setParams(params);
  };

  const onChangeAttr = (event) => {
    if (!event.target.value) return;
    setParams({ ...params, name: event.target.value });
  };

  return (
    <>
      <div>

        <FormControlLabel
          control={ 
            <CheckBox 
              checked={ params.stripText }
              onChange={ onChangeStrip } 
            /> }
          label="Strip"
        />
        <FormControlLabel
          control={ 
            <CheckBox 
              checked={ params.elementIndex !== null }
              onChange={ onChangeFirstElement } 
            /> }
          label="First Element"
        /> 


      </div>

    { (extractionType == "GET_ATTRIBUTE") 
      && <InputBase
          placeholder="Attribute name"
          value={ params.name || '' }
          onChange={ onChangeAttr }
          className="SelectorMenu-input"
        />
    }
    </>
  );
}

export default SelectorParams;

