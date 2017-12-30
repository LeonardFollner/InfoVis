import * as DetailsView from './DetailsView';
import * as Cards from './Cards';

export const actionTypes = {
  DetailsView: DetailsView.actionTypes,
  Cards: Cards.actionTypes,
};

export const actions = {
  DetailsView: DetailsView.actions,
  Cards: Cards.actions,
};

export const reducerArray = [
  DetailsView.reducer,
  Cards.reducer,
];

export const selectors = {
  DetailsView: DetailsView.selectors,
  Cards: Cards.selectors,
};
