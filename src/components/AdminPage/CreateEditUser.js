import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Row} from 'react-bootstrap'
import {NavLink, useMatch, useNavigate} from 'react-router-dom'
import {Field, ErrorMessage, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {DEPARTMENTS} from '../../utils/departments'
import {createUser, getUserById, setCurrentUser, updateUser} from '../../redux/actions/users-action'


export const CreateEditUser = () => {

    const match = useMatch('admin/users/editor/:id/')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser, isEditMode} = useSelector(state => state.users)

    const [initialValues, setValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        department: '',
        confirmPassword: '',
        _id: ''
    })

    useEffect(() => {
        isEditMode
            ? dispatch(getUserById(match.params.id))
            : dispatch(setCurrentUser(initialValues))
    }, [dispatch, match, isEditMode])

    useEffect(() => {
        if (currentUser) {
            const {firstName, lastName, email, role, department, _id} = currentUser
            setValue({...initialValues, firstName, lastName, email, role, department, _id})
        }
    }, [currentUser])


    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Требуется ввести имя'),
        lastName: Yup.string()
            .required('Требуется ввести фамилию'),
        email: Yup.string()
            .email('Некорректная почта')
            .required('Требуется ввести почту'),
        role: Yup.string()
            .required('Требуется выбрать роль'),
        department: Yup.string()
            .required('Требуется выбрать отделение'),
        password: Yup.string()
            .concat(isEditMode ? null : Yup.string().required('Требуется ввести пароль'))
            .min(6, 'Пароль должен состоять не менее чем из 6 символов'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Требуется ввести пароль для подтверждения')
            })
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    })

    const onSubmit = data => {
        isEditMode
            ? dispatch(updateUser(data))
            : dispatch(createUser(data))
        navigate(-1)
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({errors, handleSubmit, isSubmitting, touched}) => (
                <Card>
                    <Form onSubmit={handleSubmit}>
                        <Card.Header>
                            <h1 className="ms-2">{isEditMode ? 'Редактировать пользователя' : 'Добавить пользователя'}</h1>
                        </Card.Header>
                        <Card.Body>
                            <Row className="py-2">
                                <Col>
                                    <Form.Label>Имя</Form.Label>
                                    <Field name="firstName" type="text"
                                           className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="firstName" component="div" className="invalid-feedback"/>
                                </Col>
                                <Col>
                                    <Form.Label>Фамилия</Form.Label>
                                    <Field name="lastName" type="text"
                                           className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="lastName" component="div" className="invalid-feedback"/>
                                </Col>
                            </Row>
                            <Row className="py-2">

                                <Col>
                                    <Form.Label>Почта</Form.Label>
                                    <Field name="email" type="text"
                                           className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                </Col>
                                <Col>
                                    <Form.Label>Роль</Form.Label>
                                    <Field name="role" as="select"
                                           className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                        <option disabled value=""/>
                                        <option value="admin">Админ</option>
                                        <option value="head">Руководитель</option>
                                        <option value="user">Пользователь</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="invalid-feedback"/>
                                </Col>
                                <Col>
                                    <Form.Label>Отделение</Form.Label>
                                    <Field name="department" as="select"
                                           className={'form-control' + (errors.department && touched.department ? ' is-invalid' : '')}>
                                        <option disabled value=""/>
                                        {Object.entries(DEPARTMENTS).map(([key, val]) => (
                                            <option key={key} value={val}>{val}</option>))}
                                    </Field>
                                    <ErrorMessage name="department" component="div" className="invalid-feedback"/>
                                </Col>
                            </Row>
                            {isEditMode && <div>
                                <h3 className="pt-3">Изменить пароль</h3>
                                <p>Оставьте поле пустым, чтобы сохранить тот же пароль</p>
                            </div>}
                            <Row>
                                <Col>
                                    <Form.Label>Пароль</Form.Label>
                                    <Field name="password" type="password"
                                           className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                </Col>
                                <Col>
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Field name="confirmPassword" type="password"
                                           className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="confirmPassword" component="div"
                                                  className="invalid-feedback"/>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Group>
                                <Button type="submit" disabled={isSubmitting} variant="primary">Сохранить</Button>
                                <NavLink to={'/admin/users'} className="btn btn-link">Отмена</NavLink>
                            </Form.Group>
                        </Card.Footer>
                    </Form>
                </Card>
            )}</Formik>
    )

}