import { homeconstatnt } from "../actions/constant"

const intialstate = {
    homedata: [],
    error: null,
    loading: false
}


export default (state = intialstate, action) => {
    switch (action.type) {
        case homeconstatnt.GET_HOME_DATA_REQ: 
            state = {
                ...state,
                loading: true
            }
            break;
            case homeconstatnt.GET_HOME_DATA_SUC: 
            state = {
                ...state,
              homedata:action.payload.homedata,
                loading: false
            }
            break;
                case homeconstatnt.GET_HOME_DATA_FAI: 
            state = {
                ...state,
                error:action.payload.error,
                loading: false
            }
            break;
        }
    
    return state
}