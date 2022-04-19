import {NavLink, useMatch, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {getChecklistById, setCurrentChecklist, updateChecklist} from '../../redux/actions/checklist-action'
import {Button, Card, Col, Container, ListGroup, Row, Spinner} from 'react-bootstrap'

export const FormToFill = () => {

    const match = useMatch('user/form/:id/')

    const [checklist, setChecklist] = useState({
        name: '', department: '', completed: false,
        dateCreation: '', dateCompletion: '', items: []
    })
    const [items, setItems] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentChecklist} = useSelector(state => state.checklist)

    useEffect(() => {
        dispatch(getChecklistById(match.params.id))
    }, [])

    useEffect(() => {
        if (currentChecklist)
            setChecklist(currentChecklist)
    }, [currentChecklist])

    useEffect(() => {
        setItems(checklist.items)
    }, [checklist])

    const handleChangeSelected = id => {
        setItems(items.map(item => item.id === id ? {...item, isCompleted: !item.isCompleted} : item))
    }

    const onClickSend = () => {
        let newChecklist = {
            ...checklist,
            items: items,
            completed: true,
            dateCompletion: new Date().toLocaleDateString()
        }
        dispatch(updateChecklist(newChecklist))
        navigate(-1)
    }

    const onClickPrint = () => {
        window.print()
    }

    return <>
        <Container>
            <h2 className="text-center mb-4">{checklist.name}</h2>
                {items && items.map(item =>
                    <Container className="mt-2 flex-column" fluid={true} key={item.id}>
                        <Row>
                            <Col sm="10">
                                <div className="d-flex align-items-stretch">
                                    {item.isSpecial ? <span className="border border-danger border-4 me-2"/> :
                                        <span className="border border-white border-4 me-2"/>}
                                    <p className="text-break">{`${items.indexOf(item) + 1}. ${item.title}`}</p>
                                </div>
                            </Col>
                            <Col sm="2">
                                <input className="form-check-input mt-2 d-print-none" type="checkbox"
                                       disabled={checklist.completed}
                                       checked={item.isCompleted} onChange={() => handleChangeSelected(item.id)}/>
                                <label className="form-check-label mt-1 ms-1 d-print-none">
                                    Выполнено
                                </label>
                            </Col>
                        </Row>
                    </Container>
                )}
            <div className='d-flex justify-content-end'>
                <NavLink to={'/user'} className="mt-1 me-1 d-print-none">Назад</NavLink>
                <Button variant="primary" className="me-1 d-print-none" onClick={onClickPrint}>Распечатать</Button>
                <Button className="d-print-none" variant="primary" disabled={checklist.completed}
                        onClick={onClickSend}>Отправить</Button>
            </div>
        </Container>
    </>
}