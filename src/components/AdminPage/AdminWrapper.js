import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {Outlet} from 'react-router-dom'
import {useAuth} from '../hocs/useAuth'
import {NavigateBar} from '../NavigateBar'


export const AdminWrapper = () => {
    return <>
        {useAuth('admin') &&
        <Container className="py-5">
            <Row>
                <Col><NavigateBar/></Col>
            </Row>
            <Row className="py-5">
                <Col><Outlet/></Col>
            </Row>
        </Container>}
    </>
}