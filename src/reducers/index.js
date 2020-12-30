import {combineReducers} from 'redux'
import categoryReducers from './category.reducers';
import productReducer from './product.reducer';
import authreducer from './auth.reducer'
import cartreducer from './cart.reducer'
import  userReducer  from './user.reducer';
import homereducer from './home.reducer'
const rootreducer=combineReducers({
    category:categoryReducers,
    product:productReducer,
    auth:authreducer,
    cart:cartreducer,
    user:userReducer,
    home:homereducer
})

export default rootreducer