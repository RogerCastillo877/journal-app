import { configure, mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import '@testing-library/jest-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";

configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 12,
    date: 0,
    title: 'Hello',
    body: 'world',
    url: 'https://luckylook.com/foto.jpg'
};

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...note }/>
    </Provider>
);
describe('should test <JournalEntry />', () => {

    test('should display properly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should active the note', () => {

        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, {...note} )
        )
    });
})