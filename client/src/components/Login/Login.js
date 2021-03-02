import React, { useState } from 'react'

import api from '../../services/api'
import { login } from '../../services/auth'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

const Login = (props) => {
    const initialFormState = { login: '', password: '' }
    const [user, setUser] = useState(initialFormState)
    const [error, setError] = useState(null)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setError(false)

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('login', {
                login: user.login,
                password: user.password,
            })

            console.log('epa')

            setUser(initialFormState)

            if (response.status === 200) {
                // logou com sucesso
                login(response.data.token, response.data.name)
                window.location = '/dashboard'
            }
        } catch (err) {
            setError(true)
            console.log('ocorreu um erro ao submeter as informações')
        }
    }

    return (
        <Card className="col-md-10 ">
            <Card.Body>
                <Card.Title className="mb-4">
                    <h2>Login</h2>
                </Card.Title>
                <Card.Text>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row className="justify-content-center">
                            <Col xs="auto">
                                <Form.Label
                                    htmlFor="inlineFormInputGroup"
                                    srOnly
                                >
                                    Login
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="text"
                                        value={user.login}
                                        onChange={handleInputChange}
                                        id="login"
                                        placeholder="Login"
                                        name="login"
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs="auto">
                                <Form.Label
                                    htmlFor="inlineFormInputGroup"
                                    srOnly
                                >
                                    Senha
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control
                                        type="password"
                                        value={user.password}
                                        onChange={handleInputChange}
                                        id="password"
                                        placeholder="Senha"
                                        name="password"
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs="12" md="auto">
                                <Button type="submit" className="mb-2">
                                    Entrar
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                    <Row className="justify-content-center">
                        {error ? (
                            <Alert variant="danger">
                                Erro ao tentar logar!
                            </Alert>
                        ) : (
                            <>&nbsp;</>
                        )}
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Login
