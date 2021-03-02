import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../services/auth'

const FALLBACK = '/login'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: FALLBACK,
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            }}
        />
    )
}
