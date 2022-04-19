import React from 'react'
import {Outlet} from 'react-router-dom'
import {useAuth} from '../hocs/useAuth'
import {NavigateBar} from '../NavigateBar'
import {Col, Container, Row} from "react-bootstrap";


export const HeadWrapper = () => {
    return <>
        { useAuth('head') &&
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