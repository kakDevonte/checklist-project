import {SET_CURRENT_CHECKLIST, SET_CHECKLISTS, TOGGLE_EDITMODE, TOGGLE_IS_FETCHING} from '../types'

const initialState = {
    checklists: [],
    currentChecklist: null,
    isFetching: false,
    isEditMode: false
}

export const checklistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHECKLISTS: {
            return {...state, checklists: action.payload}
        }
        case SET_CURRENT_CHECKLIST: {
            return {...state, currentChecklist: action.payload}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload}
        }
        case TOGGLE_EDITMODE: {
            return { ...state, isEditMode: action.payload}
        }
        default: return state
    }
}