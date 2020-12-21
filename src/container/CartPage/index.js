import React, { useEffect, useState } from 'react'
import './style.css'
import Layout from '../../components/Layout'
import Card from "../../components/Ui/card"
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './cartitem'
import { addtocart, getcartitems, login, removeCartItem } from '../../actions'
import { Modal, MaterialInput, MaterialButton, DropdownMenu } from '../../components/MaterialUi'
import PriceDetails from '../../components/PriceDetails'

function CartPage(props) {
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cartitems, setcartitems] = useState(cart.cartitems)

    const userlogin = () => {
        dispatch(login({email,password}))
    }

    const dispatch = useDispatch()
    useEffect(() => {
        setcartitems(cart.cartitems)
    }, [cart.cartitems])

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getcartitems())
            setLoginModal(false)
        }
    }, [auth.authenticate])
    const onQuanttyIncrement = (_id, qty) => {
        console.log(_id, qty)
        const { name, price, img } = cartitems[_id]
        dispatch(addtocart({ _id, name, price, img }, 1))
    }
    const onQuanttyDecrement = (_id, qty) => {
        console.log(_id, qty)
        const { name, price, img } = cartitems[_id]
        dispatch(addtocart({ _id, name, price, img }, -1))
    }
    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
      };
    if (props.onlyCartItems) {
        return (
            <>
                {
                    Object.keys(cartitems).map((key, index) =>


                        <CartItem
                            key={index}
                            cartItem={cartitems[key]}
                            onQuanttyIncrement={onQuanttyIncrement}
                            onQuanttyDecrement={onQuanttyDecrement}
                            
                        />

                    )
                }
            </>
        )
    }
    return (
        <Layout>
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">

                            <div className="logininputcontainer">
                                <MaterialInput
                                    type="text"
                                    label="Enter Email/Enter Mobile Number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <MaterialInput
                                    type="password"
                                    label="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                // rightElement={<a href="#">Forgot?</a>}
                                />

                                <MaterialButton
                                    title="Login"
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    style={{ margin: "40px 0 20px 0" }}
                                    onClick={userlogin}
                                />
                                <p style={{ textAlign: "center" }}>OR</p>

                                <MaterialButton
                                    title="REQUEST OTP"
                                    bgColor="#ffffff"
                                    textColor="#2874f0"
                                    style={{ margin: "20px 0" }}
                                //   onClick={userlogin}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card
                    headerleft={`My cart & Delivery to`}

                    style={{ width: "70%" }}
                >
                    {
                        Object.keys(cartitems).map((key, index) =>


                            <CartItem
                                key={index}
                                cartItem={cartitems[key]}
                                onQuanttyIncrement={onQuanttyIncrement}
                                onQuanttyDecrement={onQuanttyDecrement}
                                onRemoveCartItem={onRemoveCartItem}
                            />

                        )
                    }

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        {
                            auth.authenticate ? <div style={{ width: "250px" }}>
                                <MaterialButton
                                    title="PLACE ORDER"
                                    onClick={() => props.history.push(`/checkout`)}
                                />
                            </div> : <div style={{ width: "250px" }}>
                                    <MaterialButton
                                        title="Login"
                                        onClick={() => setLoginModal(true)}
                                    />
                                </div>
                        }
                    </div>


                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart.cartitems).reduce(function (qty, key) {
                        return qty + cart.cartitems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartitems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartitems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CartPage
