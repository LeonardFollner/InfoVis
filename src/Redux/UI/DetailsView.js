import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const TOGGLE_DETAILS_VIEW_VISIBILITY = 'UI/DetailsView/TOGGLE_DETAILS_VIEW_VISIBILITY';

//
// Create actions
//
const toggleMenuVisibility = createAction(TOGGLE_DETAILS_VIEW_VISIBILITY);

//
// Export actions
//
export const actions = {
  toggleMenuVisibility
};

export const actionTypes = {
  TOGGLE_DETAILS_VIEW_VISIBILITY: TOGGLE_DETAILS_VIEW_VISIBILITY
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      return $set('ui.detailsView', false, state);
    },

  [TOGGLE_DETAILS_VIEW_VISIBILITY]: () =>
    state => {
      return $set('ui.detailsView', !($get('ui.detailsView', state)), state);
    }
});

const isDetailsViewVisible = $get('ui.detailsView');

export const selectors = {
  isDetailsViewVisible
};

