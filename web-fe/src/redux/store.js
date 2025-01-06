import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { serviceMiddleware } from "./middlewares";
import { reducerUser } from "./future/account/reducer";
const reducers = combineReducers({
  reducerUser: reducerUser
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
