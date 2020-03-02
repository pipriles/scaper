import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(0, 1),
    width: 'calc(100% - 20px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  text: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
    fontSize: '0.75em'
  },
  button: {
    margin: theme.spacing(1)
  },
  selected: {
    backgroundColor: theme.palette.primary.dark
  }
});

function Command({ classes, selected, command, onClickMore, ...other }) {

  let rootClass = classes.root

  if (selected)
    rootClass += ` ${classes.selected}`

  return (
    <>
      <div className={ rootClass } { ...other }> 
        <span className={ classes.text }> { command.commandType } </span>
        <IconButton 
          onClick={ onClickMore }
          className={ classes.button } 
          size="small" 
          aria-label="delete">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
      </div>
    </>
  );

}

export default withStyles(styles)(Command);
