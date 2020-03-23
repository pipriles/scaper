import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

import CommandAutocomplete from './CommandAutocomplete.js';

import * as actions from '../actions';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 250,
    padding: theme.spacing(1)
  },
  group: {
    display: 'flex',
    width: '100%',
    maxWidth: 500
    // height: '100%'
  },
  label: {
    margin: theme.spacing(1, 2, 1, 1),
    fontFamily: theme.typography.fontFamily,
    fontSize: 'small',
    color: theme.palette.primary.contrastText,
    width: 100
  },
  input: {
    paddingLeft: 10,
    backgroundColor: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
    width: '100%'
  },
});

const mapStateToProps = (state, ownProps) => {
  const command = state.commands[ownProps.commandId];
  return { command }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCommandTypeChange: (event, value) => {

      const commandType = value;
      const action = actions.changeCommandType(ownProps.commandId, commandType)

      if ( ownProps.commandId ) 
        dispatch(action);
    }
  }
};

function CommandInput({ classes, command, onCommandTypeChange }) {

  console.log(command);
  const commandType = !!command ? command.commandType : null;

  return (
    <div className={ classes.root }>

      <div className={ classes.group }>

        <span className={ classes.label }> Command </span>

        <CommandAutocomplete 
          value={ commandType } 
          onChange={ onCommandTypeChange }
        />

      </div>

      <div className={ classes.group }>

        <span className={ classes.label }> Description </span>
        <InputBase className={ classes.input } />

      </div>

    </div>
  );
}

const styledCommandInput = withStyles(styles)(CommandInput);
export default connect(mapStateToProps, mapDispatchToProps)(styledCommandInput)

