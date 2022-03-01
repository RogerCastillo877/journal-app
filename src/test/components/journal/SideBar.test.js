import { configure, mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

configure({adapter: new Adapter()});

jest.mock( '../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock( '../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: '3431',
        name: 'Rocas'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);

describe('should test <SideBar />', () => {

    test('should display properly', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('should call Logout', () => {

        wrapper.find('button').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled();
    })

    test('should call startNewNote', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    })
})