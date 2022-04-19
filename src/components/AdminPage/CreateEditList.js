import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Container, Form, ListGroup, Row} from 'react-bootstrap'
import {NavLink, useMatch, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    createChecklist,
    getChecklistById,
    setCurrentChecklist,
    updateChecklist
} from '../../redux/actions/checklist-action'
import {ChecklistItem} from './ChecklistItem'
import {DEPARTMENTS} from '../../utils/departments'

export const CreateEditList = () => {

    const match = useMatch('admin/tool/:id/')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentChecklist, isEditMode} = useSelector(state => state.checklist)

    const [data, setData] = useState({
        name: '', department: '', completed: false,
        dateCreation: '', dateCompletion: '', items: []
    })
    const [itemTitle, setItemTitle] = useState('')
    const [isSpecial, setSpecial] = useState(false)

    useEffect(() => {
        isEditMode
            ? dispatch(getChecklistById(match.params.id))
            : dispatch(setCurrentChecklist(data))
    }, [dispatch, match, isEditMode])

    useEffect(() => {
        setData({...data, ...currentChecklist, dateCreation: new Date().toLocaleDateString()})
    }, [currentChecklist])

    const changeHandlerData = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const changeItemTitle = e => setItemTitle(e.target.value)

    const changeIsSpecial = () => setSpecial(!isSpecial)

    const onClickDeleteItem = id =>
        setData({...data, items: data.items.filter(item => item.id !== id)})

    const randomId = () => Math.random().toString(16).slice(2)

    const onClickAddItem = () => {
        if (!itemTitle.trim()) {
            return
        }

        setData({
            ...data, items: [...data.items,
                {id: randomId(), title: itemTitle, isSpecial, isCompleted: false}]
        })

        setItemTitle('')
        setSpecial(false)
    }

    const onClickSaveList = () => {
        isEditMode
            ? dispatch(updateChecklist(data))
            : dispatch(createChecklist(data))
        navigate(-1)
    }

    return <>
        <Container>
            <Form>
                <Card>
                    <Card.Header>
                        <Card.Title>Чеклист</Card.Title>
                        <Row>
                            <Col>
                                <Form.Label>Название</Form.Label>
                                <Form.Control placeholder="Введите название чеклиста..."
                                              value={data.name} name="name"
                                              onChange={changeHandlerData}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Отдел</Form.Label>
                                <Form.Select onChange={changeHandlerData} name="department">
                                    <option defaultValue>{data.department}</option>
                                    {Object.entries(DEPARTMENTS).map(([key, val]) => (
                                        <option key={key} value={val}>{val}</option>))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="align-content-center">
                        <Card.Title>Поле для создания вопросов</Card.Title>
                        <div>
                            <Form.Control as="textarea" rows={2} placeholder="Введите текст"
                                          value={itemTitle} onChange={changeItemTitle}/>
                        </div>
                        <div className="d-flex justify-content-end py-2">
                            <Form.Check className="mt-2 me-2" type="switch" id="custom-switch"
                                        label="Важно" checked={isSpecial} onChange={changeIsSpecial}/>
                            <Button variant="primary" onClick={onClickAddItem}>Добавить</Button>
                        </div>
                        <div className="mt-2" style={{maxHeight: "450px", minHeight: "200px", overflowY: "scroll"}}>
                            <Card.Title>Вопросы</Card.Title>
                            <ListGroup as="ol" numbered variant="flush">
                                {data.items && data.items.map(item =>
                                    <ChecklistItem key={item.id} item={item} deleteItem={onClickDeleteItem}/>
                                )}
                            </ListGroup>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <div className={"d-flex justify-content-end"}>
                            <NavLink to={'/admin'} className="mt-1 me-1">Отмена</NavLink>
                            <Button className="ms-2" variant="primary" onClick={onClickSaveList}>Сохранить</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>
        </Container>
    </>
}