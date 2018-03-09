import {createAction} from 'redux-actions';
import {actionTypes as system} from '../System';
import {$get, $set, $toggle} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';

//
// actionTypes
//
const TOGGLE_ABOUT_PAGE = 'PROTOTYPE/UI/ABOUT/TOGGLE_ABOUT_PAGE';

//
// Create actions
//
const toggleAboutPage = createAction(TOGGLE_ABOUT_PAGE);

//
// Export actions
//
export const actions = {
  toggleAboutPage
};

export const actionTypes = {
  TOGGLE_ABOUT_PAGE
};

//
// Export reducer
//

export const reducer = handleActions({
  [system.INIT]: () =>
    state => {
      state = $set(['ui', 'about', 'isVisible'], false, state);
      return state;
    },

  [TOGGLE_ABOUT_PAGE]: () => state => {
    state = $toggle(['ui', 'about', 'isVisible'], state);
    return state;
  },
});

const isAboutVisible = $get('ui.about.isVisible');

export const selectors = {
  isAboutVisible
};

