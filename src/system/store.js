import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./rootReducer";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(rootReducer);

export default store;
export const {dispatch} = store;
