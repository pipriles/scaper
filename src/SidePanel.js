import React, { useState }  from 'react';
import SelectionItem from './SelectionItem';
import './SidePanel.css'

/* Add unselect target functionality */
const LABELS = [
  "Selection 1",
  "Selection 2",
  "Selection 3",
  "Selection 4",
  "Selection 5"
];

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

function SidePanel(props) {

  const [ labels, setLabels ] = useState(LABELS);
  const [ selected, setSelected ] = useState(null);

  const selectHandler = (label) => {
    setSelected(label);
  };

  const addLabel = () => {
    console.log('Add random label');
    let label = randomString(10);
    setLabels([ ...labels, label ]);
    console.log(labels);
  };

  const editLabel = () => {
    console.log('Edit selected label', selected);
  };

  const removeLabel = () => {
    console.log('Remove selected label', selected);
    let filtered = labels.filter(l => l !== selected)
    setLabels(filtered);
    setSelected(filtered[filtered.length-1]);
  }

  return (
    <div className="SidePanel"> 
      <div className="Selection-wrapper">
        { 
          labels.map((l) => 
            <SelectionItem 
              key={l} 
              label={l} 
              isSelected={ selected === l }
              onSelect={selectHandler}/>
          ) 
        }
      </div>
      <div>
        <hr/>
        <div className="SidePanel-icons-section">
          <button className="SidePanel-icon" onClick={addLabel}>
            <i className="fa fa-plus fa-lg"></i>
          </button>
          <button className="SidePanel-icon" onClick={editLabel}>
            <i className="fa fa-edit fa-lg"></i>
          </button>
          <button className="SidePanel-icon" onClick={removeLabel}>
            <i className="fa fa-trash fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
