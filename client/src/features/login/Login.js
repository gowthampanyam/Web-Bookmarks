import { useState } from "react"
import { useLoginUserMutation } from "../api/apiSlice"
import { useDispatch } from "react-redux"
import { setUser } from "../../app/uiSlice"
import { useNavigate } from "react-router"
import { Alert, AlertTitle } from "@mui/material"


export const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loginUser] = useLoginUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLoginClicked = () => {
        const newUser = { username, password }
        loginUser(newUser).unwrap()
            .then(response => {
                console.log('Successful login!', response)
                dispatch(setUser(response))
                navigate('/')
            })
            .catch(error => {
                setError(error)
            })
    }

    return <div >
        <div className="row d-flex justify-content-center text-center" >
            <h2 className="text-white" style={{ width: "20vw" }}>Login</h2>

        </div>
        <div className="row d-flex justify-content-center text-center">
            <input value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username" style={{ width: "20vw" }} />
        </div>
        <div className="row d-flex justify-content-center text-center">
            <input value={password} onChange={ev => setPassword(ev.target.value)} type='password' placeholder="Password" style={{ width: "20vw" }} />
        </div>
        <div className="row d-flex justify-content-center text-center">
            <button className="btn btn-success" onClick={onLoginClicked} style={{ width: "20vw" }}>Login</button>
        </div>
        <div className="row d-flex justify-content-center text-center">
            {error && <Alert severity="error" onClose={() => setError(null)} style={{ width: "20vw" }}>
                <AlertTitle>Login Error</AlertTitle>
                {error.data.message}
            </Alert>
            }
        </div>
    </div>
}