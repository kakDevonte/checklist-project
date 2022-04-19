import React from 'react'
import {Button, ListGroup} from 'react-bootstrap'

export const ChecklistItem = (props) => {
    return <>
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start"
        variant={ props.item.isSpecial ? "danger" : "light" }>
            <div className="ms-2 me-auto text-break">
                {props.item.title}
            </div>
            <Button size="sm" variant="outline-danger" onClick={() => props.deleteItem(props.item.id)}>&#215;</Button>
        </ListGroup.Item>
    </>
}