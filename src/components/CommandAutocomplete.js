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
    display: 'flex',
    flexDirection: 'column',
    height: "100%"
  },
  popperDisablePortal: {
    // position: 'static',
    // width: '100%',
    // flexGrow: 1,
    overflow: 'auto',
    borderTop: `1px solid ${theme.palette.primary.main}`,
    maxHeight: 450,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light
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

  return (

    <div className={ classes.root } >

      <div { ...getRootProps() }>
        <InputBase { ...getInputProps() } className={ classes.input } fullWidth />
      </div>

      <div className={ classes.popperDisablePortal } >
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
