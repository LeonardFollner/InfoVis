/**
 * Wrapper Function which is used to define reducers for actions.
 *
 * It expects an object, where the key is the action type, and the value is of type (payload) => (state) => newState,
 * i.e. a function receiving payload, returning another function receiving state, finally returning the new state.
 *
 * Example Usage:
 *
 * handleActions({
 *   "MY_ACTION": (payload) => (state) => {
 *     // somehow combine payload and state, returning the new state
 *
 *     // e.g. access payload.partOfLabel.
 *     payload.partOfLabel;
 *     return state;
 *   },
 *   "MY_ACTION_DESTRUCTURING": ({partOfLabel}) => (state) => {
 *     // now, you can directly access partOfLabel.
 *   }
 *   "WorksWellWith $get": ({partOfLabel}) => $set('foo', partOfLabel)
 * })
 *
 * The last example is especially important: Because $set is curried, you can partially apply the function
 * without needing the state parameter.
 */
export function handleActions(handlers = {}) {
  return function (state, action) {
    const handler = handlers[action.type];

    if (handler) {
      return handler(action.payload)(state);
    }

    return state;
  };
}

/**
 * This is basically the counterpart to "handleActions" which should be used on top level to combine all reducer
 * functions.
 *
 * This means the `handlers` parameter is an array of functions; exactly the functions being created by handleActions(...)
 */
export function combineReducers(handlers) {
  return function (state, action) {
    if (Array.isArray(handlers)) {
      return handlers.reduce((state, handler) => handler(state, action), state);
    } else {
      console.error('CombineReducers handlers must be an array.');
    }
  };
}
