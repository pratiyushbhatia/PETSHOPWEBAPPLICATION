import React, { Fragment, useState,useEffect} from 'react'
import Pagination from 'react-js-pagination'

import Product from './product/Product'

import {useDispatch,useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions'

const Home = ({match}) => {

  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch();

  const {loading, products, error, productsCount, resPerPage} = useSelector(state => state.products)
  const keyword = match.params.keyword

  useEffect(() => {
    dispatch(getProducts(keyword,currentPage));

  }, [dispatch,error, keyword,currentPage])

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

    return (
        <Fragment>
          {loading ? <h1>Loading...</h1> :(
            <Fragment>
               <h1 id="products_heading">WELCOME TO THE PET SHOP</h1>
                <section id="products" className="container mt-5">
                <div className="row">
                {products && products.map(product =>(
                <Product key={product._id} product={product} />

                 ))}

                </div>
                </section>

                {resPerPage <= productsCount && (

                
                      <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                linkClass="page-link"
                               
                            />
                        </div>

                )}
                    





            </Fragment>

           )}
             
        </Fragment>



    )
}

export default Home