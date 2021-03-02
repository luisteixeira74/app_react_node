export const TOKEN_KEY = '@myapp-Token'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = (token, name) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem('name', name)
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    window.location.href = '/'
}
export const getName = () => localStorage.getItem('name')
