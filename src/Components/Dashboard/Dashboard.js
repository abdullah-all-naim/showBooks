import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';

const Dashboard = () => {
    const getUser = localStorage.getItem('loggedIn')
    const [user, setUser] = useState([])
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:5000/userinfos?token=' + getUser)
            .then((response) => response.data)
            .then(data => {
                if (data) {
                    setUser(data)
                    setLoading(true)
                }

            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/info')
            .then((response) => response.data)
            .then(data => {
                setInfo(data)
            })
    }, [])
    let lightClick = 0
    let darkClick = 0
    info.map(info => {
        if (info.type === 'light') {
            lightClick += 1
        }
        if (info.type === 'dark') {
            darkClick += 1
        }
    })
    return (
        <>
            <Navigation />
            <div className='text-center mt-5 container'>
                <div>
                    <h3 className='text-left my-4'>Dashboard</h3>
                </div>
                <div className='d-flex flex-wrap justify-content-between my-4'>
                    <h5><span className='rounded p-1' style={{ backgroundColor: 'chocolate' }}>Total Light Mode Click </span> &nbsp; : {lightClick}</h5>
                    <h5><span className='rounded p-1' style={{ backgroundColor: 'chocolate' }}>Total Dark Mode Click </span> &nbsp; : {darkClick}</h5>
                </div>
                <div>
                    {loading ?

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Book Name</th>
                                    <th scope="col">Mode</th>
                                    <th scope="col">Username</th>
                                </tr>
                            </thead>
                            {info.map((x, y) =>
                                <tbody>
                                    <tr>
                                        <th scope="row">{y + 1}</th>
                                        <td>{x.name}</td>
                                        <td>{x.type}</td>
                                        <td>{x.user}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        : <div class="text-center mt-5">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Dashboard;