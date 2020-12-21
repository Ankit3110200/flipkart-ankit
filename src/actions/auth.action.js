import axiosintace from "../helper/axios"
import { authconstants, cartconstants, usersignupconstants } from "./constant"

export const login = (user) => {

  return async (dispatch) => {
    dispatch({ type: authconstants.LOGIN_REQUEST });
    const res = await axiosintace.post('/signin', {
      ...user
    })
    if (res.status === 200) {
      const { token, user } = res.data;
      console.log(user)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token, user
        }
      })
    } else {
      dispatch({
        type: authconstants.LOGIN_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}
export const isuserlogin = () => {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: authconstants.LOGIN_SUCCESS,
        payload: {
          token, user
        }
      })
    } else {
      dispatch({
        type: authconstants.LOGIN_FAILURE,
        payload: { error: 'Failed to log in' }
      })
    }
  }
}

export const signout = () => {
  return async dispatch => {
    dispatch({ type: authconstants.LOGOUT_REQUEST })
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear()
    dispatch({
      type: authconstants.LOGOUT_SUCCESS
    })
    dispatch({
      type: cartconstants.RESET_CART
    })
    // const res=await axiosintace.post('/admin/signout')

    // if(res.status===200){
    //   
    //   
    // }else{
    //   dispatch({
    //     type:authconstants.LOGOUT_FAILURE,
    //     payload:{error:res.data.error}
    //   })
    // }

  }
}

  
export const signup = (user)=>{
    console.log(user)
  
    return async (dispatch) =>{
        dispatch({type:usersignupconstants.USER_REGISTER_REQUEST});
        const res= await axiosintace.post('/signup',{
          ...user
        })
        if(res.status===200){
          const{message}=res.data;
    
          dispatch({
            type:usersignupconstants.USER_REGISTER_SUCCESS,
            payload:{
              message
            }
          })
  
        }else{
          dispatch({
            type:usersignupconstants.USER_REGISTER_FAILURE,
            payload:{error:res.data.error}
          })
        }
    }
  }
