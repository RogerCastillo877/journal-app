import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)


const initState = {};

let store = mockStore(initState);

describe('should test auth actions', () => {

    beforeEach( () => {
        store = mockStore(initState);
    })

    test('should login and logout create the action', () => {

        const uid = 'ABC123';
        const displayName = 'Rocas';

        const loginAction = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    });

    test('should do the startLogout', async() => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.logout
        });
        
        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })
    });

    test('should init starLoginEmailPassword', async() => {

        await store.dispatch( startLoginEmailPassword('email@email.com', '123456') );

        const actions = store.getActions();
        
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'JYHX4QJ5n2VHA1Aet4UM7I1xBo53',
                displayName: null
            }
        })
    })
})