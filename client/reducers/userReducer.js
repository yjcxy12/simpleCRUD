import {
    SET_USER_LIST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAIL,
    SERVER_CALL_ERROR,
    REMOVE_ERROR
} from '../constants/actionTypes';
import assign from 'object-assign';

const initialState = {
    userList: [],
    error: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_LIST:
            return assign({}, state, {
                userList: action.userList
            });
        case CREATE_USER_SUCCESS:
            return assign({}, state, {
                userList: state.userList.concat(action.user)
            });
        case CREATE_USER_FAIL:
            console.error(action.error);
            return assign({}, state, {
                error: action.error
            });
        case UPDATE_USER_SUCCESS:
            return assign({}, state, {
                userList: state.userList.map((user) => {
                    if (user.id !== action.user.id) return user;
                    return action.user;
                })
            });
        case UPDATE_USER_FAIL:
            console.error(action.error);
            return assign({}, state, {
                error: action.error
            });
        case REMOVE_USER_SUCCESS:
            return assign({}, state, {
                userList: state.userList.filter((user) => user.id !== action.id)
            });
        case REMOVE_USER_FAIL:
            console.error(action.error);
            return assign({}, state, {
                error: action.error
            });
        case SERVER_CALL_ERROR:
            console.error(action.error);
            return assign({}, state, {
                error: action.message
            });
        case REMOVE_ERROR:
            return assign({}, state, {
                error: ''
            });
        default:
            return state;
    }
}
