import React, {useEffect} from 'react'
import {Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import {addItemToCart} from '../../actions/cartActions'

const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product , error} = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if(error){
            dispatch(clearErrors())
        }


    }, [dispatch,error, match.params.id])

    const addToCart = () =>{
        dispatch(addItemToCart(match.params.id));
        alert.success('Pet Booking Initiated')
    }


    
  
    
        
    

    



    return (
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product.name}</h3>
                               
                <hr />


                   
                 

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <p id="product_price">Rs {product.price}</p>

               
               
                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart}>Book Now</button>
               
                <hr />
               
               
             </div>
        </div>

        



    )
}

export default ProductDetails