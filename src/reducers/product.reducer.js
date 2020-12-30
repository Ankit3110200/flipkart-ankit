import { productconstants } from "../actions/constant"

const intialstate = {
    products: [],
    productbyprice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    },
    pagerequest: false,
    page: {},
    error: null,
    productDetails: {},
    loading: false,
    homeproducts:[]
}

export default (state = intialstate, action) => {
    switch (action.type) {
        case productconstants.GET_ALL_PRODUCT_BY_SLUG_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case productconstants.GET_ALL_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                productbyprice: {
                    ...action.payload.productbyprice
                },
                loading:true
            }
            break;
        case productconstants.GET_ALL_PRODUCT_BY_SLUG_FAILURE:
            state = {
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        case productconstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pagerequest: true
            }
            break
        case productconstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pagerequest: false
            }
            break
        case productconstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                pagerequest: false
            }
            break
        case productconstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case productconstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
            }
            break
        case productconstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break
            case productconstants.GET_PRODUCTS_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
                break
            case productconstants.GET_PRODUCTS_SUCCESS:
                state = {
                    ...state,
                    homeproducts: action.payload.products,
                    loading: false
                }
                break
            case productconstants.GET_PRODUCTS_FAILURE:
                state = {
                    ...state,
                    error: action.payload.error,
                    loading: false
                }
                break
    }
    return state
}