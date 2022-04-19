import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthPage} from './components/AuthPage'
import {Navigate, Route, Routes} from 'react-router-dom'
import React, {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {AdminWrapper} from './components/AdminPage/AdminWrapper'
import {HeadWrapper} from './components/HeadPage/HeadWrapper'
import {UserWrapper} from './components/UserPage/UserWrapper'
import {ListWrapper} from './components/AdminPage/ListWrapper'
import {Users} from './components/AdminPage/Users'
import {CreateEditList} from './components/AdminPage/CreateEditList'
import {initializeApp} from './redux/actions/app-action'
import {CreateEditUser} from './components/AdminPage/CreateEditUser'
import {UsersWrapper} from './components/AdminPage/UsersWrapper'
import {UserViewListWrapper} from './components/UserPage/UserViewListWrapper'
import {FormToFill} from './components/UserPage/FormToFill'
import {HeadViewListWrapper} from './components/HeadPage/HeadViewListWrapper'
import {CheckForm} from './components/HeadPage/CheckForm'

function App() {

    const dispatch = useDispatch()
    const {initialized} = useSelector(state => state.app)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    return <>
        {!initialized
            ? <div className="d-flex justify-content-center"><Spinner animation="border"/></div>
            : <Routes>
                <Route path="/admin" element={<AdminWrapper/>}>
                    <Route index element={<ListWrapper/>}/>
                    <Route path="tool/*" element={<CreateEditList/>}/>
                    <Route path="users" element={<UsersWrapper/>}>
                        <Route index element={<Users/>}/>
                        <Route path="editor/*" element={<CreateEditUser/>}/>
                    </Route>
                </Route>
                <Route path="/head" element={<HeadWrapper/>}>
                    <Route index element={<HeadViewListWrapper/>}/>
                    <Route path="form/*" element={<CheckForm/>}/>
                </Route>
                <Route path="/user" element={<UserWrapper/>}>
                    <Route index element={<UserViewListWrapper/>}/>
                    <Route path="form/*" element={<FormToFill/>}/>
                </Route>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/" element={<Navigate from="/" to="/login"/>}/>
        </Routes>}
    </>
}

export default App
