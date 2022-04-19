import {SET_USER_DATA} from '../types'
import {authAPI} from '../../services/api'
import {toggleAlert} from "./alert-action";

export const setAuthUserData = (isAuth, role, department) =>
    ({type: SET_USER_DATA, payload: {isAuth, role, department}})

export const getAuthUserData = () => async dispatch => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {role, department} = response.data.data
        dispatch(setAuthUserData(true, role, department))
    }
    else if (response.data.resultCode === 1) {
        dispatch(setAuthUserData(false, null, null))
    }
}

export const login = (email, password) => async dispatch => {
    const response = await authAPI.login(email, password)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    if (response.data.resultCode === 1) {
        dispatch(toggleAlert(response.data.message))
    }
}

export const logout = () => async dispatch => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(false, null, null))
    }

}
