import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layout/MetaData'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders,clearErrors } from '../../actions/orderActions'


const OrdersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading,  error, orders } = useSelector(state => state.allOrders);
   
    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


    }, [dispatch, alert, error])


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },

                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
              
                {
                    label: 'Actions',
                    field: 'actions',
                },
               
            ],
            rows: []
        }

        orders.forEach( order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: ` Rs ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="col-12 col-md-3 mt-4 mt-md-0 text-white text-center"> Show details </i>
                    </Link>
                </Fragment>
               
                   
              
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <h1>Loading...</h1>: (
                            <MDBDataTableV5
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}


    export default OrdersList