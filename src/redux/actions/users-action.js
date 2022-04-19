import {
    SET_CURRENT_USER,
    SET_USERS,
    USERS_TOGGLE_EDITMODE, USERS_TOGGLE_IS_FETCHING
} from '../types'
import {checklistAPI, usersAPI} from '../../services/api'

export const toggleIsFetching = (isFetching) => ({type: USERS_TOGGLE_IS_FETCHING, payload: isFetching})

export const setUsers = users =>
    ({ type: SET_USERS, payload: users })

export const setCurrentUser = user =>
    ({type: SET_CURRENT_USER, payload: user })

export const toggleEditMode = bool =>
    ({ type: USERS_TOGGLE_EDITMODE, payload: bool })


export const getUsers = () => async dispatch => {
    dispatch(toggleIsFetching(true))
    const response = await usersAPI.get()
    if (response.data.resultCode === 0) {
        const users = response.data.data
        dispatch(setUsers(users))
        dispatch(toggleIsFetching(false))
    }
}

export const getUserById = id => async dispatch => {
    const response = await usersAPI.getById(id)
    if (response.data.resultCode === 0) {
        const user = response.data.user
        dispatch(setCurrentUser(user))
    }
}

export const createUser = user => async dispatch => {
    const response = await usersAPI.create(user)
    if (response.data.resultCode === 0) {
        dispatch(getUsers())
    }
}
export const updateUser = user => async dispatch => {
    const response = await usersAPI.update(user)
    if (response.data.resultCode === 0) {
        dispatch(getUsers())
    }
}

export const deleteUser = id => async dispatch => {
    const response = await usersAPI.delete(id)
    if (response.data.resultCode === 0) {
        dispatch(getUsers())
    }
}
