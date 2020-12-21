import axios from "../helper/axios"
import { catconstants } from "./constant";

export const getAllcategory=()=>{
    return async dispatch=>{
            dispatch({type:catconstants.GET_ALL_CATEGORY_REQUEST})
            const res=await axios.get("/category/getcategory")
            if(res.status === 200){
                const {categorylist}=res.data
                // console.log(categorylist)
                dispatch({

                    type:catconstants.GET_ALL_CATEGORY_SUCCESS,
                    payload:{categories:categorylist}
                })
            }else{
                dispatch({
                    type:catconstants.GET_ALL_CATEGORY_FAILURE,
                    payload:{error:res.data.error}
                })
            }
    }
}
