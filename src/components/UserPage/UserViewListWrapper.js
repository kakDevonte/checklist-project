import {NavLink} from 'react-router-dom'
import {Col, Row, Spinner, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {getChecklistsByDepartment} from '../../redux/actions/checklist-action'

export const UserViewListWrapper = () => {

    const [list, setList] = useState([])

    const dispatch = useDispatch()
    const {department} = useSelector(state => state.auth)
    const {checklists, isFetching} = useSelector(state => state.checklist)

    useEffect(() => {
        dispatch(getChecklistsByDepartment(department))
    }, [dispatch, department])

    useEffect(() => {
        setList(checklists)
    }, [checklists])


    return <>
        <Row className="py-2">
            <Col>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: '95%'}}>Название</th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {isFetching
                        ? <tr>
                            <td colSpan="4" className="text-center">
                                <Spinner animation="border"/>
                            </td>
                        </tr>
                        : list.map(item =>
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td style={{whiteSpace: 'nowrap'}}>
                                    <NavLink to={`form/${item._id}`}
                                             className="btn btn-primary me-1">Открыть</NavLink>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>
}