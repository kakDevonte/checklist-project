import React, {useEffect, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {DEPARTMENTS} from '../../utils/departments'
import {getChecklistForHead} from '../../redux/actions/checklist-action'


export const HeadViewListWrapper = () => {

    const [list, setList] = useState([])
    const {checklists} = useSelector(state => state.checklist)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChecklistForHead())
    }, [dispatch])

    useEffect(() => {
        setList(checklists)
    }, [checklists])

    return (
        <div className="App mt-5">
            {Object.entries(DEPARTMENTS).map(([key, val]) => (
                <Accordion key={val} defaultActiveKey={key.id}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{val}</Accordion.Header>
                        <Accordion.Body>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th style={{width: '80%'}}>Название</th>
                                    <th style={{width: '20%'}}>Дата заполнения</th>
                                    <th style={{width: '10%'}}>Выполнено</th>
                                    <th style={{width: '10%'}}>Всего</th>
                                    <th style={{width: '5%'}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {list && list.map(item =>
                                    item.department === val &&
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.dateCompletion}</td>
                                        <td>({item.items.filter(el => el.completed === true && el.isImportant).length})
                                            {item.items.filter(el => el.completed === true).length}</td>
                                        <td>({item.items.filter(el =>el.isImportant).length}){item.items.length}</td>
                                        <td style={{whiteSpace: 'nowrap'}}>
                                            <NavLink to={`/head/form/${item._id}`} className="btn btn-success me-1">Просмотр</NavLink>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </div>
    )
}