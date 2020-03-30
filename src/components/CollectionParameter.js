import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    margin: theme.spacing(0, 1),
    color: theme.palette.primary.contrastText
  },
  input: {
    backgroundColor: '#282c34', width: '100%',
    padding: '6px 15px'
  },
});

function CollectionParameter({ classes, parameter, onChange }) {

  const handleChange = (event) => {
    const payload = event.target.checked;
    console.log(payload);
    onChange(payload)
  };

  return (
    <FormGroup row className={ classes.root }>
      <FormControlLabel
        control={ <Checkbox color="default" checked={ parameter } onChange={ handleChange } /> }
        label="Extract all matches"
      />
    </FormGroup>
  );
}

export default withStyles(styles)(CollectionParameter);

