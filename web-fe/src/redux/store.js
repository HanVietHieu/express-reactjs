import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { serviceMiddleware } from "./middlewares";
import { reducerAirtimeBitel } from "./future/reducer";
const reducers = combineReducers({
  dataBitel: reducerAirtimeBitel
});

export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, serviceMiddleware))
  );
  return store;
}

export { reducers };

export const store = configureStore();
