import * as DetailsView from './DetailsView';
import * as Cards from './Cards';
import * as About from './About';

export const actionTypes = {
  DetailsView: DetailsView.actionTypes,
  Cards: Cards.actionTypes,
  About: About.actionTypes
};

export const actions = {
  DetailsView: DetailsView.actions,
  Cards: Cards.actions,
  About: About.actions
};

export const reducerArray = [
  DetailsView.reducer,
  Cards.reducer,
  About.reducer
];

export const selectors = {
  DetailsView: DetailsView.selectors,
  Cards: Cards.selectors,
  About: About.selectors
};
