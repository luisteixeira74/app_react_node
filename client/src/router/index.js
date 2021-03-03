import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Suspense, lazy } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

// navigation guard / middleware
import { PrivateRoute } from './_private'
import { GuestRoute } from './_guest'
import { isAuthenticated, getName } from '../services/auth'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// Preloading component
const Loading = () => <h1>Loading ...</h1>

// Import helper func
const views = (path) => {
    return lazy(() => import(`../components/${path}/${path}`))
}

const activeStyle = {
    fontWeight: 'bold',
}

// route list
const routes = [
    {
        path: '/',
        component: 'Home',
        showMenu: true,
        label: 'Home',
    },
    {
        path: '/dashboard',
        component: 'Dashboard',
        private: true,
        showMenu: true,
        label: 'Dashboard',
    },
    {
        path: '/list-users',
        component: 'ListUsers',
        private: true,
        showMenu: true,
        label: 'Lista de Usuários',
    },
    {
        path: '/login',
        component: 'Login',
        guest: true,
        showMenu: true,
        label: 'Login',
    },
    {
        path: '/create-user',
        component: 'AddUser',
        showMenu: true,
        label: 'Cadastrar',
    },
    {
        path: '/logout',
        component: 'Logout',
        showMenu: false,
        label: 'Logout',
        private: true,
    },
    {
        path: '404', // 404 fallback
        noExact: true, // all route "exact" by default
        component: 'NotFound',
        showMenu: false,
    },
]

const router = () => (
    <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">App React-Node</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {routes.map((route, index) => {
                        return route.showMenu &&
                            ((!isAuthenticated() && !route.private) ||
                                (isAuthenticated() && route.private)) ? (
                            <Nav.Link
                                as={Link}
                                key={index}
                                to={route.path}
                                activeStyle={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {route.label}
                            </Nav.Link>
                        ) : null
                    })}
                </Nav>
            </Navbar.Collapse>
            {isAuthenticated() && (
                <>
                    <span className="mr-4">
                        Bem vindo: <b>{getName()}</b>
                    </span>
                    <Link to="/logout">Sair</Link>
                </>
            )}
        </Navbar>
        <Container className="mt-5">
            <div className="text-center">
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {routes.map((route, index) => {
                            if (route.path !== '404') {
                                if (route.private) {
                                    return route.noExact ? (
                                        <PrivateRoute
                                            key={index}
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    ) : (
                                        <PrivateRoute
                                            key={index}
                                            exact
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    )
                                } else if (route.guest) {
                                    return route.noExact ? (
                                        <GuestRoute
                                            key={index}
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    ) : (
                                        <GuestRoute
                                            key={index}
                                            exact
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    )
                                } else {
                                    return route.noExact ? (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    ) : (
                                        <Route
                                            key={index}
                                            exact
                                            path={route.path}
                                            component={views(route.component)}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <Route
                                        key={index}
                                        component={views(route.component)}
                                    />
                                )
                            }
                        })}
                    </Switch>
                </Suspense>
            </div>
        </Container>
    </div>
)

export default router
