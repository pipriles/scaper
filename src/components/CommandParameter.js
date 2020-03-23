
function CommandParameter({ parameterType }) {

  switch ( parameterType ) {

    case 'LOCATOR': 
      return null;
    case 'TEXT':
      return null;
    case 'URL': 
      return null;
    case 'TIMEOUT': 
      return null;
    case 'COORDINATES': 
      return null;
    case 'FIELDS': 
      return null;
    default:
      console.log(parameterType);
      return null
  }

}

export default CommandParameter;
