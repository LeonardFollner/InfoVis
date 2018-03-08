import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const MARKER_CLICKED = 'PROTOTYPE/UI/MARKER/MARKER_CLICKED';
const LOCATION_MARKER_CLICKED = 'PROTOTYPE/UI/MARKER/LOCATION_MARKER_CLICKED';
const EXIT_DETAILS_VIEW = 'PROTOTYPE/UI/DETAILS_VIEW/EXIT_DETAILS_VIEW';

//
// Create actions
//
const markerClicked = createAction(MARKER_CLICKED, id => ({id}));
const locationMarkerClicked = createAction(LOCATION_MARKER_CLICKED, location => ({location}));
const exitDetailsView = createAction(EXIT_DETAILS_VIEW);

//
// Export actions
//
export const actions = {
  markerClicked,
  locationMarkerClicked,
  exitDetailsView
};

export const actionTypes = {
  MARKER_CLICKED,
  LOCATION_MARKER_CLICKED,
  EXIT_DETAILS_VIEW
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      state = $set(['ui', 'detailsView', 'term'], {}, state);
      state = $set(['ui', 'detailsView', 'activeLocationMarker'], undefined, state);
      state = $set('ui.detailsView.isVisible', false, state);
      return state;
    },

  [MARKER_CLICKED]: ({id}) => state => {
    const cardsOnMap = $get(['data', 'cardsOnMap'], state);
    cardsOnMap.forEach(card => {
      if (card.id === parseInt(id, 10)) {
        state = $set(['ui', 'detailsView', 'term'], card, state);
      }
    });
    state = $set(['ui', 'detailsView', 'isVisible'], true, state);
    return state;
  },

  [LOCATION_MARKER_CLICKED]: ({location}) => state => {
    state = $set(['ui', 'detailsView', 'activeLocationMarker'], location, state);
    return state;
  },

  [EXIT_DETAILS_VIEW]: () => state => {
    state = $set('ui.detailsView.isVisible', false, state);
    state = $set('ui.detailsView.term', null, state);
    state = $set(['ui', 'detailsView', 'activeLocationMarker'], undefined, state);
    return state;
  }
});

const isDetailsViewVisible = $get('ui.detailsView.isVisible');
const termInDetailsView = $get('ui.detailsView.term');
const activeLocationMarker = $get('ui.detailsView.activeLocationMarker');

export const selectors = {
  isDetailsViewVisible,
  termInDetailsView,
  activeLocationMarker
};

