import React from 'react'

import Layout from '../../components/Layout'
import getparams from '../../utils/getparams'
import ClothingAndAccessories from './clothingandacce'
import ProductPage from './productPage'
import ProductStore from './ProductStore'

import "./style.css"
function ProductListPage(props) {
    
    const renderproducts=(props)=>{
        // console.log(props)
        // console.log(props.location.search)
        const params=getparams(props.location.search)
        console.log(params)
        let content=null
        switch(params.type){
            case "store":
                content = <ProductStore {...props}/>
                break;
            case "page":
                content = <ProductPage {...props}/>
                break;
            default:
                content=<ClothingAndAccessories {...props}/>
        }
        return content
    }
    
    return (
        <>
            <Layout>
               
               {
                   renderproducts(props)
               } 
            </Layout>
        </>
    )
}

export default ProductListPage
