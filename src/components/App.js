import React, { useState } from 'react';
import SidePanel from './SidePanel';
import ExtractionMenu from './ExtractionMenu';
import SelectorMenu from './SelectorMenu';

import './App.css';

function App() {

  const [ selected, setSelected ] = useState(null);
  const selectHandler = (id) => {
    setSelected( id !== selected ? id : null );
  };

  return (
    <div className="App">
      <SidePanel 
        selected={ selected }
        onSelect={ selectHandler }
      />
      <div className="App-header">
        { ( selected !== null ) 
          ? <SelectorMenu selectorId={ selected }/> 
          : <ExtractionMenu /> }
      </div>
    </div>
  );
}

export default App;
