import '../setup';
import { expect } from 'chai';
import userReducer from '../../../client/reducers/userReducer';
import {
    SET_USER_LIST
} from '../../../client/constants/actionTypes';

describe('reducers', () => {
    it('should handle initial state', () => {
        expect(userReducer(undefined, {})).to.eql({
            userList: [],
            error: ''
        });
    });

    it('should handle SET_USER_LIST', () => {
        expect(userReducer({
            userList: [],
            error: ''
        }, {
            type: SET_USER_LIST,
            userList: ['test', { a: 'b' }]
        })).to.eql({
            userList: ['test', { a: 'b' }],
            error: ''
        });
    });
});
