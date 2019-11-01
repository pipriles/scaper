/*global chrome*/
import React, { useState } from 'react';
import store from './store'; 

import './ExtractionMenu.css';
import logo from './logo.svg';

function ExtractionMenu(props) {
  let [ url, setUrl ] = useState('');

  const extractData = () => {
    let { focusedWindow } = store.getState()
    sendMessageActiveTab(focusedWindow);
  };

  const sendMessageActiveTab = (windowId) => {
    const payload = 'OK';
    const options = { active: true, url: '*://*/*', windowId }    
    console.log(options)
    chrome.tabs.query(options, (tabs) => { 
        console.log(tabs)
        if (tabs.length <= 0) return
        chrome.tabs.sendMessage(tabs[0].id, { payload }, (resp) => { 
            console.log(resp) 
            setUrl(resp.url) // oops
        });
      });
  }

  return (
    <div className="ExtractionMenu">
      <div className="ExtractionMenu-block">
        <img src={logo} className="ExtractionMenu-logo" alt="logo" />
        {
          ( !url ) 
          ? ( <p> Edit <code>src/App.js</code> and save to reload. </p>)
          : ( <p>{ url }</p> )
        }
      </div>
      <div className="ExtractionMenu-block">
        <button 
          className="ExtractionMenu-button"
          onClick={ () => extractData() }>
          Extract
        </button>
      </div>
    </div>
  );
}

const wrapper = () => <ExtractionMenu />
export default wrapper;
