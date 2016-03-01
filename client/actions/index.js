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
import {
    getUserList as getUserListFromServer,
    createUser as createUserFromServer,
    updateUser as updateUserFromServer,
    removeUser as removeUserFromServer
} from '../services';

export function getUserList() {
    return (dispatch) => {
        getUserListFromServer()
        .then((res) => {
            dispatch({
                type: SET_USER_LIST,
                userList: res
            });
        })
        .catch(() => {
            dispatch({
                type: SERVER_CALL_ERROR,
                message: 'Call get user list failed'
            });
        });
    };
}

export function createUser(firstname, surname, category) {
    return (dispatch) => {
        createUserFromServer({ firstname, surname, category })
        .then((res) => {
            dispatch(res.success ? {
                type: CREATE_USER_SUCCESS,
                user: {
                    id: res.id,
                    firstname,
                    surname,
                    category
                }
            } : {
                type: CREATE_USER_FAIL,
                error: res.error
            });
        })
        .catch(() => {
            dispatch({
                type: SERVER_CALL_ERROR,
                message: 'Create user failed'
            });
        });
    };
}

export function updateUser(id, firstname, surname, category) {
    return (dispatch) => {
        updateUserFromServer({ id, firstname, surname, category })
        .then((res) => {
            dispatch(res.success ? {
                type: UPDATE_USER_SUCCESS,
                user: {
                    id,
                    firstname,
                    surname,
                    category
                }
            } : {
                type: UPDATE_USER_FAIL,
                error: res.error
            });
        })
        .catch(() => {
            dispatch({
                type: SERVER_CALL_ERROR,
                message: 'Update user failed'
            });
        });
    };
}

export function removeUser(id) {
    return (dispatch) => {
        removeUserFromServer(id)
        .then((res) => {
            dispatch(res.success ? {
                type: REMOVE_USER_SUCCESS,
                id
            } : {
                type: REMOVE_USER_FAIL,
                error: res.error
            });
        })
        .catch(() => {
            dispatch({
                type: SERVER_CALL_ERROR,
                message: 'Remove user failed'
            });
        });
    };
}

export function removeError() {
    return {
        type: REMOVE_ERROR
    };
}
