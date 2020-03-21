import {ACTION} from './constants'

export const fetchNotes = (data) => {
    return dispatch => {
        dispatch({
            type: ACTION.FETCH_NOTES,
            data,
        })
    }
}