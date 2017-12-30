import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const TOGGLE_CARD_IS_BEING_DRAGGED = 'UI/Cards/TOGGLE_CARD_IS_BEING_DRAGGED';

//
// Create actions
//
const toggleCardIsBeingDragged = createAction(TOGGLE_CARD_IS_BEING_DRAGGED);

//
// Export actions
//
export const actions = {
  toggleCardIsBeingDragged
};

export const actionTypes = {
  TOGGLE_CARD_IS_BEING_DRAGGED: TOGGLE_CARD_IS_BEING_DRAGGED
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      return $set('ui.cardIsBeingDragged', false, state);
    },

  [TOGGLE_CARD_IS_BEING_DRAGGED]: () =>
    state => {
      return $set('ui.cardIsBeingDragged', !($get('ui.cardIsBeingDragged', state)), state);
    }
});

const isCardBeingDragged = $get('ui.cardIsBeingDragged');

export const selectors = {
  isCardBeingDragged
};

