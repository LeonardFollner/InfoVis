import {createAction} from 'redux-actions';
import {handleActions} from '../Utility/HandleActions';

//
// actionTypes
//
const INIT = '@@INIT';

//
// Create actions
//
const init = createAction(INIT, initialState => initialState);

//
// Export actions
//
export const actions = {
  init
};

export const actionTypes = {
  INIT
};

//
// Export reducer
//
export const reducer = handleActions({});
