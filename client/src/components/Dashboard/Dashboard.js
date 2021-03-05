import React, { Fragment, useState } from 'react'

import api from '../../services/api'
import Chart from 'chart.js'

import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [usersToday, setUsersToday] = useState(null)

    const getDashboard = async () => {
        try {
            const response = await api.get('dashboard', {})

            if (response.status === 200) {
                console.log(response)
                setUser(response.data[0].table_a)
                setUsersToday(response.data[0].table_b)
            }
        } catch (err) {
            console.log('ocorreu um erro')
        }

        loadChart()
        loadChartByDate()
    }

    getDashboard()

    const loadChart = () => {
        var ctx = document.getElementById('myChart').getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Usuário(s)'],
                datasets: [
                    {
                        label: 'Total de usuários cadastrados',
                        data: [user],
                        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                        borderColor: ['rgba(54, 162, 235, 1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        })
    }

    const loadChartByDate = () => {
        var ctx = document.getElementById('myChartByDate').getContext('2d')
        var myChartByDate = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Usuário(s) cadastrados hoje'],
                datasets: [
                    {
                        label: 'usuários cadastrados hoje',
                        data: [usersToday],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        })
    }

    return (
        <Card>
            <Card.Header>Dashboard</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Row>
                        <Col>
                            {user && (
                                <span>
                                    Total de usuários cadastrados: {user}
                                </span>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <canvas
                                id="myChart"
                                width="200"
                                height="200"
                            ></canvas>
                        </Col>
                        <Col>
                            <canvas
                                id="myChartByDate"
                                width="200"
                                height="200"
                            ></canvas>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Dashboard
