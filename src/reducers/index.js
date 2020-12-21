import {combineReducers} from 'redux'
import categoryReducers from './category.reducers';
import productReducer from './product.reducer';
import authreducer from './auth.reducer'
import cartreducer from './cart.reducer'
import  userReducer  from './user.reducer';
const rootreducer=combineReducers({
    category:categoryReducers,
    product:productReducer,
    auth:authreducer,
    cart:cartreducer,
    user:userReducer
})

export default rootreducer