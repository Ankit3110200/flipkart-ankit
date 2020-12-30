import React, { useState } from 'react'
import { generatepublicimgUrl } from "../../../urlConfig"
import './style.css'
const CartItem = (props) => {
    const [qty, setqty] = useState(props.cartItem.qty)

    const {
        _id, name, price, img
    } = props.cartItem
    const onQuanttyIncrement = () => {
        setqty(qty + 1)
        props.onQuanttyIncrement(_id, qty + 1)
    }
    const onQuanttyDecrement = () => {
        if (qty <= 1) return;
        setqty(qty - 1)
        props.onQuanttyDecrement(_id, qty - 1)
    }
    return (
        <>
            <div class="cartItemContainer">
                <div className="flexRow">

                    <div className="cartProImgContainer">
                        <img src={generatepublicimgUrl(img)} alt={""} />
                    </div>
                    <div className="cartItemDetails">
                        <div>
                            <p>{name}</p>
                            <p>Rs.{price}</p>
                        </div>
                        <div>Delivery in 3-5 days</div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    margin: "5px 0"
                }}>
                    <div className="quantityControl">
                        <button onClick={onQuanttyDecrement} >-</button>
                        <input value={qty} readOnly />
                        <button onClick={onQuanttyIncrement}>+</button>
                    </div>
                    <button className="cartActionbtn">save for later</button>
                    <button
                        className="cartActionBtn"
                        onClick={() => props.onRemoveCartItem(_id)}
                    >
                        Remove
        </button>
                </div>
            </div>
        </>
    )
}



export default CartItem
