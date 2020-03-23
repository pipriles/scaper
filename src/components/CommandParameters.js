import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CommandParameter from './CommandParameter.js';

import * as actions from '../actions';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: `calc(100% - ${2*theme.spacing(1)}px)`,
    padding: theme.spacing(1)
  }
});

const mapStateToProps = (state, ownProps) => {
  const command = state.commands[ownProps.commandId];
  return { command };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCommandTypeChange: (event, value) => {
      const commandType = value;
      const action = actions.changeCommandType(ownProps.commandId, commandType)
      dispatch(action);
    }
  }
};

function CommandParameters({ classes, command, onCommandTypeChange }) {

  if ( !command )
    return null;

  /* Read Command definition and render required components */

  return (
    <div className={ classes.root }>

      <CommandParameter />

    </div>
  );
}

const styledCommandParameters = withStyles(styles)(CommandParameters);
export default connect(mapStateToProps, mapDispatchToProps)(styledCommandParameters);
