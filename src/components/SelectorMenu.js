import React from 'react';
import { connect } from 'react-redux';
import { 
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import * as actions from '../actions';
import { getSelector } from '../selectors';
import SelectorParams from './SelectorParams';

import './SelectorMenu.css';

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.selectorId;
  let selector = getSelector(state, id);
  return { selector };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  const dispatchPayload = (payload) => {
    const action = actions.updateSelector({ 
      ...payload, 
      id: ownProps.selectorId 
    });
    dispatch(action);
  }

  const setQuery = (event) => {
    let payload = { query: event.target.value };
    dispatchPayload(payload);
  };

  const setLabel = (event) => {
    let payload = { label: event.target.value };
    dispatchPayload(payload);
  };

  const setType = (event) => {
    let payload = { extractionType: event.target.value };
    dispatchPayload(payload);
  };

  const setParams = (value) => {
    let payload = { parameters: value };
    dispatchPayload(payload);
  };

  return { setQuery, setLabel, setType, setParams };
};

function SelectorMenu(props) {

  const { selector } = props;

  return (
    <div className="SelectorMenu"> 
      <div className="SelectorMenu-content">

        <InputBase 
          placeholder="Query" 
          value={ selector.query }
          onChange={ props.setQuery }
          className="SelectorMenu-input"
        />

        <FormControl 
          variant="outlined"
          className="SelectorMenu-form-control">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="select-type" 
            value={ selector.extractionType }
            onChange={ props.setType }
            className="SelectorMenu-select"
            labelWidth={ 37 }
          >
            <MenuItem value="GET_TEXT"> 
              Get Text 
            </MenuItem>
            <MenuItem value="GET_ATTRIBUTE"> 
              Get Attribute 
            </MenuItem>
          </Select>
        </FormControl>

        <hr />

        <SelectorParams 
          params={ selector.parameters }
          setParams={ props.setParams }
        />

      </div>

      <div className="SelectorMenu-content">
        <InputBase 
          placeholder="Label" 
          value={ selector.label }
          onChange={ props.setLabel }
          className="SelectorMenu-label-input"
        />      
      </div>

    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectorMenu);

