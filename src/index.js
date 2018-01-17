import React from 'react';
import ReactDOM from 'react-dom';
import Prototyp from './Components/Prototyp';
import registerServiceWorker from './registerServiceWorker';
import {actions, reducerArray} from "./Redux";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {combineReducers} from "./Utility/HandleActions";
import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

const store = createStore(
  combineReducers(reducerArray),
  {}, // initial empty state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // used for chrome redux-extension
);

// Dispatch cross-browser Init signal
store.dispatch(actions.System.init({}));

// enable mobile drag and drop polyfill
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});
// workaround for drag and drop scrolling window in mobile safari
window.addEventListener('touchmove', function () {
});

ReactDOM.render(
  <Provider store={store}>
    <Prototyp/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
