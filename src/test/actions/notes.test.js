import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hello-world.com/it.jpg'
        // return Promise.resolve('https://hello-world.com/it.jpg')
    })
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares)


const initState = {
    auth: {
        uid: 'afarahfdgkh'
    },
    notes: {
        active: {
            id: '4A1QX9o0ZirAjkacUUAE',
            title: 'title',
            body: 'Body1'
        }
    }
};

let store = mockStore(initState);

describe('should test actions in notes file', () => {

    beforeEach( () => {
        store = mockStore(initState)
    });

    xtest('should create a note startNewNote', async () => {
        jest.setTimeout(10000)

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/afarahfdgkh/journal/notes/${ docId}`).delete();
    });

    xtest('should charge the notes startLoadingNotes', async() => {
        jest.setTimeout(10000)

        await store.dispatch( startLoadingNotes('afarahfdgkh'));

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    });

    xtest('should update the note startSaveNote', async() => {
        jest.setTimeout(10000)

        const note = {
            id: '4A1QX9o0ZirAjkacUUAE',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/afarahfdgkh/journal/notes/${ note.id}` ).get();

        expect( docRef.data().title ).toBe( note.title );
    });

    xtest('should update the URL of entry startUploading', async() => {
        jest.setTimeout(10000)

        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc(`/afarahfdgkh/journal/notes/4A1QX9o0ZirAjka`).get();
        expect(docRef.data().url ).toBe('https://hello-world.com/it.jpg');
    })
})

 