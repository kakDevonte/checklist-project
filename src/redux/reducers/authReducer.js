import {SET_USER_DATA} from '../types'

const initialState = {
    isAuth: false,
    role: null,
    department: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        default: return state
    }
}