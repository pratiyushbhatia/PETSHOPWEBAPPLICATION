import React, { Fragment } from 'react'
import { Route,Link } from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'

import {logout} from '../../actions/userActions'

import Search from './search'

import '../../App.css'

const Header = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth)
  const{cartItems} = useSelector(state => state.cart)

  const logoutHandler =() => {
    dispatch(logout());

  }
     
    return (


      <Fragment>
      <nav className="navbar row">
          <div className="col-12 col-md-3">
              <div className="navbar-brand">
              <Link className="col-12 col-md-3 mt-4 mt-md-0 text-centre" to="/">

              <span id="Home" className="ml-3">Home Page</span>
              </Link>
              </div>
          </div>

          

          <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <Link to="/cart" style={{ textDecoration: 'none' }} >
                  <span id="cart" className="ml-3">Initiate Booking</span>
                
              </Link>

              {user ? (
                  <div className="ml-4 dropdown d-inline">
                     

                      
                          {user && user.role === 'admin' && (
                               <Link  to="/dashboard">
                                <span id="Dashboard" className="ml-3">Dashboard</span>
                               </Link>
                          )}
                          
                          <Link  to="/" onClick={logoutHandler}>
                          <span id="logout" className="ml-3">Logout</span>
                          </Link>

                      </div>


    

              ) : <Link to="/login" >
                 <span id="login" className="ml-3">Login</span>
              
            </Link>}


          </div>
      </nav>
  </Fragment>


               )
       }
export default Header