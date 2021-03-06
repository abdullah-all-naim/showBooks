import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import './ShowBooks.css'
const ShowBooks = () => {
    const [book, setBook] = useState([])
    const history = useHistory()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const getUser = localStorage.getItem('loggedIn')
    useEffect(() => {
        axios.get('https://www.anapioficeandfire.com/api/books?pageSize=30')
            .then((response) => response.data)
            .then((data) => {
                if (data) {
                    setBook(data)
                    setLoading(true)
                }
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/userinfos/?token=' + getUser)
            .then((response) => response.data)
            .then((data) => setUser(data))
    }, [])
    const username = user.map(x => x.values.email)
    const handleClick = (type, name) => {
        axios.post('http://localhost:5000/whoclicked', { user: username.join(), type: type, name: name })
            .then(response => console.log(response))
    }
    return (
        <>
            { loading ? <div>
                <div className="container d-flex flex-wrap justify-content-center mt-5">
                    {
                        book.slice(0, 6).map(x =>
                            <div className="flex-wrap justify-content-center col-3 m-3 shadow bg-white p-4" style={{ border: '1px solid lightGrey', borderRadius: '20px' }} id='books'>
                                <h4 className='text-center mb-4' style={{ color: 'brown' }}>{x.name}</h4>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>Author</span> <span>{x.authors}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>ISBN</span>  <span>{x.isbn}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>No of Pages</span>  <span>{x.numberOfPages}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>Released</span> <span>{x.released}</span></h6>
                                <div className='text-center' id='book'>
                                    {getUser ? <button className='btn px-5 mr-3 py-1 mb-2 bg-warning' style={{ borderRadius: '40px', fontWeight: 'bold' }} onClick={() => handleClick('light', x.name)}>Click</button>
                                        : <button className='btn px-5 mr-3 py-1 mb-2 bg-warning' style={{ borderRadius: '40px', fontWeight: 'bold', cursor: 'not-allowed' }} title='You must be loggedin to click this' disabled>Click</button>
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
                <div className="container d-flex flex-wrap justify-content-center mt-5 pt-4">
                    {
                        book.slice(6, 12).map(x =>
                            <div className=" flex-wrap justify-content-center col-3 m-3 p-4 shadow" style={{ border: '1px solid lightGrey', borderRadius: '10px', backgroundColor: '#102040', color: 'white' }} id='shop'>
                                <h4 className='text-center mb-4' style={{color: 'cornsilk'}}>{x.name}</h4>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>Author</span> <span>{(x.authors).join(', ')}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>ISBN</span>  <span>{x.isbn}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>No of Pages</span>  <span>{x.numberOfPages}</span></h6>
                                <h6 className='d-flex justify-content-between'><span style={{ color: 'coral'}}>Released</span> <span>{x.released}</span></h6>
                                <div className='text-center' id='book'>
                                    {getUser ? <button className='btn px-5 mr-3 py-1 mb-2 bg-warning' style={{ borderRadius: '40px', fontWeight: 'bold' }} onClick={() => handleClick('dark', x.name)}>Click</button>
                                        : <button className='btn px-5 mr-3 py-1 mb-2 bg-warning' style={{ borderRadius: '40px', fontWeight: 'bold', cursor: 'not-allowed' }} title='You must be loggedin to click this' disabled>Click</button>
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
                : <div class="text-center mt-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>}
        </>
    );
};

export default ShowBooks;