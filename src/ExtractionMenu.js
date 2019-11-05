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
  let [ command ] = state.commands;
  return command.parameters;
};

function ExtractionMenu(props) {

  const { fields } = props;
  const [ url, setUrl ] = useState('');

  return (
    <div className="ExtractionMenu">
      <div className="ExtractionMenu-block">
        { url && ( <p>{ url }</p> ) }
        { fields.map( 
          (field, index) => 
            <ExtractionField 
              key={ index } 
              field={ field }
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

export default connect(mapStateToProps, null)(ExtractionMenu);
