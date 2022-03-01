import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import { Register } from "../../components/auth/Register";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { types } from "../../types/types";

configure({adapter: new Adapter()});

// jest.mock( '../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
    <MemoryRouter>
        <Provider store={ store }>
            <Register />
        </Provider>
    </MemoryRouter>
);

describe('should test <Register />', () => {

    test('should display properly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch with respective action', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            prevenDefault(){}
        });

        const actions = store.getActions();
   
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    });

    test('should display error message in a box', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Invalid email'
            }
        };
        
        const store = mockStore(initState);
        
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={ store }>
                    <Register />
                </Provider>
            </MemoryRouter>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe('Invalid email');
    })
})