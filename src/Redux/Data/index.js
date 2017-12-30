import * as terms from './terms';

export const actions = {
  terms: terms.actions,
};

export const actionTypes = {
  terms: terms.actionTypes,
};

export const reducerArray = [
  terms.reducer,
];

export const selectors = {
  terms: terms.selectors
};
