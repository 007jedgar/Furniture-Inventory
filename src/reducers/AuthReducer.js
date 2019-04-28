import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    SAVE_USER,
    SAVE_USER_FAIL,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../actions/types'

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, }
        case PASSWORD_CHANGED: 
            return {state, }
        case LOGIN_USER_SUCCESS:
            return { ...state, }
        case LOGIN_USER_FAILED:
            return { ...state, }
        case LOGIN_USER:
            return { ...state, }
        case SAVE_USER:
            return { ...state, }
        case SAVE_USER_FAIL:
            return { ...state, }
        case SIGNUP_USER_FAIL:
            return { ...state, }
        case SIGNUP_USER_SUCCESS:
            return { ...state, }
        case SIGNUP_USER:
            return { ...state, }
        case LOGOUT_USER:
            return { ...state, }
        case LOGOUT_USER_SUCCESS:
            return { ...state, }
        case LOGOUT_USER_FAIL:
            return { ...state, }
        default:
            return state;
    }
}