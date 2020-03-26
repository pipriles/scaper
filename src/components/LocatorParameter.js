import React from 'react';
import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    backgroundColor: '#282c34',
    width: '100%',
    padding: '6px 15px'
  }
});

function LocatorParameter({ classes, parameter, onChange }) {

  const handleChange = (event) => {
    const query = event.target.value
    const payload = { query };
    onChange(payload)
  };

  return (
    <InputBase 
      className={ classes.input }
      placeholder="Query" 
      value={ parameter.query }
      onChange={ handleChange }
    />
  );
}

export default withStyles(styles)(LocatorParameter);

