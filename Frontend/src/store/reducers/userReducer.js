import { SET_USER } from "../actions/userActions";

const defaultState = {};

export const userReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_USER: 
            return {
                ...payload
            }
    }
    return state;
}