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

function TimeoutParameter({ classes, parameter, onChange }) {

  const handleChange = (event) => {
    const timeout = parseInt(event.target.value);
    const payload = isNaN(timeout) || timeout < 0 ? null : timeout;
    onChange(payload)
  };

  return (
    <InputBase 
      className={ classes.input }
      placeholder="Timeout" 
      value={ parameter === null ? '' : parameter }
      onChange={ handleChange }
    />
  );
}

export default withStyles(styles)(TimeoutParameter);

