import React, { useState } from 'react';
import { connect } from 'react-redux';

import browser from './browser-proxy';
import store from './store'; 
import ExtractionField from './ExtractionField';

import './ExtractionMenu.css';

const extractData = async (setUrl) => {
  let { activeTab } = store.getState();
  let resp = await sendMessageActiveTab(activeTab);
  if (resp) setUrl(resp.url);
};

const sendMessageActiveTab = async (tab) => {
  if ( !tab ) return 
  const payload = 'OK';
  let resp = await browser.tabs.sendMessage(
      tab.id, { payload }
  );
  return resp
}

const mapStateToProps = (state) => {
  // for now just take first command
  console.log(state);
  let command = state.commands['1'];
  return { command };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFieldKeyChange: (command) => (field) => (event) => {
      const payload = { fieldKey: event.target.value };
      dispatch({ 
        type: 'UPDATE_FIELD', 
        commandId: command.id,
        fieldId: field.id,
        payload
      });
    },
    onFieldValueChange: (command) => (field) => (event, value) => {
      const payload = { selectorId: value.id };
      dispatch({ 
        type: 'UPDATE_FIELD', 
        commandId: command.id,
        fieldId: field.id,
        payload
      });
    }
  }
};

function ExtractionMenu(props) {

  const { command } = props;
  const { fields } = command.parameters;
  const [ url, setUrl ] = useState('');

  const { onFieldKeyChange } = props;
  const { onFieldValueChange } = props;
  // fetch selectors here
  // pass it to extraction field
  
  return (
    <div className="ExtractionMenu">
      <div className="ExtractionMenu-block">
        { url && ( <p>{ url }</p> ) }
        { Object.values(fields).map( 
          (field) => 
            <ExtractionField 
              key={ field.id } 
              field={ field }
              onFieldKeyChange={ onFieldKeyChange(command) }
              onFieldValueChange={ onFieldValueChange(command) }
            /> 
        ) }
      </div>
      <div className="ExtractionMenu-block">
        <button 
          className="ExtractionMenu-button"
          onClick={ () => extractData(setUrl) }>
          Extract
        </button>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ExtractionMenu);
