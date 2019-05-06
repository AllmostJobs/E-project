import { SET_EMAIL } from "../actions/emailActions";

const defaultState = false;

export const emailReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_EMAIL: 
            return payload
    }
    return state;
}