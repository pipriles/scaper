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

function AttributeParameter({ classes, parameter, onChange }) {

  const handleChange = (event) => {
    const payload = event.target.value;
    onChange(payload)
  };

  return (
    <InputBase 
      className={ classes.input }
      placeholder="Attribute" 
      value={ parameter }
      onChange={ handleChange }
    />
  );
}

export default withStyles(styles)(AttributeParameter);

