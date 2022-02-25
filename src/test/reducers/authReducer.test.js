import { types } from "../../types/types";
import { authReducer } from '../../reducers/authReducer';
describe('should test in auth reducer', () => {

    test('should make login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Rocas'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid:'abc',
            name:'Rocas'
        })
    });
    
    test('should not make changes in state', () => {

        const initState = {
            uid: 'afdajdhajhl',
            name: 'Rocas'
        };

        const action = {
            type: 'afafadf'
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual(initState);
    });
    
    test('should make logout', () => {

        const initState = {
            uid: 'afdajdhajhl',
            name: 'Rocas'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
    });
})