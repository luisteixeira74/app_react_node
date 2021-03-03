import React, { Fragment } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

const Home = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4">
                    <h2>Crud de Usuários</h2>
                </Card.Title>
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <Alert variant="info">
                            Para fazer login Cadastre seu usuário na página{' '}
                            <Alert.Link href="/create-user">
                                Cadastrar
                            </Alert.Link>
                            .
                        </Alert>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Home
