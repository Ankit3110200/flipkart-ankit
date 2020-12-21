import {cartconstants} from "./constant"
import store from '../store'
import axiosintace from "../helper/axios";

const getcartitems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartconstants.ADD_TO_CART_REQUEST });
            const res = await axiosintace.post(`/user/getcartitems`);
            if (res.status === 200) {
                const { cartitems } = res.data;
                console.log({ getcartitems: cartitems })
                if (cartitems) {
                    dispatch({
                        type: cartconstants.ADD_TO_CART_SUCCESS,
                        payload: { cartitems }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addtocart=(product,newqty=1)=>{
    return async dispatch=>{
        const {
            cart:{cartitems},auth
        }=store.getState()
        // console.log("action.products",products)
        const qty=cartitems[product._id]?parseInt(cartitems[product._id].qty+newqty):1;
        cartitems[product._id]={
            ...product,
            qty
        }
        if(auth.authenticate){
            dispatch({type:cartconstants.ADD_TO_CART_REQUEST})
            const payload={
                cartitems:[{
                    product:product._id,
                    quantity:qty
                }]
            }
            console.log(payload)
            const res=await axiosintace.post(`/user/cart/addtocart`,payload)
            console.log(res)
            if(res.status===200){
                dispatch(getcartitems())
            }
        }else{
            localStorage.setItem('cart',JSON.stringify(cartitems))
        }
        
        console.log('addtocart::',cartitems)

        dispatch({
            type:cartconstants.ADD_TO_CART_SUCCESS,
            payload:{cartitems}
        })
    }
}

export const updatecrt=()=>{
    return async dispatch=>{
        const {auth}=store.getState()
        let cartitems=(localStorage.getItem('cart'))?
        JSON.parse(localStorage.getItem('cart'))
        :null

        console.log('upppppp')
        
        if(auth.authenticate){
            localStorage.removeItem('cart')
            if(cartitems){
                const payload={
                    cartitems:Object.keys(cartitems).map((key,index)=>{
                        return{
                            quantity:cartitems[key].qty,
                            product:cartitems[key]._id
                        }
                    })
                };
                if(Object.keys(cartitems).length>0){
                    const res=await axiosintace.post(`/user/cart/addtocart`,payload)
                    if(res.status===200){
                        dispatch(getcartitems())
                    }
                }
            }
        }else{
            if(cartitems){
                dispatch({
                    type:cartconstants.ADD_TO_CART_SUCCESS,
                    payload:{cartitems}
                })
            }
        }
        
        
        // if(cart){
        //     dispatch({ 
        //         type:cartconstants.ADD_TO_CART,
        //         payload:{cartitems:cart}
        //     })
        // }
    }
}


export const removeCartItem = (payload) => {
    return async (dispatch) => {
      try {
        dispatch({ type: cartconstants.REMOVE_CART_ITEM_REQUEST });
        const res = await axiosintace.post(`/user/cart/removeItem`, { payload });
        if (res.status === 202) {
          dispatch({ type: cartconstants.REMOVE_CART_ITEM_SUCCESS });
          dispatch(getcartitems());
        } else {
          const { error } = res.data;
          dispatch({
            type: cartconstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

export{
    getcartitems
}