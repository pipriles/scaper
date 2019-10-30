import React from 'react';
import './SidePanel.css';

function SelectionItem(props) {

  let classNames = "Selection";
  if (props.isSelected) 
    classNames += " Selection-selected";

  return (
    <button 
      className={ classNames }
      onFocus={() => props.onSelect(props.label)}>
      { props.label }
    </button>
  );
}

export default SelectionItem;
