import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';

import COMMANDS from '../constants/commandTypes.json';

const styles = (theme) => ({

  root: {
    width: '100%'
  },
  popperDisablePortal: {
    position: 'absolute',
    width: '100%',
    // maxWidth: 500,
    overflow: 'auto',
    maxHeight: 200,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    zIndex: 9999,
    marginTop: 2
  },

  inputWrapper: {
    width: '100%'
  },

  input: {
    paddingLeft: 10,
    backgroundColor: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize
  },

  dense: {
    paddingTop: 2,
    paddingBottom: 2
  }

});

function Autocomplete({ classes, value, onChange, ...other }) {

  // const { listBox } = props.classes;
 
  // open 
  // disableCloseOnSelect
  // options={ options }
  // onChange={ onAutoCompleteChange }
  // className={ classes.propertyDetailSideBox }
  //

  const {
    getRootProps,
    // getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,

  } = useAutocomplete({ 
    // getOptionLabel, 
    // getOptionSelected, 
    componentName: 'Autocomplete',
    options: Object.keys(COMMANDS),
    value: value,
    onChange: onChange,
    ...other
  });

  const { className } = other;
  const input = React.useRef(null);
  const width = input.current ? input.current.clientWidth : 0;

  console.log(input);
  console.log(width);

  return (

    <div className={ `${classes.root}` + ( className ? ` ${className}` : '' ) } ref={ input }>

      <div { ...getRootProps() } className={ classes.inputWrapper }>
        <InputBase { ...getInputProps() } className={ classes.input } fullWidth />
      </div>

      <div className={ classes.popperDisablePortal } style={{ width }} >
        { groupedOptions.length > 0 ? (

          <List { ...getListboxProps() } dense >
            
            { groupedOptions.map((option, index) => (

              <ListItem className={ classes.dense } { ...getOptionProps({ option, index }) } button >
                <ListItemText primary={ option } />
              </ListItem>

            )) }

          </List>

        ) : null }

      </div>

    </div>

  );

}

export default withStyles(styles)(Autocomplete);
