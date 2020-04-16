import { combineReducers } from "redux";
import { otherReducer } from "./otherReducer";
import { loginReducer } from "./loginReducer";

// combineReducers just takes multiple reducers and puts them all into one big
// reducer. We write reducers in different places because it's clearer to
// separate them. This also means never write the exact same case for two
// reducers because the behavior will be unexpected
const rootReducer = combineReducers({
  otherReducer,
  loginReducer,
});

export default rootReducer;
