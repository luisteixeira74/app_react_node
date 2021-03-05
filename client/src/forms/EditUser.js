import React, { useState, useEffect } from 'react'

import api from '../services/api'

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { Col, Row } from 'react-bootstrap'

const EditUser = (props) => {
    const [user, setUser] = useState(props.currentUser)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (id) => {
        console.log('teste')
        let editedUser = { id: id, name: user.name, login: user.login }
        try {
            const response = await api.put('user', {
                id: id,
                name: user.name,
            })

            if (response.status === 200) {
                props.editRow(editedUser)
                setMessage('success')
            } else {
                setMessage('error')
            }
        } catch (err) {
            console.log(err)
            setMessage('error')
        }
    }

    return (
        <Card>
            <Card.Header>Editar nome</Card.Header>
            <Card.Body>
                <Card.Text>
                    <form>
                        <Form.Row className="justify-content-center">
                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInput">
                                    Nome
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    Login
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={user.login}
                                        disabled
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup">
                                    &nbsp;
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSubmit(user.id)}
                                    >
                                        Salvar
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Form.Row>
                    </form>
                    {message == 'success' && (
                        <Alert variant="success">
                            Nome alterado com sucesso!
                        </Alert>
                    )}
                    {message == 'error' && (
                        <Alert variant="danger">
                            Ocorreu um erro ao editar o nome!
                        </Alert>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default EditUser
