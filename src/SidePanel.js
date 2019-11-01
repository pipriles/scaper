import React, { useState }  from 'react';
import SelectorItem from './SelectorItem';
import './SidePanel.css';

import { connect } from 'react-redux';

/* Add unselect target functionality */
function randomString(length) {
  var result = [];
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var l = c.length;
  for (let i=0; i < length; i++) {
    let x = c.charAt(Math.floor(Math.random() * l));
    result.push(x)
  }
  return result.join('');
}

const mapStateToProps = (state) => {
  return { selectors: state.selectors }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSelector: () => {
      console.log('Add random label');
      let str = randomString(10);
      let payload = { id: str, label: str }; 
      dispatch({ type: 'ADD_SELECTOR', payload });
    },
    updateSelector: (payload) => {
      console.log('Edit selected label', payload);
      dispatch({ type: 'UPDATE_SELECTOR', payload });
    },
    removeSelector: (id) => {
      console.log(id);
      dispatch({ type: 'REMOVE_SELECTOR', payload: { id } });
    }
  }
};

function SidePanel({ 
  selectors, 
  addSelector,
  updateSelector,
  removeSelector
}) {
  const [ selected, setSelected ] = useState(null);

  const selectHandler = (id) => {
    setSelected(id);
  };

  return (
    <div className="SidePanel"> 
      <div className="Selection-wrapper">
      { 
        selectors.map((s, index) => 
          <SelectorItem 
            key={index} 
            isSelected={ selected === s.id }
            {...s}
            onSelect={selectHandler}/>
        ) 
      }
      </div>
      <div>
        <hr/>
        <div className="SidePanel-icons-section">
          <button 
            className="SidePanel-icon" 
            onClick={() => addSelector()}>
            <i className="fa fa-plus fa-lg"></i>
          </button>
          <button 
            // trigger action to display a ui that will update selector
            className="SidePanel-icon" 
            onClick={() => updateSelector(selected)}>
            <i className="fa fa-edit fa-lg"></i>
          </button>
          <button 
            className="SidePanel-icon" 
            onClick={() => removeSelector(selected)}>
            <i className="fa fa-trash fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
