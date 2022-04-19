import {SET_CURRENT_CHECKLIST, SET_CHECKLISTS, TOGGLE_IS_FETCHING, TOGGLE_EDITMODE} from '../types'
import {checklistAPI} from '../../services/api'

export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, payload: isFetching})

export const setChecklists = checklists =>
    ({ type: SET_CHECKLISTS, payload: checklists })

export const setCurrentChecklist = checklist =>
    ({ type: SET_CURRENT_CHECKLIST, payload: checklist })

export const toggleEditMode = bool =>
    ({ type: TOGGLE_EDITMODE, payload: bool })


export const getChecklists = () => async dispatch => {
    dispatch(toggleIsFetching(true))
    const response = await checklistAPI.get()
    if (response.data.resultCode === 0) {
        const checklists = response.data.data.checklists
        dispatch(setChecklists(checklists))
        dispatch(toggleIsFetching(false))
    }
}

export const getChecklistForHead = () => async dispatch => {
    dispatch(toggleIsFetching(true))
    const response = await checklistAPI.getForHead()
    if (response.data.resultCode === 0) {
        const checklists = response.data.data.checklists
        dispatch(setChecklists(checklists))
        dispatch(toggleIsFetching(false))
    }
}


export const getChecklistById = id => async dispatch => {
    const response = await checklistAPI.getById(id)
    if (response.data.resultCode === 0) {
        const checklist = response.data.data
        dispatch(setCurrentChecklist(checklist))
    }
}

export const getChecklistsByDepartment = department => async dispatch => {
    dispatch(toggleIsFetching(true))
    const response = await checklistAPI.getByDepartment(department)
    if (response.data.resultCode === 0) {
        const checklists = response.data.data.checklists
        dispatch(setChecklists(checklists))
        dispatch(toggleIsFetching(false))
    }
}

export const createChecklist = checklist => async dispatch => {
    const response = await checklistAPI.create(checklist)
    if (response.data.resultCode === 0) {
        dispatch(getChecklists())
    }
}
export const updateChecklist = checklist => async dispatch => {
    const response = await checklistAPI.update(checklist)
    if (response.data.resultCode === 0) {
        dispatch(getChecklists())
    }
}

export const deleteChecklist = id => async dispatch => {
    const response = await checklistAPI.delete(id)
    if (response.data.resultCode === 0) {
        dispatch(getChecklists())
    }
}
