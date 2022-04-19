import React, {useEffect, useState} from 'react'
import {Button, Col, Modal, Row, Spinner, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createChecklist, deleteChecklist, getChecklists, toggleEditMode} from '../../redux/actions/checklist-action'
import copyIcons from './../../image/Icons/clipboard.svg'

export const ListWrapper = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [list, setList] = useState([])
    const [isCopy, setIsCopy] = useState(false)
    const {checklists, isFetching} = useSelector(state => state.checklist)


    useEffect(() => {
        dispatch(getChecklists())
    }, [dispatch])

    useEffect(() => {
        setList(checklists)
    }, [checklists])

    const onClickAdd = () => {
        dispatch(toggleEditMode(false))
    }

    const onClickEdit = () => {
        dispatch(toggleEditMode(true))
    }

    const onClickCopy = () => {
        setIsCopy(!isCopy)
    }

    const onClickCopyChecklist = id => {
        const checklist = list.find(elem => elem._id === id)
        checklist.completed = false
        checklist.items.forEach(e => e.isCompleted = false)
        dispatch(createChecklist(checklist))
        setIsCopy(!isCopy)
    }

    const onClickDelete = id => {
        setCurrentId(id)
        setShowModal(true)
    }

    const onClickCloseModal = () => {
        setShowModal(false)
    }

    const onClickDeleteListModal = () => {
        dispatch(deleteChecklist(currentId))
        setShowModal(false)
    }

    return <>
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Вы точно хотите удалить чеклист?
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
        <Row sm="auto">
            <Col>
                <NavLink to='tool' className="btn btn-primary" onClick={onClickAdd}>Добавить чеклист</NavLink>
            </Col>
            <Col>
                <Button variant="primary" onClick={onClickCopy}>Копировать чеклист</Button>
            </Col>
        </Row>
        <Row className="py-2">
            <Col>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: '70%'}}>Название</th>
                        <th style={{width: '20%'}}>Дата создания</th>
                        <th style={{width: '30%'}}>Отделение</th>
                        <th style={{width: '10%'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {isFetching ?
                        <tr>
                            <td colSpan="4" className="text-center">
                                <Spinner animation="border"/>
                            </td>
                        </tr>
                        :
                        list.map(item =>
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.dateCreation}</td>
                                <td>{item.department}</td>
                                <td style={{whiteSpace: 'nowrap'}}>
                                    {isCopy && <Button className="me-1"
                                                       onClick={() => onClickCopyChecklist(item._id)}
                                                       variant='outline-secondary'>
                                        <img src={copyIcons} alt="description"/></Button>}
                                    <NavLink to={`/admin/tool/${item._id}`}
                                             className="btn btn-primary me-1"
                                             onClick={onClickEdit}>Редактировать</NavLink>
                                    <Button variant="danger"
                                            onClick={() => onClickDelete(item._id)}>Удалить</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>
}