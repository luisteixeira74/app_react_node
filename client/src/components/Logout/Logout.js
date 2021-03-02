import React, { useState } from 'react'

import api from '../../services/api'
import { logout } from '../../services/auth'

const Logout = (props) => {
    logout()

    return null
}

export default Logout
