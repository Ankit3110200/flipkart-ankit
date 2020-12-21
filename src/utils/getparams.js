export default (query)=>{
    if(query){
        const querystring=query.split("?")[1]
        if(querystring.length>0){
            const params=querystring.split("&")
            const paramsObj={};
            params.forEach(param=>{
                const keyvalue=param.split("=")
                paramsObj[keyvalue[0]]=keyvalue[1]
            })
            return paramsObj
        }
    }
    return {};
}