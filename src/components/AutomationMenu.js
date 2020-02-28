import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CommandsToolbar from './CommandsToolbar.js';
import Command from './Command';

import * as actions from '../actions';

const styles = {}

const mapStateToProps = (state, ownProps) => {

  const commands = state.steps.map( s => state.commands[s] )
  return { commands }

};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCommandAdd: (event) => {
      const payload = actions.addCommand();
      dispatch(payload);
    },
    handleCommandRemove: (command) => {
      const payload = actions.removeCommand(command)
      dispatch(payload);
    }
  }
};

function AutomationMenu({ classes, commands, handleCommandAdd, handleCommandRemove }) {

  const [selected, setSelected] = React.useState(null);

  const handleSelect = (command) => (event) => {
    setSelected(command)
  }

  const handleRemoveSelected = () => {

    if ( !commands || commands.length <= 0 ) 
      return;

    if ( !selected ) {
      const last = commands[commands.length - 1];
      handleCommandRemove(last.id);
      return;
    }

    handleCommandRemove(selected);
    setSelected(null);
  };

  return (
    <>
      <CommandsToolbar 
        onClickAdd={ handleCommandAdd } 
        onClickDelete={ handleRemoveSelected }
      />
      <div>
        { commands.map( (cmd) => 
          <Command 
            onClick={ handleSelect(cmd.id) }
            selected={ selected === cmd.id }
            key={ cmd.id } 
            command={ cmd } 
          /> ) }
      </div>
    </>
  );

}

const AutomationMenuWithStyles = withStyles(styles)(AutomationMenu);
export default connect(mapStateToProps, mapDispatchToProps)(AutomationMenuWithStyles);

