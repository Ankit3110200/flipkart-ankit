import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import{ Carousel} from 'react-bootstrap'
import {Link} from "react-router-dom"
import c1 from '../../images/c1.jpg'
import c2 from '../../images/c2.jpg'
import c3 from '../../images/c3.jpg'
import './index.css'
import Card from '../../components/Ui/card'
import Rating from '../../components/Ui/Rating';
import Price from '../../components/Ui/Price';
import { MaterialButton } from '../../components/MaterialUi';
import Axios from 'axios'
import { api, generatepublicimgUrl } from '../../urlConfig'
import { useDispatch, useSelector } from 'react-redux'
import { getallproduct, gethomedata } from '../../actions'
function HomePage(props) {

const homedata=useSelector(state=>state.home.homedata)
const product=useSelector(state=>state.product)
const abc=homedata;
const dispatch=useDispatch()


  useEffect(()=>{
  dispatch(gethomedata())
  dispatch(getallproduct())
  },[])
  if(homedata.loading){
    return<><p>Loading...</p></>
  }



  console.log(homedata)
    return (
        <>
           <Layout />
           <div className="carousel-ads">
           <Carousel >
           <Carousel.Item>
             <img
             
               className="d-block mw-100 h-25"
               src={c2}
               alt="First slide"
            
             />
            
           </Carousel.Item>
           <Carousel.Item>
             <img
             
               className="d-block w-100"
               src={c3}
               alt="Third slide"
             />
         
            
           </Carousel.Item>
           <Carousel.Item>
             <img
             
               className="d-block w-100"
               src={c1}
               alt="Third slide"
             />
         
            
           </Carousel.Item>
         </Carousel>
         </div>
         {
          homedata.map((data,index) => {
              return (
                  <Card 
                  key={index}
                  headerleft={`${data.heading}`}
                  headerright={
                      <MaterialButton
                        title={"VIEW ALL"}
                        style={{
                          width: "96px",
                        }}
                        bgColor="#2874f0"
                        fontSize="12px"
                      />
                    }
                  
                  >
                  
                  <div style={{display:"flex"}}>
                                    {
                                        product.homeproducts.map(product =>
                                        <Link 
                                        key={product._id}
                                        to={`Samsung/${product.slug}/${product._id}/p`}
                                        style={{display:"block"}}  
                                        className='productcontainer'>

                                        
                                        {

                                          
                                            data.products[0].product===product._id?
                                          <div className='productcontainer'>
                                        <div className='productimg'>
                                            <img src={generatepublicimgUrl(product.productpicture[0].img)} alt='img'></img>
                                        </div>
                                        <div className='productinfo'>
                                            <div style={{ margin: "5px 0" }}>{product.name}</div>
                                            <div>
                                            <Rating value="4.3"/>
                                           
                                            <span
                                              style={{
                                                color: "#777",
                                                fontWeight: "500",
                                                fontSize: "12px",
                                              }}
                                            >
                                              
                                            </span>
                                            
                                            </div>
                                            <Price value={product.price} />
                                        </div>
                                      </div>
                                      
                                      :null
                                            }
                                            
                                          
                                        
                                          
                                          
                                            
                                            </Link>
                                        )
                                    }

                                </div>
                  </Card>
    
              )
            })
        
      }

        </>
    )
}


export default HomePage
