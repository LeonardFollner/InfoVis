import {createAction} from 'redux-actions';
import {createSelector} from 'reselect';
import {$add, $drop, $get, $pop, $set, $shift} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';
import {actionTypes as system} from '../System';
import data from '../../data.js';
import {TargetRegions} from "../../constants";

// action types

const CARD_DROPPED = 'PROTOTYPE/DATA/TERMS/DROPPED_CARD';

// actions

const cardDropped = createAction(CARD_DROPPED);

export const reducer = handleActions({
  [system.INIT]: () => state => {
    state = $set(['data', 'terms'], data, state);
    state = $set(['data', 'cardsInSideBar'], [], state);
    state = $set(['data', 'cardsOnMap', TargetRegions.EUROPE], [], state);
    state = $set(['data', 'cardsOnMap', TargetRegions.ARAB], [], state);
    for (let i = 0; i < 5; i++) {
      const term = $get(0, terms(state));
      state = $add(['data', 'cardsInSideBar'], term, state);
      state = $shift(['data', 'terms'], state);
    }
    return state;
  },
  [CARD_DROPPED]: id => state => {
    const cardsInSideBar = cardsInSidebar(state);
    cardsInSideBar.forEach((card, index) => {
      if (card.id === id) {
        state = $drop(['data', 'cardsInSideBar', index], state);
        state = $add(['data', 'cardsOnMap', card.targetRegion], card, state);
      }
    });
    // add a new term from the pool to the sidebar
    if (terms(state).length > 0) {
      const newTermForSideBar = $get(terms(state).length - 1, terms(state));
      state = $add(['data', 'cardsInSideBar'], newTermForSideBar, state);
      state = $shift(['data', 'terms'], state);
    }

    return state;
  }
});

const terms = $get('data.terms');
const cardsInSidebar = $get('data.cardsInSideBar');
const cardsOnMap = $get('data.cardsOnMap');
const cardsOnMapPerRegion = () => {
  return createSelector(
    cardsOnMap,
    (_, region) => region,
    (cardsOnMap, region) => {
      return $get([region], cardsOnMap);
    }
  );
};

export const actions = {
  cardDropped
};

export const actionTypes = {
  CARD_DROPPED: CARD_DROPPED
};

export const selectors = {
  terms,
  cardsInSidebar,
  cardsOnMap: cardsOnMapPerRegion
};