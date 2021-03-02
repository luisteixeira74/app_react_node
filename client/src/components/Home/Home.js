import React, { Fragment } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const Home = () => {
    return (
        <>
            <Row>
                <Col>
                    <h2>Crud de Usuários</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Alert variant="info">
                        Para fazer login Cadastre seu usuário na página{' '}
                        <Alert.Link href="/create-user">Cadastrar</Alert.Link>.
                    </Alert>
                </Col>
            </Row>
        </>
    )
}

export default Home
