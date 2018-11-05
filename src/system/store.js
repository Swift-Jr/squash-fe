import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./rootReducer";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export const {dispatch} = store;
