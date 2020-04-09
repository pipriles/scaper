import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/button';

import { runCommands } from '../command-sender.js';

const mapStateToProps = (state) => {
  return {
    commands: state.steps.map( s => state.commands[s] ).filter( x => x )
  }
};

function RecipePlayer({ commands }) {

  console.log(commands);

  const handleClick = () => {
    console.log('Start scraping!');
    runCommands(commands);
  };

  return (
    <Button variant="outlined" fullWidth onClick={ handleClick } >
      Extract
    </Button>
  );
}

export default connect(mapStateToProps, null)(RecipePlayer);
