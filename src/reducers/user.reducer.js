import { userconstants } from "../actions/constant";

const initState = {
  address: [],
  orders:[],
  error: null,
  loading: false,
  orderfetching:false
};

export default (state = initState, action) => {
  switch (action.type) {
    case userconstants.GET_USER_ADD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userconstants.GET_USER_ADD_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      break;
    case userconstants.GET_USER_ADD_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userconstants.ADD_USER_ADR_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userconstants.ADD_USER_ADR_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      break;
    case userconstants.ADD_USER_ADR_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
      case userconstants.GET_USER_ORDER_REQUEST:
      state = {
        ...state,
        orderfetching:true
      };
      break;
      case userconstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orderfetching:false,
        orders: action.payload.orders,
      };
      break;
      case userconstants.GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        orderfetching:false,
        error: action.payload.error,
      };
      break;
      case userconstants.GET_USER_ORDER_DETAILS_REQUEST:
      break;
    case userconstants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order,
      };
      break;
    case userconstants.GET_USER_ORDER_DETAILS_FAILURE:
      break;
    case userconstants.ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        placedOrderId: action.payload.order._id,
      };
      break;
  }

  return state;
};