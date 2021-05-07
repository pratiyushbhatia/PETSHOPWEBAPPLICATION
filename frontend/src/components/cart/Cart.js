import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart,removeItemFromCart } from '../../actions/cartActions'

const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

  

   
    

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
            
            {cartItems.length === 0 ? <h2 className="mt-5">Your have not selected your pet</h2> : (
                <Fragment>
                    <h2 className="mt-5">Your Selected Pets</h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {cartItems.map(item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">Rs {item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <button id="delete_cart_item" className="btn btn-primary btn-block" onClick={() => removeCartItemHandler(item.product)}>Remove</button>
                                            </div>

                                           

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}

                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Booking Summary</h4>
                                <hr />
                                

                                <p>Est. total: <span className="order-summary-values" >Rs {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span></p>
                                <button id="checkout_btn" className="btn btn-primary btn-block text-black text-center" onClick={checkoutHandler}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart