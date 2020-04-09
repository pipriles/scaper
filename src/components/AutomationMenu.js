import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import RecipePlayer from './RecipePlayer';
import CommandList from './CommandList';
import CommandInput from './CommandInput';

import CommandParameters from './CommandParameters';

import * as actions from '../actions';

const creator = (theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  main: {
    flexGrow: 1,
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  commandList: {
    flexGrow: 1,
    maxHeight: 'calc(100% - 266px)'
  },
  innerCommandList: {
    maxHeight: 'calc(100% - 48px)',
    overflow: 'auto'
  },
  details: {
    flexBasis: 300,
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
    if (!!last && !last.commandType) return;
    addCommand();
  }

  return (
    <div className={ classes.root }>

      <div className={ classes.main }>

        <RecipePlayer />

        <CommandList 
          classes={{ root: classes.commandList, innerList: classes.innerCommandList }}
          commands={ commands }
          selected={ selected }
          onClickAdd={ handleCommandAdd }
          onClickDelete={ handleRemoveSelected }
          onCommandChange={ handleSelect }
        />

        <CommandInput commandId={ selected } />

      </div>

      <div className={ classes.details }>
        <CommandParameters commandId={ selected } />
      </div>

    </div>
  );

}

const AutomationMenuWithStyles = withStyles(creator)(AutomationMenu);
export default connect(mapStateToProps, mapDispatchToProps)(AutomationMenuWithStyles);

