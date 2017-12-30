import * as Data from './Data/index';
import * as UI from './UI/index';

export const actionTypes = {
  Data: Data.actionTypes,
  UI: UI.actionTypes,
};

export const actions = {
  Data: Data.actions,
  UI: UI.actions,
};

export const reducerArray = [
  ...Data.reducerArray,
  ...UI.reducerArray
];

export const selectors = {
  Data: Data.selectors,
  UI: UI.selectors
};
