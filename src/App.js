
import './App.css';
import HomePage from './container/HomePage';
import ProductDetailspage from './container/productdetalispage';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import ProductListPage from './container/productListpage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isuserlogin, updatecrt } from './actions';
import CartPage from './container/CartPage';
import CheckoutPage from './container/checkoutpage';
import OrderPage from './container/orderpage';
import OrderDetailsPage from './container/OrderDetailsPage';


function App() {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)

  useEffect(()=>{
      if(!auth.authenticate) { 
      console.log("is user log in checking...")
      dispatch(isuserlogin())}
  },[auth.authenticate])
  useEffect(()=>{
    console.log('App.js=updatecart')
    dispatch(updatecrt())
  },[auth.authenticate])
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/cart" exact component={CartPage}/>
        <Route path="/checkout" exact component={CheckoutPage}/>
        <Route path="/account/orders" exact component={OrderPage} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
        <Route path="/:slug/:productslug/:productid/p" exact component={ProductDetailspage}/>
        <Route path="/:slug" exact component={ProductListPage}/>
       
        
        
      </Switch>
    </Router>
  
    </div>
  );
}

export default App;
