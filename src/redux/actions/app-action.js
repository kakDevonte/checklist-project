import {INITIALIZED_SUCCESS} from '../types'
import {getAuthUserData} from './auth-action'

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => dispatch => {
    const promise = dispatch(getAuthUserData())
    //dispatch(somethingElse())
    //dispatch(somethingElse())
    //dispatch(somethingElse())
    promise.then(() => {
        dispatch(initializedSuccess())
    })
    //     .catch(() => {
    //     dispatch(initializedSuccess())
    // })
}