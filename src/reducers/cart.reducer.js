import { cartconstants } from '../actions/constant'

const intialstate = {
    cartitems: {
        // 123:{
        //     _id:123,
        //     name:"..",
        //     img:".",
        //     price:".",
        //     qty:1
        // }
    },
    updatingcart: false,
    error: null
}

export default (state = intialstate, action) => {
    switch (action.type) {
        case cartconstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingcart: true
            }
            break;
        case cartconstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                updatingcart: false,
                cartitems: action.payload.cartitems
            }
            break;
        case cartconstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingcart: false,
                error: action.payload.error
            }
            break;
        case cartconstants.RESET_CART:
            state = {
                ...intialstate
            }
            break;


    }
    return state
}