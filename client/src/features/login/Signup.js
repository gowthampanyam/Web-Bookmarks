import { useState } from "react"
import { useCreateUserMutation, useLoginUserMutation } from "../api/apiSlice"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from "../../app/uiSlice"


export const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [createUser] = useCreateUserMutation()
    const [loginUser] = useLoginUserMutation()

    const onRegisterClicked = () => {
        const newUser = { username, password, role: 'user' }
        createUser(newUser).unwrap().then(response => {
            console.log('Registered', response)
            loginUser(response).unwrap().then(response => {
                console.log('Successful login!')
                dispatch(setUser(response))
                navigate('/')
            })
        })
    }
    return <div >
        <div className="row d-flex justify-content-center text-center" >
            <h2 className="text-white" style={{ width: "20vw" }}>Sign up!</h2>
        </div>
        <div className="row d-flex justify-content-center text-center">
            <input value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username" style={{ width: "20vw" }} />
        </div>
        <div className="row d-flex justify-content-center text-center">
            <input value={password} onChange={ev => setPassword(ev.target.value)} type='password' placeholder="Password" style={{ width: "20vw" }} />
        </div>
        <div className="row d-flex justify-content-center text-center">
            <button className="btn btn-success" style={{ width: "20vw" }} onClick={onRegisterClicked}>Register</button>
        </div>
    </div>
}