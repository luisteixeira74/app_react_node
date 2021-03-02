import React, { Fragment, useState } from 'react'

import api from '../../services/api'

import Card from 'react-bootstrap/Card'

const Dashboard = () => {
    const [user, setUser] = useState(null)

    const getDashboard = async () => {
        try {
            const response = await api.get('dashboard', {})

            if (response.status === 200) {
                setUser(response.data[0].num_usuarios)
            }
        } catch (err) {
            console.log('ocorreu um erro')
        }
    }

    getDashboard()

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4">Dashboard</Card.Title>
                {user && <span>Total de usuários cadastrados: {user}</span>}
                <div className="flex-row">
                    <div className="flex-large"></div>
                    <div className="flex-large"></div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Dashboard
