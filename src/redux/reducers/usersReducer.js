import {SET_CURRENT_USER, SET_USERS, USERS_TOGGLE_EDITMODE, USERS_TOGGLE_IS_FETCHING} from '../types'

const initialState = {
    users: [],
    currentUser: null,
    isFetching: false,
    isEditMode: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.payload}
        }
        case SET_CURRENT_USER: {
            return {...state, currentUser: action.payload}
        }
        case USERS_TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload}
        }
        case USERS_TOGGLE_EDITMODE: {
            return { ...state, isEditMode: action.payload}
        }
        default: return state
    }
}