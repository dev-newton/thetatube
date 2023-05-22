import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";
import getWalletReducer from "./reducers/getWallet";

const rootReducer = combineReducers({
  getWallet: getWalletReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);

export default store;
