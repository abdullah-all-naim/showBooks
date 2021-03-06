import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';

const Navigation = () => {
    const history = useHistory()
    const getUser = localStorage.getItem('loggedIn')
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/userinfos?token=' + getUser)
            .then((response) => response.data)
            .then(data => {
                setUser(data)
            })
    }, [])
    const handleLog = () => {
        localStorage.clear()
        setTimeout(function(){ window.location.reload() }, 1000);
    }
    return (
        <div className="shadow bg-white">
            <Navbar expand="lg" className='container'>
                <NavLink to="/" className="">
                    <h1>ShowBooks</h1>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink className="text-decoration-none font-weight-bold text-dark d-flex align-items-center mx-4" to="/">Home</NavLink>
                        {localStorage.getItem('loggedIn')?
                                <>
                                    <div className="text-decoration-none font-weight-bold text-success mx-3 d-flex align-items-center">
                                        HOWDY, {
                                            user.map(x => x.values.name)
                                        }
                                    </div>
                                    <button className='btn btn-warning px-5 d-flex align-items-center mx-4' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '20px' }}  onClick={() => history.push('/dashboard')}>Dashboard</button>
                                    <button className='btn btn-warning px-5 d-flex align-items-center' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '20px' }} onClick={handleLog}>Logout</button>
                                </>
                                : <>
                                    <button className='btn btn-warning px-5 d-flex align-items-center' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '20px' }} onClick={() => history.push('/login')}>Login</button>
                                </>
                            }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;