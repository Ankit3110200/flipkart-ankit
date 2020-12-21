import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/Ui/card";
import { generatepublicimgUrl } from "../../urlConfig";
// import Card from "../../components/UI/Card";
 import { generatepublicimgUrl as generatePublicUrl} from "../../urlConfig";
 import { BiRupee } from "react-icons/bi";
 import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../components/MaterialUi";
import { Link } from "react-router-dom";



const OrderPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    console.log(user);

    return (
        <Layout>
             <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ margin: "5px 0" }}>
            <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
              <div className="orderItemContainer">
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productpicture[0].img
                    )}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </div>
              </Link>
            </Card>
          ));
        })}
      </div>
            {
                // user.orders.map(order => {
                //     return order.items.map((item,index) =>
                //         <Card headerleft={`${index+1}.Order Details`} style={{ maxWidth: "1200px", margin: "5px auto" }}>
                //             <div className="orderItemContainer">
                //                 <div className="orderImgContainer"><img className="orderImg" src={generatepublicimgUrl(item.productId.productpicture[0].img)}></img></div>
                //                 <div className="orderName">{item.productId.name}</div>
                //                 <div className="orderPrice"> <BiRupee />{item.payablePrice}</div>
                //                 <div>{order.paymentStatus}</div>
                //             </div>
                //         </Card>
                //     )
                // })
            }

        </Layout>
    );
};

export default OrderPage;