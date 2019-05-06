import { createStore } from "redux";
import rootReducer from "./reducer";
import Cookies from "js-cookie";
import { setUser } from "./actions/userActions";
import { setEmail } from "./actions/emailActions";

export const store = createStore(rootReducer);

const user = Cookies.getJSON("user");
const email = Cookies.getJSON("email");

if(typeof(user) != "undefined") {
    store.dispatch(setUser(user));
}

if(typeof(email) != "undefined") {
    store.dispatch(setEmail(email));
}

const state = store.getState();

console.log(state);