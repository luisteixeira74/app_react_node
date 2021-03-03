import React, { useState } from 'react'

import api from '../../services/api'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const AddUser = (props) => {
    const initialFormState = { id: null, nome: '', login: '', senha: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('user', {
                id: user.id,
                name: user.nome,
                login: user.login,
                password: user.senha,
            })

            setUser(initialFormState)

            if (response.status === 200) {
                // inseriu com sucesso
                alert('usuário cadastrado com sucesso!')
            }
        } catch (err) {
            console.log('ocorreu um erro ao submeter as informações')
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4">
                    <h2>Cadastrar usuário</h2>
                </Card.Title>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault()
                        if (!user.name || !user.username) return

                        props.addUser(user)
                        handleSubmit()
                        //setUser(initialFormState)
                    }}
                >
                    <Form.Row className="justify-content-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Nome
                            </Form.Label>
                            <Form.Control
                                name="nome"
                                onChange={handleInputChange}
                                className="mb-2"
                                id="inlineFormInput"
                                type="text"
                                placeholder="Digite o nome do usuário"
                                value={user.nome}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                Login
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl
                                    name="login"
                                    onChange={handleInputChange}
                                    type="text"
                                    id="inlineFormInputGroup"
                                    placeholder="Login"
                                    value={user.login}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                Senha
                            </Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl
                                    name="senha"
                                    onChange={handleInputChange}
                                    type="password"
                                    id="inlineFormInputGroup"
                                    placeholder="Senha"
                                    value={user.senha}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs="auto">
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="mb-2"
                                disabled={
                                    !user.login || !user.senha || !user.nome
                                }
                            >
                                Salvar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddUser
