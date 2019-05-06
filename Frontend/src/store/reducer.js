import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { emailReducer } from "./reducers/emailReducer";

export default combineReducers({
    user: userReducer,
    email: emailReducer,
});