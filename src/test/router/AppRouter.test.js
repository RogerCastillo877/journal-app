import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import { firebase } from '../../firebase/firebase-config';

import { login } from "../../actions/auth";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AppRouter } from "../../Routers/AppRouter";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

configure({adapter: new Adapter()});

jest.mock( '../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'afdafa',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('should test <AppRouter />', () => {

    test('should call login if user id authenticated', async() => {

        let user;

        await act( async() => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('email@email.com','123456');
            user = userCred.user;
            
            const wrapper = mount(
                <MemoryRouter>
                    <Provider store={ store }>
                        <AppRouter />
                    </Provider>
                </MemoryRouter>
            );
        })

        expect( login ).toHaveBeenCalledWith('JYHX4QJ5n2VHA1Aet4UM7I1xBo53', null);
    })
})