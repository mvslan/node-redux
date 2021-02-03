import { combineReducers, compose } from "redux";
import authReducer from "./reducers/authReducer";
import chatUserReducer from "./reducers/chatUserReducer";

const reducer = combineReducers({
  auth: authReducer,
  chatUser: chatUserReducer,
});

export { reducer };
