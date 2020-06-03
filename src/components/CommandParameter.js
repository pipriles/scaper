import React from 'react';
import LocatorParameter from './LocatorParameter';
import TextParameter from './TextParameter';
import UrlParameter from './UrlParameter';
import TimeoutParameter from './TimeoutParameter';
import AttributeParameter from './AttributeParameter';
import CoordinatesParameter from './CoordinatesParameter';
import StripParameter from './StripParameter';
import CollectionParameter from './CollectionParameter';

function parameterComponent(parameterType) {

  switch ( parameterType ) {

    case 'LOCATOR': 
      return LocatorParameter;
    case 'TEXT':
      return TextParameter;
    case 'URL': 
      return UrlParameter;
    case 'TIMEOUT': 
      return TimeoutParameter;
    case 'COORDINATES': 
      return CoordinatesParameter;
    case 'STRIP': 
      return StripParameter;
    case 'COLLECTION':
      return CollectionParameter;
    case 'ATTRIBUTE':
      return AttributeParameter;
    default:
      console.log(parameterType);
      return null;
  };
}

function CommandParameter({ type, parameter, onChange, ...other }) {

  const Component = parameterComponent(type);

  if ( !Component || parameter === undefined )
    return null;

  return ( 
    <div { ...other }>
      <Component parameter={ parameter } onChange={ onChange } />
    </div>
  );
}

export default CommandParameter;
