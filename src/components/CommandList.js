import React from 'react';

import CommandsToolbar from './CommandsToolbar.js';
import Command from './Command';

function CommandList({ classes, commands, selected, onClickAdd, onClickDelete, onCommandChange }) {

  return (
    <div className={ classes.root }>

      <CommandsToolbar 
        onClickAdd={ onClickAdd } 
        onClickDelete={ onClickDelete }
      />

      <div className={ classes.innerList }>
        { commands.map( (cmd) => 
          <Command 
            onClick={ onCommandChange(cmd.id) }
            onClickMore= { (event) => event.stopPropagation() }
            selected={ selected === cmd.id }
            key={ cmd.id } 
            command={ cmd } 
          /> ) }
      </div>

    </div>
  );

}

export default CommandList;

