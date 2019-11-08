import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import CheckBox from '@material-ui/core/CheckBox';

function SelectorParams({ params, setParams }) {

  const onChangeStrip = (event) => {
    params.stripText = event.target.checked
    setParams(params);
  };

  const onChangeFirstElement = (event) => {
    params.elementIndex = (event.target.checked) ? 0 : null;
    setParams(params);
  };

  return (
    <>
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
    </>
  );
}

export default SelectorParams;

