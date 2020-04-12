import { combineReducers } from "redux";
import { otherReducer } from "./otherReducer";

const rootReducer = combineReducers({
  otherReducer,
});

export default rootReducer;
