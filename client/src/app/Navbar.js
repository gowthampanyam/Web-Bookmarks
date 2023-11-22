import { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearch } from './uiSlice';
import { Logout } from '../features/login/Logout';
import { AddWebpage } from '../features/homePage/AddWebpage';


export const Navigation = () => {

    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.uiReducer.user)
    const onSearchClicked = () => {
        dispatch(setSearch(searchText))
    }




    return (

        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between navigation" expand="lg" collapseOnSelect>

            <Navbar.Brand className='ms-4 brand'><Link to="/">WebCenter</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-target="#navbarScroll" />

            <Navbar.Collapse id="navbarScroll">


                <Form className="d-flex search-form flex-grow-1 me-3">
                    <FormControl
                        type="search"
                        placeholder="Search websites"
                        className="me-1"
                        aria-label="Search"
                        onChange={ev => setSearchText(ev.target.value)}
                    />
                    <Button onClick={onSearchClicked}>
                        <b className="bi bi-search">Search</b>
                    </Button>
                </Form>
                {user.id === 0
                    ?
                    <div>
                        <Button variant="me-1">
                            <Link to="/login"><b className="nav-login">Log In</b></Link>

                        </Button>
                        <Button variant="me-4">
                            <Link to="/signup" className="nav-login"> <b className="">Sign Up</b></Link>

                        </Button>
                    </div>
                    : <Logout className="nav-login" />}


            </Navbar.Collapse>





        </Navbar>
    )
}
