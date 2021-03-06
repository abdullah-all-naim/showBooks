import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory()
    const [status, setStatus] = useState({
        mode: 'Signup'
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPass: ''
        },
        onSubmit: (values, { resetForm }) => {
            const tokenId = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
            setStatus({ mode: 'Login' })
            if (status.mode == 'Login') {
                axios.post('http://localhost:5000/user', { values: values, token: tokenId })
                    .then(response => console.log(response))

                localStorage.setItem('loggedIn', tokenId)
                setTimeout(function(){ window.location.reload() }, 1000);
                history.push('/')

            }
        },
        validate: (values) => {
            let errors = {};
            if (status === 'Signup') {
                if (!values.name) {
                    errors.name = 'Required'
                }
            }
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid Email Address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Must be at least 4 characters'
            }

            if (status.mode == 'Signup') {
                if (!values.confirmPass) {
                    errors.confirmPass = 'Required'
                } else if (values.password !== values.confirmPass) {
                    errors.confirmPass = 'Password does not match'
                }
            }
            return errors

        }
    })
    const handleClick = () => {
        if (status.mode === 'Signup') {
            setStatus({ mode: 'Login' })
        }
        else {
            setStatus({ mode: 'Signup' })
        }
    }
    return (
        <>
            <div className='mr-5 mb-4 text-center mt-5'>
                <Link to='/' className='text-decoration-none'><h1>ShowBooks</h1></Link>
            </div>
            <div style={{ padding: '10px 0' }}>
                <div className='d-flex flex-wrap justify-content-center my-5' style={{ border: '1px solid lightGrey', margin: 'auto', borderRadius: '15px', padding: '30px 0', backgroundColor: 'white', width: '500px' }}>

                    <button className="btn btn-warning col-md-10 ml-2 mb-3" onClick={handleClick} >Swtich to {status.mode == 'Signup' ? 'Login' : 'SignUp'}</button>
                    <h1 className='font-weight-bold mb-5'>{status.mode}</h1>
                    <form className='d-flex flex-wrap justify-content-center' onSubmit={formik.handleSubmit}>
                        {status.mode == 'Signup' ? <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control" name='name' id='name' placeholder="Full Name" value={formik.values.name} />
                            {formik.touched.name && formik.errors.name ? (<div className="text-danger text-left">{formik.errors.name}</div>) : null}
                        </div> : null}
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control" name='email' id='email' placeholder="Enter Your Email Address" />
                            {formik.touched.email && formik.errors.email ? (<div className="text-danger text-left">{formik.errors.email}</div>) : null}
                        </div>
                        <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className="form-control" name='password' id='password' placeholder="Password" />
                            {formik.touched.password && formik.errors.password ? (<div className="text-danger text-left">{formik.errors.password}</div>) : null}
                        </div>
                        {status.mode == 'Signup' ? <div className="form-group col-md-10 mb-4">
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPass} type="password" className="form-control" name='confirmPass' id='confirm-password' placeholder="Confirm Password" />
                            {formik.touched.confirmPass && formik.errors.confirmPass ? (<div className="text-danger text-left">{formik.errors.confirmPass}</div>) : null}
                        </div> : null}
                        <button type="submit" className="btn btn-danger col-md-10 ml-2" >{status.mode == 'Signup' ? 'SignUp' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;