import { configure, mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";


configure({adapter: new Adapter()});

jest.mock( '../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: 1234,
            title: 'Hello',
            body: 'world',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);

describe('should test <NoteScreen />', () => {

    test('should first', () => {

        expect( NoteScreen ).toMatchSnapshot();
    })

    test('should call active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello world new'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'world',
                title: 'Hello world new',
                id: 1234,
                date: 0
            }
        )
    })
})