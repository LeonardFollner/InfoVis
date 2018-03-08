import * as terms from './terms';
import * as locations from "./locations";

export const actions = {
  terms: terms.actions,
};

export const actionTypes = {
  terms: terms.actionTypes,
};

export const reducerArray = [
  terms.reducer,
  locations.reducer
];

export const selectors = {
  terms: terms.selectors,
  locations: locations.selectors
};
