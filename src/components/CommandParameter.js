import React from 'react';
import LocatorParameter from './LocatorParameter';

function parameterComponent(parameterType) {

  switch ( parameterType ) {

    case 'LOCATOR': 
      return LocatorParameter;
    case 'TEXT':
      return null;
    case 'URL': 
      return null;
    case 'TIMEOUT': 
      return null;
    case 'COORDINATES': 
      return null;
    case 'STRIP': 
      return null;
    case 'COLLECTION':
      return null;
    case 'ATTRIBUTE':
      return null;
    default:
      console.log(parameterType);
      return null;
  };
}

function CommandParameter({ type, parameter, onChange }) {

  console.log(type)
  const Component = parameterComponent(type);

  console.log(parameter);

  if ( !Component || !parameter )
    return null;

  return ( 
    <Component parameter={ parameter } onChange={ onChange } />
  );
}

export default CommandParameter;
