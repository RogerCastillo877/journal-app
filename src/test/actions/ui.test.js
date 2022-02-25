import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('should test ui-actions', () => {

    test('should test all actions woking properly', () => {

        const action = setError('Help!!');

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'Help!!'
        })

        const removeErrorAction = removeError();
        const starLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        })

        expect(starLoadingAction).toEqual({
            type: types.uiStartLoading
        })

        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        })
    })
})