import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const showAlert = (message) =>
    ({ type: SHOW_ALERT, payload: { message } })

export const hideAlert = () => ({ type: HIDE_ALERT })


export const toggleAlert = message => dispatch => {
    dispatch(showAlert(message))
    setTimeout(() => {
        dispatch(hideAlert())
    }, 5000)

}
