import { cartconstants, userconstants } from "./constant";
import axios from "../helper/axios";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/getaddress`);
      dispatch({ type: userconstants.GET_USER_ADD_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: {
            address
           }}
         = res.data;
        dispatch({
          type: userconstants.GET_USER_ADD_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userconstants.GET_USER_ADD_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/address/create`, { payload });
      dispatch({ type: userconstants.ADD_USER_ADR_REQUEST });
      if (res.status === 201) {
        console.log(res);
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userconstants.ADD_USER_ADR_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userconstants.ADD_USER_ADR_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder= (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/addorder`,  payload );
      dispatch({ type: userconstants.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        console.log(res);
        dispatch({
          type:cartconstants.RESET_CART,
        })
        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: userconstants.ADD_USER_ADR_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userconstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders= () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getorders`);
      dispatch({ type: userconstants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const {orders}=res.data
        dispatch({
          type:userconstants.GET_USER_ORDER_SUCCESS,
          payload:{orders}
        })
      } else {
        const { error } = res.data;
        dispatch({
          type: userconstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getOrder`, payload);
      dispatch({ type: userconstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userconstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userconstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};