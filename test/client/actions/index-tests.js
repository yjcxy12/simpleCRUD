import '../setup';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions';
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
} from '../../../client/constants/actionTypes';

const mockStore = configureMockStore([thunk]);
const mockUserList = [
    {
        id: '1',
        firstname: 'Jeff',
        surname: 'Stelling',
        category: 'admin'
    }
];

afterEach(() => {
    nock.cleanAll();
});

describe('actions', () => {
    describe('#getUserList()', () => {
        it('should get user lsit', (done) => {
            nock('http://localhost:3000')
                .get('/users')
                .reply(200, mockUserList);
            const store = mockStore(
                { userList: [] },
                [{
                    type: SET_USER_LIST,
                    userList: mockUserList
                }],
                done);
            store.dispatch(actions.getUserList());
        });

        it('should dispatch SERVER_CALL_ERROR action when call failed', (done) => {
            nock('http://localhost:3000')
                .get('/users')
                .reply(404);
            const store = mockStore(
                { userList: [] },
                [{
                    type: SERVER_CALL_ERROR,
                    message: 'Call get user list failed'
                }],
                done);
            store.dispatch(actions.getUserList());
        });
    });

    describe('#createUser()', () => {
        it('should add new user to user list', (done) => {
            nock('http://localhost:3000')
                .post('/users/new', {
                    firstname: 'Jeff',
                    surname: 'Stelling',
                    category: 'admin'
                })
                .reply(200, { success: true, id: '7' });
            const store = mockStore(
                { userList: [] },
                [{
                    type: CREATE_USER_SUCCESS,
                    user: {
                        id: '7',
                        firstname: 'Jeff',
                        surname: 'Stelling',
                        category: 'admin'
                    }
                }],
                done);
            store.dispatch(actions.createUser('Jeff', 'Stelling', 'admin'));
        });

        it('should dipatch failed action when not successful', (done) => {
            nock('http://localhost:3000')
                .post('/users/new', {
                    firstname: 'Jeff',
                    surname: 'Stelling',
                    category: 'admin'
                })
                .reply(200, { success: false, error: 'error' });
            const store = mockStore(
                { userList: [] },
                [{
                    type: CREATE_USER_FAIL,
                    error: 'error'
                }],
                done);
            store.dispatch(actions.createUser('Jeff', 'Stelling', 'admin'));
        });

        it('should dispatch SERVER_CALL_ERROR action when call failed', (done) => {
            nock('http://localhost:3000')
                .post('/users/new')
                .reply(404);
            const store = mockStore(
                { userList: [] },
                [{
                    type: SERVER_CALL_ERROR,
                    message: 'Create user failed'
                }],
                done);
            store.dispatch(actions.createUser());
        });
    });

    describe('#updateUser()', () => {
        it('should update user', (done) => {
            nock('http://localhost:3000')
                .put('/users/4', {
                    id: '4',
                    firstname: 'Jeff',
                    surname: 'Stelling',
                    category: 'admin'
                })
                .reply(200, { success: true });
            const store = mockStore(
                { userList: [] },
                [{
                    type: UPDATE_USER_SUCCESS,
                    user: {
                        id: '4',
                        firstname: 'Jeff',
                        surname: 'Stelling',
                        category: 'admin'
                    }
                }],
                done);
            store.dispatch(actions.updateUser('4', 'Jeff', 'Stelling', 'admin'));
        });

        it('should dipatch failed action when not successful', (done) => {
            nock('http://localhost:3000')
                .put('/users/4', {
                    id: '4',
                    firstname: 'Jeff',
                    surname: 'Stelling',
                    category: 'admin'
                })
                .reply(200, { success: false, error: 'error' });
            const store = mockStore(
                { userList: [] },
                [{
                    type: UPDATE_USER_FAIL,
                    error: 'error'
                }],
                done);
            store.dispatch(actions.updateUser('4', 'Jeff', 'Stelling', 'admin'));
        });

        it('should dispatch SERVER_CALL_ERROR action when call failed', (done) => {
            nock('http://localhost:3000')
                .put('/users/4')
                .reply(404);
            const store = mockStore(
                { userList: [] },
                [{
                    type: SERVER_CALL_ERROR,
                    message: 'Update user failed'
                }],
                done);
            store.dispatch(actions.updateUser());
        });
    });

    describe('#removeUser()', () => {
        it('should update user', (done) => {
            nock('http://localhost:3000')
                .delete('/users/4')
                .reply(200, { success: true });
            const store = mockStore(
                { userList: [] },
                [{
                    type: REMOVE_USER_SUCCESS,
                    id: '4'
                }],
                done);
            store.dispatch(actions.removeUser('4'));
        });

        it('should dipatch failed action when not successful', (done) => {
            nock('http://localhost:3000')
                .delete('/users/4')
                .reply(200, { success: false, error: 'error' });
            const store = mockStore(
                { userList: [] },
                [{
                    type: REMOVE_USER_FAIL,
                    error: 'error'
                }],
                done);
            store.dispatch(actions.removeUser('4'));
        });

        it('should dispatch SERVER_CALL_ERROR action when call failed', (done) => {
            nock('http://localhost:3000')
                .delete('/users/4')
                .reply(404);
            const store = mockStore(
                { userList: [] },
                [{
                    type: SERVER_CALL_ERROR,
                    message: 'Remove user failed'
                }],
                done);
            store.dispatch(actions.removeUser());
        });
    });

    describe('#removeError()', () => {
        it('should dispatch remove error event', () => {
            expect(actions.removeError()).to.eql({
                type: REMOVE_ERROR
            });
        });
    });
});
