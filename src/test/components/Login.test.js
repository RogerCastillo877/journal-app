import { configure, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Login } from "../../components/auth/Login";
import { MemoryRouter } from "react-router-dom";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
configure({adapter: new Adapter()});

jest.mock( '../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))

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
store.dispatch = jest.fn();

const wrapper = mount(
    <MemoryRouter>
        <Provider store={store} >
            <Login />
        </Provider>
    </MemoryRouter>
);

describe('should test <Login />', () => {

    beforeEach( () => {
        store= mockStore(initState);
        jest.clearAllMocks();
    })

    test('should display properly', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('should call action startGoogleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();
    })

    test('should call startLogin with arguments', () => {
        
        wrapper.find('form').prop('onSubmit')(
            { preventDefault(){} }
        )

        expect( startLoginEmailPassword ).toHaveBeenCalledWith('correo1@correo.com',123456)
    });
})