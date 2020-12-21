import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generatepublicimgUrl } from '../../../urlConfig';
import { getproductbyslug,getproductsofpage, getproductpage } from '../../../actions'
import "./style.css"
import getparams from '../../../utils/getparams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/Ui/card'
import { Link } from 'react-router-dom'

function ProductPage(props) {
    const dispatch= useDispatch()
    const product=useSelector(state=>state.product)
    const {page}=product

    useEffect(()=>{
        const params=getparams(props.location.search)
        console.log(props)
        const payload={
            params
        }
        const { match } = props
        dispatch(getproductsofpage(match.params.slug)).then(dispatch(getproductpage(payload)))   
    },[])
    // useEffect(() => {
        
    //     console.log(product.products)
    // }, [])
    const originalproduct=product.products
    return (
        <>
        <div style={{margin:"0 10px"}}>
            <h3>{page.title}</h3>
            <Carousel
            renderThumbs={()=>{}}>
                {
                    page.banners && page.banners.map((banner,index)=>
                    <div className="bannercontainer" key={index}>
                    <a
                    key={index}
                    style={{display:"block"}}
                    href={banner.navigateTo}>
                    <img src={banner.img} />
                    </a>
                    </div>
                    )
                }
            </Carousel>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center" ,margin:"10px 0"}}>
            
                {/* {
                    console.log(originalproduct)
                } */}
                {
                    
                    originalproduct && originalproduct.map((product,index)=>
                    <Card headerleft={product.name} key={index} style={{width:"300px", height:"200px", margin:"5px 5px",padding:"15px"}}>
                            <Link to={`${originalproduct[index].slug}/${originalproduct[index]._id}/p`}>
                            <div className="productsimg"><img src={generatepublicimgUrl(product.productpicture[0].img)} alt="img"/></div>
                            </Link>
                            
                    </Card>
                    )
                    
                    
                }
            </div>
            </div>
        </>
    )
}


export default ProductPage
