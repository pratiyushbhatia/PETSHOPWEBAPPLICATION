import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'



import Header from './components/layout/Header'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'


import ConfirmOrder from './components/cart/ConfirmOrder'

import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'


import Login from './components/user/Login'

import Register from './components/user/Register'

import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import NewProduct from './components/admin/NewProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'


import ProtectedRoute from './components/route/ProtectedRoute'

import {loadUser} from './actions/userActions'
import store from './store'
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  

  useEffect(() => {

    store.dispatch(loadUser())
    async function getStripApiKey() {
      const {data} = await axios.get('/api/v1/stripeapi');

    
      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey();

  }, [])

 
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
      <Route path="/" component={Home} exact />
      <Route path="/search/:keyword" component={Home} />
      <Route path="/product/:id" component={ProductDetails} exact />

      <Route path="/cart" component={Cart} exact />
      <ProtectedRoute path="/shipping" component={Shipping} exact />
    
      <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />

      <ProtectedRoute path="/success" component={OrderSuccess} exact />

      {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

      <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
      <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList} exact/>
      <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
      <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact/>
      <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>




      <Route path="/login" component={Login}  />
      <Route path="/register" component={Register}  />
     </div>
     </div>
     </Router>

  
  );
}

export default App;
