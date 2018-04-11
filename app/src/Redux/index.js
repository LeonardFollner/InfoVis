import * as Data from './Data/index';
import * as UI from './UI/index';
import * as System from './System';

export const actionTypes = {
  Data: Data.actionTypes,
  UI: UI.actionTypes,
  System: System.actionTypes
};

export const actions = {
  Data: Data.actions,
  UI: UI.actions,
  System: System.actions
};

export const reducerArray = [
  ...Data.reducerArray,
  ...UI.reducerArray,
  System.reducer
];

export const selectors = {
  Data: Data.selectors,
  UI: UI.selectors
};
