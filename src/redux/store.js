import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './reducers/authReducer'
import {checklistReducer} from './reducers/chacklistReducer'
import {appReducer} from './reducers/appReducer'
import {usersReducer} from './reducers/usersReducer'
import {alertReducer} from './reducers/alertReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    checklist: checklistReducer,
    users: usersReducer,
    alert: alertReducer,
    app: appReducer
})

let store = createStore(rootReducer, compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store