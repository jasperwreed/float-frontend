export const fetchLogin = (info) => {
    return (dispatch) => {
        dispatch({ type: "START_LOG_REQUEST" })
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: info.username,
                password: info.password
            })
        })
        .then(resp => { return resp.json() })
        .then(data => {
            if (data.message === 'Incorrect Username or Password') {
                localStorage.removeItem("token")
                dispatch({ type: 'ERROR_MESSAGE' })
            } else {
                localStorage.setItem('token', data.token)
                let user = data.user
                dispatch({ type: 'LOGIN_USER', user })
            }
        })
    }
}

export const getProfileFetch = () => {
    return (dispatch) => {
        const token = localStorage.token
        if (token) {
            return fetch("http://localhost:3001/profile", {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
            .then(resp => { return resp.json() })
            .then(data => {
                if (data.message) {
                    // An error will occur if the token is invalid.
                    // If this happens, you may want to remove the invalid token.
                    localStorage.removeItem("token")
                } else {
                    let user = data.user
                    dispatch({ type: 'LOGIN_USER', user })
                }
            })
        }
    }
}