import React from 'react';

import SidePanel from './SidePanel';
import ExtractionMenu from './ExtractionMenu';
import SelectorMenu from './SelectorMenu';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  content: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)', // whut?
    color: 'white'
  }
}

function ExtractionModal({ classes }) {

  const [ selected, setSelected ] = React.useState(null);
  const selectHandler = (id) => {
    setSelected( id !== selected ? id : null );
  };

  return (
    <div>
      <SidePanel 
        selected={ selected }
        onSelect={ selectHandler }
      />
      <div className={ classes.content }>
        { ( selected !== null ) 
          ? <SelectorMenu selectorId={ selected }/> 
          : <ExtractionMenu /> }
      </div>
    </div>
  )
}

export default withStyles(styles)(ExtractionModal);
