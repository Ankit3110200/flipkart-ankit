import React, { useEffect, useState } from 'react'
import { addOrder, getAddress, getcartitems } from '../../actions/index'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import {
    Anchor,
    MaterialButton,
    MaterialInput,
} from "../../components/MaterialUi";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/Ui/card";
import AddressForm from "./AddressForm";
import CartPage from "../CartPage";
import './style.css'

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>

            </div>
            {props.body && props.body}
        </div>
    )
}
const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">{adr.addressType}</span>
                                <span className="addressMobileNumber">{adr.mobilenumber}</span>
                            </div>
                            {adr.selected && (
                                <Anchor
                                    name="EDIT"
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                        fontWeight: "500",
                                        color: "#2874f0",
                                    }}
                                />
                            )}
                        </div>
                        <div className="fullAddress">
                            {adr.address} <br /> {`${adr.state} - ${adr.pincode}`}
                        </div>
                        {adr.selected && (
                            <MaterialButton
                                title="DELIVERY HERE"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                    width: "200px",
                                    margin: "10px 0",
                                }}
                            />
                        )}
                    </div>
                ) : (
                        <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            onCancel={() => { }}
                        />
                    )}
            </div>
        </div>
    );
};

const CheckoutPage = (props) => {
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const [newAddress, setNewAddress] = useState(false)
    const [confirmAddress, setConfirmAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [orderSummary, setOrderSummary] = useState(true);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [address, setaddress] = useState([])
    const dispatch = useDispatch()

    const selectAddress = (selectedadr) => {
        console.log(selectedadr)
        const updatedadr = address.map(adr => adr._id === selectedadr._id ? { ...adr, selected: true } : { ...adr, selected: false })
        setaddress(updatedadr)
    }

    const confirmDeliveryAddress = (selectedadr) => {
        setSelectedAddress(selectedadr)
        setConfirmAddress(true)
    }
    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(false);
        setOrderSummary(true);
    };
    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setaddress(updatedAddress);
    };
    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
    };

    const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartitems).reduce(
            (totalPrice, key) => {
                const { price, qty } = cart.cartitems[key];
                return totalPrice + price * qty;
            },
            0
        );
        const items = Object.keys(cart.cartitems).map((key) => ({
            productId: key,
            payablePrice: cart.cartitems[key].price,
            purchasedQty: cart.cartitems[key].qty,
        }));
        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: `pending`
        };

        console.log(payload);
        dispatch(addOrder(payload));
        setConfirmOrder(true);
    };


    useEffect(() => {
        auth.authenticate && dispatch(getAddress())
        auth.authenticate && dispatch(getcartitems())
    }, [auth.authenticate])

    useEffect(() => {
        const address = user.address.map(addr => ({ ...addr, selected: false, edit: false }))
        setaddress(address)
    }, [user.address])

    if (confirmOrder && auth.authenticate) {
        return (
            <Layout>
                
                    <div style={{fontSize:"5em",fontFamily:"Arial, Helvetica, sans-serif",textAlign:"center"}}>Thank You</div>
                
            </Layout>
        )
    }

    return (
        <>
            <Layout>
                <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                    <div className="checkoutContainer">
                        {/* check if user logged in or not */}
                        <CheckoutStep
                            stepNumber={"1"}
                            title={"LOGIN"}
                            active={!auth.authenticate}
                            // active={false}
                            body={
                                auth.authenticate ? (
                                    <div className="loggedInId">
                                        <span style={{ fontWeight: 500 }}>{auth.user.firstname}</span>
                                        {/* <span style={{ margin: "0 5px" }}>{auth.user.email}</span> */}
                                    </div>
                                ) : (
                                        <div>
                                            <MaterialInput label="Email" />
                                        </div>
                                    )
                            }
                        />
                        {/* <CheckoutStep
                            stepNumber={"2"}
                            title={"DELIVERY ADDRESS"}
                            // active={!auth.authenticate}
                            active={!confirmAddress && auth.authenticate}
                            body={

                                <>
                                    {
                                        confirmAddress?<div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pincode}`}</div>
                                        :address.map(adr =>
                                            <div className="flexRow addressContainer">
                                                <div>
                                                    <input name="address" onClick={() => { selectaddresss(adr) }} type="radio" />
                                                </div>
                                                <div className="flexRow sb addressinfo">
                                                
                                                    <div>
                                                        <div>
                                                            <span>{adr.name}</span>
                                                            <span>{adr.addressType}</span>
                                                            <span>{adr.mobilenumber}</span>
                                                        </div>
                                                        <div>
                                                            {adr.address}
                                                        </div>
                                                        {
                                                            adr.selected ?
                                                                <MaterialButton
                                                                    title="Delivery Here"
                                                                    style={{
                                                                        width: "250px"
                                                                    }}
                                                                    onClick={()=>confirmDeliveryAddress(adr)}
                                                                /> : null
                                                        }


                                                    </div>
                                                    {
                                                        adr.selected &&
                                                        <div>
                                                            edit
                                                             </div>
                                                    }
                                                </div>
                                            </div>)
                                    }
                                </>
                            }
                        />
                        {
                            confirmAddress?null:
                            newaddress ? <AddressForm
                                onSubmitForm={onaddresssubmit}
                                onCancel={() => { }}
                            /> : <CheckoutStep
                                    stepNumber={'+'}
                                    title={"ADD NEW ADDRESS"}
                                    active={false}
                                    onClick={() => setnewaddress(true)}
                                />
                        } */}

                        <CheckoutStep
                            stepNumber={"2"}
                            title={"DELIVERY ADDRESS"}
                            active={!confirmAddress && auth.authenticate}
                            body={
                                <>
                                    {confirmAddress ? (
                                        <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pincode}`}</div>
                                    ) : (
                                            address.map((adr) => (
                                                <Address
                                                    selectAddress={selectAddress}
                                                    enableAddressEditForm={enableAddressEditForm}
                                                    confirmDeliveryAddress={confirmDeliveryAddress}
                                                    onAddressSubmit={onAddressSubmit}
                                                    adr={adr}
                                                />
                                            ))
                                        )}
                                </>
                            }
                        />

                        {/* AddressForm */}
                        {confirmAddress ? null : newAddress ? (
                            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                        ) : auth.authenticate ? (
                            <CheckoutStep
                                stepNumber={"+"}
                                title={"ADD NEW ADDRESS"}
                                active={false}
                                onClick={() => setNewAddress(true)}
                            />
                        ) : null}
                        {/* <CheckoutStep
                            stepNumber={'3'}
                            title={'ORDER SUMMARY'}
                            active={orderSummary}
                        /> */}

                        {
                            console.log('2', confirmAddress),
                            console.log('3', orderSummary)
                        }

                        <CheckoutStep
                            stepNumber={"3"}
                            title={"ORDER SUMMARY"}
                            active={orderSummary}
                            body={

                                orderSummary ? (
                                    <CartPage onlyCartItems={true} />
                                ) : orderConfirmation ? (
                                    <div className="stepCompleted">
                                        {Object.keys(cart.cartitems).length} items
                                    </div>
                                ) : null
                            }
                        />



                        {orderSummary && (
                            <Card
                                style={{
                                    margin: "10px 0",
                                }}
                            >
                                <div
                                    className="flexRow sb"
                                    style={{
                                        padding: "20px",
                                        alignItems: "center",
                                    }}
                                >
                                    <p style={{ fontSize: "12px" }}>
                                        Order confirmation email will be sent to{" "}
                                        <strong>{auth.user.email}</strong>
                                    </p>
                                    <MaterialButton
                                        title="CONTINUE"
                                        onClick={userOrderConfirmation}
                                        style={{
                                            width: "200px",
                                        }}
                                    />
                                </div>
                            </Card>
                        )}

                        {
                            console.log(paymentOption)
                        }
                        {/* <CheckoutStep
                            stepNumber={'4'}
                            title={'PAYMENT OPTION'}
                            active={paymentOption}
                        /> */}

                        <CheckoutStep
                            stepNumber={"4"}
                            title={"PAYMENT OPTIONS"}
                            active={paymentOption}
                            body={
                                paymentOption && (
                                    <div>
                                        <div
                                            className="flexRow"
                                            style={{
                                                alignItems: "center",
                                                padding: "20px",
                                            }}
                                        >
                                            <input type="radio" name="paymentOption" value="cod" />
                                            <div>Cash on delivery</div>
                                        </div>
                                        <MaterialButton
                                            title="CONFIRM ORDER"
                                            onClick={onConfirmOrder}
                                            style={{
                                                width: "200px",
                                                margin: "0 0 20px 20px",
                                            }}
                                        />
                                    </div>
                                )
                            }
                        />


                        {/* /* Price Component */}

                    </div>
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

        </>
    )
}



export default CheckoutPage
