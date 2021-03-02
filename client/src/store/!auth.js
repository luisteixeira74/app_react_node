const state = {
    logged: !!localStorage.getItem('token'),
}

const actions = {
    login: (token) => {
        return new Promise((resolve, reject) => {
            localStorage.setItem(
                'token',
                JSON.stringify({
                    // In real world token is obtained from api request
                    token: token,
                })
            )
            resolve()
        })
    },

    logout: () => {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token')
            resolve()
        })
    },
}

export default { state, actions }
