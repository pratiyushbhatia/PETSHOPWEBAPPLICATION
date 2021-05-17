import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'



import { useDispatch, useSelector } from 'react-redux'


import { allOrders } from '../../actions/orderActions'


const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)

  

    useEffect(() => {
      
        dispatch(allOrders())
      
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                   
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />


                            <div className="row pr-4">

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                               
                               </div>




                                
                        </Fragment>
                    

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard