import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'


import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
           
            dispatch(clearErrors());
        }

    }, [dispatch,  isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            
            <MetaData title={'Login'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg"  onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password </label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                               
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block "
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="px-auto
                                ">New User?</Link>
                            </form>
                        </div>
                    </div>


                </Fragment>
            
    
    )
}

export default Login