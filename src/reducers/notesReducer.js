// {
//     notes: [],
//     active: null,
//     active: {
//         id: 'KASJFLA',
//         title: '',
//         body: '',
//         imageUrl: '',
//         date: 1234555624
//     }
// }
const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        // case value='':
            // return;
        default:
            return state;
    }
}