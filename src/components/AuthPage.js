import React, {useEffect, useState} from 'react'
import {Alert, Button, Form, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login} from '../redux/actions/auth-action'

export const AuthPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuth, role} = useSelector(state => state.auth)
    const {isShow, message} = useSelector(state => state.alert)

    const [userData, setUserData] = useState({
        email: '', password: ''
    })
    const [alert, setAlert] = useState({ isShow: false, message: ''})

    const [isFetching, setFetching] = useState(false)

    useEffect(() => {
        setAlert({...alert, message, isShow})
        setFetching(false)
    },[isShow, message])

    useEffect(() => {
        if (isAuth) {
            switch (role){
                case 'admin':
                    navigate('/admin')
                    break
                case 'head':
                    navigate('/head')
                    break
                case 'user':
                    navigate('/user')
                    break
                default:
                    navigate('/404')
            }
            setFetching(false)
        }
    }, [isAuth, role, navigate])

    const changeHandler = event => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const onClickLogin = async () => {
        dispatch(login(userData.email, userData.password))
        setFetching(true)
    }

    return <>

        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                            {alert.isShow &&
                            <Alert variant="danger" className="text-center">{alert.message}</Alert>}
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Авторизация</h3>
                                <Form>
                                    <Form.Group className="mb-4" controlId="formEmail">
                                        <Form.Control onChange={changeHandler} type="email" name="email"
                                                      placeholder="Введите почту"/>
                                        <Form.Label>Почта</Form.Label>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Control onChange={changeHandler} type="password" name="password"
                                                      placeholder="Введите пароль"/>
                                        <Form.Label>Пароль</Form.Label>
                                    </Form.Group>
                                </Form>
                                {isFetching
                                    ? <Button variant="primary" size="lg" disabled>
                                        <Spinner as="span" animation="border"
                                                 size="sm" role="status" aria-hidden="true"/>
                                        <span>  Загрузка...</span>
                                    </Button>
                                    : <Button variant="primary" size="lg" type="submit"
                                              onClick={onClickLogin}>Войти</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}
