import React, { useState } from 'react';
import { connect } from 'react-redux';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import browser from '../browser-proxy';
import store from '../store'; 
import * as actions from '../actions';
import { getField } from '../selectors';

import ExtractionField from './ExtractionField';

import './ExtractionMenu.css';

const extractData = async (setUrl) => {
  let { activeTab } = store.getState();
  let resp = await sendMessageActiveTab(activeTab);
  if (resp) setUrl(resp.url);
};

const sendMessageActiveTab = async (tab) => {
  if ( !tab ) return 
  const payload = 'OK';
  let resp = await browser.tabs.sendMessage(
      tab.id, { payload }
  );
  return resp
}

const mapStateToProps = (state) => {
  // for now just take first command
  const command = state.commands['1'];
  const { fields: ids } = command.parameters;
  const fields = ids.map((id) => getField(state, id));
  return { command, fields };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFieldKeyChange: (field) => (event) => {
      const payload = { 
        id: field.id,
        fieldKey: event.target.value 
      };
      const action = actions.updateField(payload);
      console.log(action);
      dispatch(action);
    },
    onFieldValueChange: (field) => (event, value) => {
      const payload = { 
        id: field.id, 
        selectorId: value.id 
      };
      const action = actions.updateField(payload);
      dispatch(action);
    },
    onAddField: (command) => {
      const action = actions.addField(command.id);
      dispatch(action);
    },
    onRemoveField: (command, id) => {
      const action = actions.removeField(command.id, id);
      console.log(action);
      dispatch(action);
    }
  }
};

function ExtractionMenu(props) {

  const { command, fields } = props;
  const [ url, setUrl ] = useState('');
  const [ selected, setSelected ] = useState(null);

  const onSelectField = (id) => setSelected(id);

  const { onFieldKeyChange } = props;
  const { onFieldValueChange } = props;
  const { onAddField } = props;
  const { onRemoveField } = props;

  // fetch selectors here
  // pass it to extraction field
  
  return (
    <div className="ExtractionMenu">
      <div className="ExtractionMenu-block">
        { url && ( <p>{ url }</p> ) }
        <div className="ExtractionMenu-fields">
          { Object.values(fields).map( 
            (field) => 
              <ExtractionField 
                key={ field.id } 
                field={ field }
                onFieldKeyChange={ onFieldKeyChange }
                onFieldValueChange={ onFieldValueChange }
                onClick={ onSelectField }
              /> 
          ) }
        </div>
        <br />
        <ButtonGroup 
          size="small" 
          aria-label="small outlined button group"
          fullWidth={ true }
        >
          <Button 
            variant="outlined"
            fullWidth={ true }
            startIcon={ <AddIcon /> }
            onClick={ () => onAddField(command) }
            className="ExtractionMenu-add-button"
          >
            Add Field
          </Button>
          <Button 
            variant="outlined"
            fullWidth={ true }
            startIcon={ <DeleteIcon /> }
            onClick={ () => {
              onRemoveField(command, selected);
              setSelected(null);
            } }
            className="ExtractionMenu-add-button"
          >
            Delete Field
          </Button>
        </ButtonGroup>
      </div>
      <div className="ExtractionMenu-block">
        <button 
          className="ExtractionMenu-button"
          onClick={ () => extractData(setUrl) }>
          Extract
        </button>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ExtractionMenu);
