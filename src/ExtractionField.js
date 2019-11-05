import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { findSelector } from './selectors';

import './ExtractionField.css';

const mapStateToProps = (state, ownProps) => {
  let { fieldKey, fieldKeyType, selectorId } = ownProps.field

  // i will need to normalize 
  // to make this fast
  let keySelector = fieldKey, valueSelector;
  if ( fieldKeyType === "SELECTOR" )
    keySelector = findSelector(state, fieldKey);
  valueSelector = findSelector(state, selectorId);

  return { 
    keySelector, 
    valueSelector, 
    selectors: state.selectors 
  };
};

function ExtractionField({ 
  field, 
  keySelector, 
  valueSelector, 
  selectors = [] }) {

  const onChange = (e, value) => {
    console.log(value);
  }

  const { fieldKeyType } = field;
  let fieldKey = '';

  if ( keySelector !== undefined ) {
    fieldKey = fieldKeyType !== "SELECTOR" 
      ? field.fieldKey 
      : keySelector.label;
  }

  return (
    <div className="ExtractionField-container">
      <div className="ExtractionField-column">
        <InputBase 
          value={ fieldKey }
          placeholder="Field" 
          className="ExtractionField-input"
        />
      </div>
      <div className="ExtractionField-column">
        <Autocomplete
          value={ valueSelector }
          options={ selectors }
          getOptionLabel={ s => s.label } 
          clearOnEscape
          onChange={ onChange }
          renderInput={ params => {
            return <InputBase 
              ref={params.ref}
              inputProps={params.inputProps}
              placeholder="Selector"
              className="ExtractionField-input"
            /> 
          } }
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(ExtractionField);