import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const AddUser = props => {
    const initialFormState = { id: null, name: '', username: '' }
    const [ user, setUser ] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!user.login || !user.password) return;


        setUser(initialFormState)
    }

    return (
        <Container fluid>
            <Form onSubmit={handleSubmit}>
                <Row>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" value={user.login} onChange={handleInputChange} placeholder="Enter email" />
                      </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={user.password} onChange={handleInputChange} placeholder="Senha" />
                      </Form.Group>
                </Row>
                <Row>
                      <Button variant="primary" type="submit">
                        Salvar
                      </Button>
                </Row>
            </Form>
        </Container>
    )
}

export default AddUser
