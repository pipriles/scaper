import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const stylesCreator = (theme) => ({
  root: {
    width: 'calc(100% - 20px)',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1),
    maxWidth: `calc(100% - ${theme.spacing(1)}px)`,
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
    fontSize: '0.9em'
  },
  button: {
    margin: theme.spacing(1)
  }
});

function CommandsToolbar({ classes, onClickAdd, onClickDelete, }) {

  return (
    <div className={ classes.root } >
      <span className={ classes.title }>
        Commands
      </span>
      <div>
        <IconButton 
          onClick={ onClickAdd }
          className={ classes.button } 
          size="small" 
          aria-label="add">
          <AddIcon fontSize="inherit" />
        </IconButton>
        <IconButton 
          onClick={ onClickDelete }
          className={ classes.button } 
          size="small" 
          aria-label="delete">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );

}

export default withStyles(stylesCreator)(CommandsToolbar);
