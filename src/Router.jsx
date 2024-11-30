// when we create router to hold at one router.jsx  which is create inside of App.jsx 
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from  './Pages/Cart/Cart'
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js"
import ProtectedRoute from './Components/ProtectedRoute'

const stripePromise = loadStripe("pk_test_51QMbC0DXZ0dHgb2GTptP1ThDcB99COWMgeQCpvviDpZMa5jiUEjWHtO3Isq25dSHS4lzfrDOUNKmFUN5iP0Sq83S00i84eAm1W") // this is puplic key from stripe 

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/payments" element={

              <ProtectedRoute message={"You must log in Your account to pay"} redirect={"/payments"}>
                 <Elements stripe={stripePromise}>

                <Payment />
              </Elements>

              </ProtectedRoute>
            
              } />
            <Route path="/orders" element={
              <ProtectedRoute message={"You must log in to access your orders"}
                 redirect={"/orders"}>
                <Orders />
              </ProtectedRoute>
          
              } /> 
            <Route path="/category/:categoryName" element={<Results/>} />
            <Route path="/products/:productId" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart/>} /> 
        </Routes>
    </Router>
  )
}

export default Routing

// This import into App.jsx and also it is Home page 