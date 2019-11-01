import React from 'react';
import SidePanel from './SidePanel';
import ExtractionMenu from './ExtractionMenu';

import './App.css';

function App() {

  return (
    <div className="App">
      <SidePanel />
      <div className="App-header">
        <ExtractionMenu />
      </div>
    </div>
  );
}

export default App;
