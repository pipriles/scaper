import React from 'react';
import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  input: {
    backgroundColor: '#282c34',
    width: '100%',
    padding: '6px 15px'
  },
  left: {
    marginRight: theme.spacing(1) / 2
  }
});

function CoordinatesParameter({ classes, parameter, onChange }) {

  const handleXChange = (event) => {
    const timeout = parseFloat(event.target.value);
    const payload = { x: isNaN(timeout) ? null : timeout };
    onChange(payload)
  };


  const handleYChange = (event) => {
    const timeout = parseFloat(event.target.value);
    const payload = { y: isNaN(timeout) ? null : timeout };
    onChange(payload)
  };

  const { x: coordX, y: coordY } = parameter;

  return (
    <div className={ classes.root }>
      <InputBase 
        className={ `${classes.input} ${classes.left}` }
        placeholder="X" 
        type="number"
        value={ coordX === null ? '' : coordX }
        onChange={ handleXChange }
      />

      <InputBase 
        className={ classes.input }
        placeholder="Y" 
        type="number"
        value={ coordY === null ? '' : coordY }
        onChange={ handleYChange }
      />
    </div>
  );
}

export default withStyles(styles)(CoordinatesParameter);

