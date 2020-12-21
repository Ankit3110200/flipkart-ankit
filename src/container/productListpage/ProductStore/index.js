import React, { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getproductbyslug } from '../../../actions';
import {Link} from "react-router-dom"
import { generatepublicimgUrl } from '../../../urlConfig';
import Card from '../../../components/Ui/card'
import Rating from '../../../components/Ui/Rating';
import Price from '../../../components/Ui/Price';
import { MaterialButton } from '../../../components/MaterialUi';
const ProductStore=(props)=> {
    const product = useSelector(state => state.product)
    const [pricerange,setpricerange]=useState({
        under5K:5000,
        under10k:10000,
        under15k:15000,
        under20k:20000,
        under30k:30000
    })
    const dispatch = useDispatch();


    useEffect(() => {
        const { match } = props
        dispatch(getproductbyslug(match.params.slug))
    }, [])
    return (
        <>

         {
                    Object.keys(product.productbyprice).map((key, index) => {
                        return (
                            <Card 
                            headerleft={`${props.match.params.slug} under ${pricerange[key]}`}
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
                                        product.productbyprice[key].map(product =>
                                        <Link 
                                        to={`${product.slug}/${product._id}/p`}
                                        style={{display:"block"}}  
                                        className='productcontainer'>
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

export default ProductStore
