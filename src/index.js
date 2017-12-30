import React from 'react';
import ReactDOM from 'react-dom';
import Prototyp from './Components/Prototyp';
import registerServiceWorker from './registerServiceWorker';
import {actions, reducerArray} from "./Redux";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {combineReducers} from "./Utility/HandleActions";

const store = createStore(
  combineReducers(reducerArray),
  {}, // initial empty state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // used for chrome redux-extension
);

// Dispatch cross-browser Init signal
store.dispatch(actions.System.init({}));

ReactDOM.render(
  <Provider store={store}>
    <Prototyp/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
