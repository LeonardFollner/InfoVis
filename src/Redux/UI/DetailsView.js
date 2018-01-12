import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const TOGGLE_DETAILS_VIEW_VISIBILITY = 'UI/DetailsView/TOGGLE_DETAILS_VIEW_VISIBILITY';
const MARKER_CLICKED = 'PROTOTYPE/UI/MARKER/MARKER_CLICKED';

//
// Create actions
//
const toggleMenuVisibility = createAction(TOGGLE_DETAILS_VIEW_VISIBILITY);
const markerClicked = createAction(MARKER_CLICKED, id => ({id}));

//
// Export actions
//
export const actions = {
  toggleMenuVisibility,
  markerClicked
};

export const actionTypes = {
  TOGGLE_DETAILS_VIEW_VISIBILITY,
  MARKER_CLICKED
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      state = $set(['ui', 'detailsView', 'term'], {}, state);
      state = $set('ui.detailsView.isVisible', false, state);
      return state;
    },

  [TOGGLE_DETAILS_VIEW_VISIBILITY]: () =>
    state => {
      return $set('ui.detailsView.isVisible', !($get('ui.detailsView.isVisible', state)), state);
    },

  [MARKER_CLICKED]: ({id}) => state => {
    const cardsOnMap = $get(['data', 'cardsOnMap'], state);
    cardsOnMap.forEach(card => {
      if (card.id === parseInt(id, 10)) {
        state = $set(['ui', 'detailsView', 'term'], card, state)
      }
    });
    state = $set(['ui', 'detailsView', 'isVisible'], true, state);
    return state;
  }
});

const isDetailsViewVisible = $get('ui.detailsView.isVisible');
const termInDetailsView = $get('ui.detailsView.term');

export const selectors = {
  isDetailsViewVisible,
  termInDetailsView
};

