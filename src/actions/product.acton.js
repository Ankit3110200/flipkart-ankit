import axios from "../helper/axios"
import { productconstants } from "./constant"

export const getproductbyslug=(slug)=>{
    return async dispatch=>{
        dispatch({type:productconstants.GET_ALL_PRODUCT_BY_SLUG_REQUEST})
        const res=await axios.get(`/products/${slug}`)
        if(res.status===200)
        {
            dispatch({
                type:productconstants.GET_ALL_PRODUCT_BY_SLUG_SUCCESS,
                payload:res.data
            })
        }else{
            dispatch({
                type:productconstants.GET_ALL_PRODUCT_BY_SLUG_FAILURE,
                payload:{error:res.data.error}
            })
        }
        
    }
}

export const getproductsofpage=(slug)=>{
    return async dispatch=>{
        
        const res=await axios.get(`/productsofpage/${slug}`)
        if(res.status===200){
            dispatch({
                type:productconstants.GET_ALL_PRODUCT_BY_SLUG_SUCCESS,
                payload:res.data
            })
        }
        else{
            console.log("error")
        }

}
}
export const getproductpage=(payload)=>{
    return async dispatch=>{
        try{
            dispatch({type:productconstants.GET_PRODUCT_PAGE_REQUEST})
            const {cid,type}=payload.params
            const res=await axios.get(`/page/${cid}/${type}`)
         
            if(res.status===200)
            {
                const {page}=res.data
               dispatch({
                   type:productconstants.GET_PRODUCT_PAGE_SUCCESS,
                payload:{page}
                })
            }else{
                const {error}=res.data.error
               dispatch({
                   type:productconstants.GET_PRODUCT_PAGE_FAILURE,
                payload:{error}
                })
            }
        }catch(error){

            console.log(error)
        }
        
        
    }
}

export const getproductdetailbyid=(payload)=>{
    return async dispatch=>{
        try{
            dispatch({type:productconstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST})
            const {productid}=payload.params
            const res=await axios.get(`/product/${productid}`)
            console.log(res)   
            dispatch({
                type:productconstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload:{productDetails:res.data.product}
                })
        }catch(error){
            console.log(error)
            dispatch({
                type:productconstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
             payload:{error:error}
             })
        }
        
        
    }
}