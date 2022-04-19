import React, {useEffect, useState} from 'react'
import {Button, Col, Modal, Row, Spinner, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {deleteUser, getUsers} from '../../redux/actions/users-action'
import {toggleEditMode} from '../../redux/actions/users-action'

export const Users = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const {users, isFetching} = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        setData(users)
    }, [users])

    const onClickEdit = () => {
        dispatch(toggleEditMode(true))
    }

    const onClickAdd = () => {
        dispatch(toggleEditMode(false))
    }

    const onClickDelete = id => {
        setCurrentId(id)
        setShowModal(true)
    }

    const onClickCloseModal = () => {
        setShowModal(false)
    }

    const onClickDeleteListModal = () => {
        dispatch(deleteUser(currentId))
        setShowModal(false)
    }

    return <>
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Вы точно хотите удалить пользователя?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={onClickCloseModal}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onClickDeleteListModal}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
        <div>
            <Row className="py-2">
                <Col>
                    <NavLink to='editor' className="btn btn-primary mb-2" onClick={onClickAdd}>Добавить
                        пользователя</NavLink>
                    <Table striped bordered hover>

                        <thead>
                        <tr>
                            <th style={{width: '30%'}}>Имя</th>
                            <th style={{width: '30%'}}>Почта</th>
                            <th style={{width: '30%'}}>Роль</th>
                            <th style={{width: '30%'}}>Отделение</th>
                            <th style={{width: '10%'}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {isFetching
                            ? <tr>
                                <td colSpan="4" className="text-center">
                                    <Spinner animation="border"/>
                                </td>
                            </tr>
                            : data.map(user =>
                                <tr key={user._id}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.department}</td>
                                    <td style={{whiteSpace: 'nowrap'}}>
                                        <NavLink to={`editor/${user._id}`} className="btn btn-primary me-1"
                                                 onClick={onClickEdit}>Редактировать</NavLink>
                                        <Button variant="danger" onClick={() => onClickDelete(user._id)}
                                                disabled={user.role !== "admin" ? false : true}>Удалить</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    </>
}