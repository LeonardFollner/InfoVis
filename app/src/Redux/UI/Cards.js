import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const CARD_IS_BEING_DRAGGED = 'UI/Cards/CARD_IS_BEING_DRAGGED';
const CARD_DROPPED = 'UI/Cards/CARD_DROPPED';

//
// Create actions
//
const cardIsBeingDragged = createAction(CARD_IS_BEING_DRAGGED);
const cardDropped = createAction(CARD_DROPPED);

//
// Export actions
//
export const actions = {
  cardIsBeingDragged,
  cardDropped,
};

export const actionTypes = {
  CARD_IS_BEING_DRAGGED: CARD_IS_BEING_DRAGGED,
  CARD_DROPPED: CARD_DROPPED,
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      return $set(['ui', 'cardDragging'], {
        cardIsBeingDragged: false,
        targetRegion: ''
      }, state);
    },

  [CARD_IS_BEING_DRAGGED]: targetRegion =>
    state => {
      state = $set(['ui', 'cardDragging', 'cardIsBeingDragged'], true, state);
      return $set(['ui', 'cardDragging', 'targetRegion'], targetRegion, state);
    },

  [CARD_DROPPED]: () =>
    state => {
      state = $set(['ui', 'cardDragging', 'cardIsBeingDragged'], false, state);
      state = $set(['ui', 'cardDragging', 'targetRegion'], '', state);

      return state;
    },
});

const isCardBeingDragged = $get(['ui', 'cardDragging', 'cardIsBeingDragged']);
const targetRegionOfDraggedCard = $get(['ui', 'cardDragging', 'targetRegion']);

export const selectors = {
  isCardBeingDragged,
  targetRegionOfDraggedCard
};

