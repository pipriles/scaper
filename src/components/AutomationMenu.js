import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CommandsToolbar from './CommandsToolbar.js';
import Command from './Command';

import CommandParameters from './CommandParameters.js';

import * as actions from '../actions';

const creator = (theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  main: {
    flexGrow: 1
  },
  details: {
    flexBasis: 450,
    margin: theme.spacing(1, 1, 1, 0)
  }
});

const mapStateToProps = (state, ownProps) => {

  const commands = state.steps.map( s => state.commands[s] )
  return { commands }

};

const mapDispatchToProps = (dispatch) => {
  return {
    addCommand: (event) => {
      const payload = actions.addCommand();
      dispatch(payload);
    },
    removeCommand: (command) => {
      const payload = actions.removeCommand(command)
      dispatch(payload);
    }
  }
};

function AutomationMenu({ classes, commands, addCommand, removeCommand }) {

  const [selected, setSelected] = React.useState(null);

  const handleSelect = (command) => (event) => {

    if ( selected === command.id ) {
      setSelected(null);
      return;
    }

    setSelected(command);
  }

  const handleRemoveSelected = () => {

    if ( !commands || commands.length <= 0 ) 
      return;

    if ( !selected ) {
      const last = commands[commands.length - 1];
      removeCommand(last.id);
      return;
    }

    removeCommand(selected);
    setSelected(null);
  };

  const handleCommandAdd = () => {
    const last = commands[commands.length - 1];
    if ( !last.commandType ) 
      return;

    addCommand();
  }

  return (
    <div className={ classes.root }>

      <div className={ classes.main }>

        <CommandsToolbar 
          onClickAdd={ handleCommandAdd } 
          onClickDelete={ handleRemoveSelected }
        />

        <div>
          { commands.map( (cmd) => 
            <Command 
              onClick={ handleSelect(cmd.id) }
              onClickMore= { (event) => event.stopPropagation() }
              selected={ selected === cmd.id }
              key={ cmd.id } 
              command={ cmd } 
            /> ) }
        </div>

      </div>

      { ( !!selected ) 
        ? (
          <div className={ classes.details }>
            <CommandParameters commandId={ selected } />
          </div>
        ) : null }

    </div>
  );

}

const AutomationMenuWithStyles = withStyles(creator)(AutomationMenu);
export default connect(mapStateToProps, mapDispatchToProps)(AutomationMenuWithStyles);

