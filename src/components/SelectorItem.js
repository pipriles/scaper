import React from 'react';
import './SidePanel.css';

function SelectorItem(props) {

  let classNames = "Selection";
  if (props.isSelected) 
    classNames += " Selection-selected";

  return (
    <button 
      className={ classNames }
      onClick={() => props.onSelect(props.id)}>
      { props.label }
    </button>
  );
}

export default SelectorItem;
