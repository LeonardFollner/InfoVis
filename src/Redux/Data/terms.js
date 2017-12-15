import {createAction} from 'redux-actions';
import {createSelector} from 'reselect';
import {$all, $drop, $get, $merge, $set, $toggle} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';
import {actionTypes as system} from '../System';
import * as json from "../../data.json";

// action types

const START_EDITING = 'EXPLY/DATA/IMPORTER/START_EDITING';
const LOADED_CONFIGURATION = 'EXPLY/DATA/IMPORTER/LOADED_CONFIGURATION';

// actions

const startEditing = createAction(START_EDITING);
const loadedConfiguration = createAction(LOADED_CONFIGURATION);

export const reducer = handleActions({
  [system.INIT]: () => state => {
    return $set('data', json, state);
  },
  [LOADED_CONFIGURATION]: payload => state => {
    return $set('data.importers.currentlyEditedImporter', payload, state);
  },
});

const cardsInSidebar = $get('data.terms');

export const actions = {
  startEditing,
  loadedConfiguration
};

export const actionTypes = {
  START_EDITING,
  LOADED_CONFIGURATION
};

export const selectors = {
  cardsInSidebar,
};
