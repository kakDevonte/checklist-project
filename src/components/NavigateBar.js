import React, {useEffect, useState} from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../redux/actions/auth-action'

export const NavigateBar = () => {

    const dispatch = useDispatch()
    const {role} = useSelector(state => state.auth)
    const [userRole, setRole] = useState(null)

    useEffect(() => {
        setRole(role)
    }, [role])
    const onClick = () => {
        dispatch(logout())
    }

    return <>
        <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="d-print-none">
            <Container>
                {userRole === 'admin' && <Nav className="me-auto">
                    <LinkContainer to="/admin">
                        <Nav.Link>Чеклисты</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                        <Nav.Link>Пользователи</Nav.Link>
                    </LinkContainer>
                </Nav>}
                {userRole === 'head' && <Nav className="me-auto">
                    <LinkContainer to="/head">
                        <Nav.Link>Чеклисты</Nav.Link>
                    </LinkContainer>
                </Nav>}
                {userRole === 'user' && <Nav className="me-auto">
                    <LinkContainer to="/user">
                        <Nav.Link>Чеклисты</Nav.Link>
                    </LinkContainer>
                </Nav>}
                <div className="d-flex">
                    <Button variant="outline-danger" onClick={onClick}>Выход</Button>
                </div>
            </Container>
        </Navbar>
    </>
}