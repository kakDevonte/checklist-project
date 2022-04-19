import {SHOW_ALERT, HIDE_ALERT} from '../types'

const initialState = {
    message: '',
    isShow: false
}

export const alertReducer = (state = initialState, action) => {

    const {payload} = action

    switch (action.type){
        case SHOW_ALERT: {
            return { ...state, isShow: true, message: payload.message}
        }
        case HIDE_ALERT: {
            return { ...state, isShow: false, message: ''}
        }
        default:
            return state
    }

}