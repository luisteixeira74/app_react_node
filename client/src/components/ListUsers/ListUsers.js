import React, { useState, Fragment } from 'react'
import AddUserForm from '../../forms/AddUser'
import EditUserForm from '../../forms/EditUser'
import UserTable from '../../tables/User'

import api from '../../services/api'

class ListUsers extends React.Component {
    state = {
        users: [],
        editing: false,
        currentUser: { id: null, name: '', username: '' },
    }
    // Data
    // const usersData = [
    //     { id: 1, name: 'Tania', username: 'floppydiskette' },
    //     { id: 2, name: 'Craig', username: 'siliconeidolon' },
    //     { id: 3, name: 'Ben', username: 'benisphere' },
    // ]

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        try {
            const response = await api.get('users', {})

            if (response.data && response.data.length) {
                this.setState({ users: response.data })
                return
            }
        } catch (err) {
            console.log('ocorreu um erro')
        }
    }

    // CRUD operations
    addUser = (user) => {}

    deleteUser = (id) => {}

    updateUser = (id, updatedUser) => {}

    editRow = (user) => {
        this.setState({ editing: true })
        this.setState({ currentUser: user })
    }

    render() {
        return (
            <div className="container">
                <h1>Lista de usuários</h1>
                <div className="flex-row">
                    <div className="flex-large">
                        {this.state.users.map((user, index) => (
                            <EditUserForm
                                key={index}
                                user={user}
                                editUser={''}
                                currentUser={user}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUsers
