import {$get, $set} from 'plow-js';
import {handleActions} from '../../Utility/HandleActions';
import {actionTypes as system} from '../System';

export const reducer = handleActions({
  [system.INIT]: () => state => {
    state = $set(['data', 'locations'], window.locations, state);
    return state;
  }
});

const allLocations = $get('data.locations');

export const selectors = {
  allLocations
};
