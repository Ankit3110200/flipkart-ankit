import axios from "../helper/axios"
import { homeconstatnt } from "./constant"


export const gethomedata=()=>{
    return async dispatch=>{
        dispatch({type:homeconstatnt.GET_HOME_DATA_REQ})
        const res=await axios.get(`/home/data`)
        if(res.status===200)
        {
            dispatch({
                type:homeconstatnt.GET_HOME_DATA_SUC,
                payload:res.data
            })
        }else{
            dispatch({
                type:homeconstatnt.GET_HOME_DATA_FAI,
                payload:{error:res.data.error}
            })
        }
        
    }
}