import {createAction} from 'redux-actions';
import {createSelector} from 'reselect';
import {$add, $all, $drop, $get, $merge, $pop, $set, $toggle} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';
import {actionTypes as system} from '../System';
import * as json from "../../data.json";

// action types

const CARD_DROPPED = 'PROTOTYPE/DATA/TERMS/DROPPED_CARD';

// actions

const cardDropped = createAction(CARD_DROPPED);

export const reducer = handleActions({
  [system.INIT]: () => state => {
    state = $set('data', json, state);
    state = $set(['data', 'cardsInSideBar'], [], state);
    for (let i = 0; i < 5; i++) {
      const term = $get(terms(state).length - 1, terms(state));
      state = $add(['data', 'cardsInSideBar'], term, state);
      state = $pop(['data', 'terms'], state);
    }
    state = $set(['data', 'cardsOnMap'], {}, state);
    return state;
  },
  [CARD_DROPPED]: payload => state => {
    console.log(payload);

    return state;
  }
});

const terms = $get('data.terms');
const cardsInSidebar = $get('data.cardsInSideBar');
const cardsOnMap = $get('data.cardsOnMap');

export const actions = {
  cardDropped
};

export const actionTypes = {
  CARD_DROPPED: CARD_DROPPED
};

export const selectors = {
  terms,
  cardsInSidebar,
  cardsOnMap
};
