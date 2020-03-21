import get from 'lodash/get';

import {ACTION} from './constants'

export default function NotesReducer(state = {}, action){
    switch(action.type) {
        case ACTION.FETCH_NOTES:
            return { ...state, notesList: get(action,'data', [])}

        default:
            return state;
    }

}