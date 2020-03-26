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
    onChange: (type) => (value) => {
      const { commandId } = ownProps;
      const action = actions.updateCommandParameter(commandId, type, value)
      dispatch(action);
    }
  }
};

function CommandParameters({ classes, command, onChange }) {

  // if ( !command )
  //   return null;

  /* Read Command definition and render required components */
  console.log(command);

  let parameterComponents = [];

  if ( !!command ) {
    const { parameters } = command;
    parameterComponents = Object.keys(parameters).map( (type, index) => (
      <CommandParameter key={ type } type={ type } parameter={ parameters[type] } onChange={ onChange(type) } /> 
    ))
  }

  return (
    <div className={ classes.root }>
      { parameterComponents }
    </div>
  );
}

const styledCommandParameters = withStyles(styles)(CommandParameters);
export default connect(mapStateToProps, mapDispatchToProps)(styledCommandParameters);
