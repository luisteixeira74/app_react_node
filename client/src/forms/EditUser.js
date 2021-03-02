import React, { useState, useEffect } from 'react'

import api from '../services/api'

const EditUser = (props) => {
    const [user, setUser] = useState(props.currentUser)

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (id) => {
        try {
            const response = await api.put('user', {
                id: 2,
                name: 'Luis Fernando',
            })

            if (response) {
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form>
            <label>Nome</label>
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
            />
            <button onClick={() => handleSubmit(user.id)}>
                Atualizar usuário
            </button>
        </form>
    )
}

export default EditUser
