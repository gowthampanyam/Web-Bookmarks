import { useLogoutUserMutation } from "../api/apiSlice"
import { useDispatch } from "react-redux"
import { setUser } from "../../app/uiSlice"
import { Button } from "react-bootstrap"


export const Logout = () => {


    const [logout] = useLogoutUserMutation()
    const dispatch = useDispatch()


    const onLogoutClicked = () => {
        logout().unwrap().then(response => {
            console.log('succesful logout', response)
            dispatch(setUser({ id: 0, username: "", password: "", role: "", enabled: false }))
        })
    }

    return <Button className="logout-btn" onClick={onLogoutClicked}>
        <b className="">Log out</b>
    </Button>


}