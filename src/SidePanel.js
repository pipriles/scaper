import React from 'react';
import SelectorItem from './SelectorItem';
import './SidePanel.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { selectors: state.selectors }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSelector: () => {
      console.log('Add random label');
      dispatch({ type: 'ADD_SELECTOR' });
    },
    removeSelector: (id) => {
      console.log(id);
      dispatch({ type: 'REMOVE_SELECTOR', payload: { id } });
      ownProps.onSelect(null);
    }
  }
};

function SidePanel({ 
  selectors, 
  selected,
  onSelect,
  addSelector,
  removeSelector
}) {

  const hrStyle = { width: "80%" };

  return (
    <div className="SidePanel"> 
      <div className="Selection-wrapper">
      { 
        selectors.map((s, index) => 
          <SelectorItem 
            key={index} 
            isSelected={ selected === s.id }
            { ...s }
            onSelect={onSelect}/>
        ) 
      }
      </div>
      <div>
        <hr style={ hrStyle } />
        <div className="SidePanel-icons-section">
          <button 
            className="SidePanel-icon" 
            onClick={() => addSelector()}>
            <i className="fa fa-plus fa-lg"></i>
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

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SidePanel);

