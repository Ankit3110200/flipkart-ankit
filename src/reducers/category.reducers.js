import { catconstants } from "../actions/constant"

const intialstate={
    categories: [],
    loading: false,
    error: null
}

export default (state=intialstate,action)=>{
    switch(action.type){
        case catconstants.GET_ALL_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
        break;
        case catconstants.GET_ALL_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories,loading:false
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
               loading:true
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false
            }
        break;
        case catconstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...intialstate               
            }
        break;
    }
    return state
}