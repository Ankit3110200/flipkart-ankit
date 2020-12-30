import React, { useEffect, useState } from 'react';
import './style.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUi';
import { useDispatch, useSelector } from "react-redux"
import { getcartitems, login, signout, signup } from '../../actions';
import Cart from '../Ui/Cart'
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { RiMenuAddLine } from "react-icons/ri";
const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);
  const userlogin = () => {
    dispatch(login({ email, password }))
  }
  const logout = () => {
    dispatch(signout())
  }
  const usersignup = () => {
    dispatch(signup({ email, password, firstname, lastname }))
    setSignupModal(false)
  }


  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false)
      dispatch(getcartitems())
    }
  }, [auth.authenticate])

  const renderloggedinmenu = () => {
    return (<DropdownMenu
      menu={
        <a className="fullname">
          {auth.user.firstname}
        </a>
      }
      menus={[
        { label: 'My Profile', href: '', icon: null },
        { label: 'SuperCoin Zone', href: '', icon: null },
        { label: 'Flipcart Plus Zone', href: '', icon: null },
        { label: 'Orders', href: `/account/orders`, icon: null },

        { label: 'Wishlist', href: '', icon: null },
        { label: 'My chats', href: '', icon: null },
        { label: 'Coupans', href: '', icon: null },
        { label: 'Rewards', href: '', icon: null },
        { label: 'Notifications', href: '', icon: null },
        { label: 'Gift Cards', href: '', icon: null },
        { label: 'Logout', href: '', icon: null, onClick: logout }
      ]}
    />)
  }
  const nonrenderloggedinmenu = () => {
    return (<DropdownMenu
      menu={
        <a className="loginButton" onClick={() => setLoginModal(true)}>
          Login
              </a>
      }
      menus={[
        { label: 'My Profile', href: '', icon: null },
        { label: 'Flipkart Plus Zone', href: '', icon: null },
        { label: 'Orders', href: '', icon: null },
        { label: 'Wishlist', href: '', icon: null },
        { label: 'Rewards', href: '', icon: null },
        { label: 'Gift Cards', href: '', icon: null },
      ]}
      firstMenu={
        <div className="firstmenu">
          <span>New Customer?</span>
          <a style={{ color: '#2874f0' }} onClick={() => setSignupModal(true)}>Sign Up</a>
        </div>
      }
    />)
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const openMenu = () => {
    const menu = document.getElementById("menu-toggler");
    

    const sidemenu = document.getElementById("rightMenu");
    if(sidemenu.style.right==="-100%"){
      sidemenu.style.right="0";
      sidemenu.style.display="flex"
      menu.classList.add('active')
    
    }else{
      sidemenu.style.right="-100%";
      menu.classList.remove('active')
    }
   
    
}
  return (
    <>
      <div className="header">
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
        <Modal
          visible={signupModal}
          onClose={() => setSignupModal(false)}
        >
          <div className="authContainer">
            <div className="row">
              <div className="leftspace">
                <h2>Sign up</h2>
                <p>Get access to your Orders, Wishlist and Recommendations</p>
              </div>
              <div className="rightspace">

                <div className="logininputcontainer">
                  <MaterialInput
                    type="text"
                    label="Enter The Firstname"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                  />

                  <MaterialInput
                    type="text"
                    label="Enter The lasttname"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />

                  <MaterialInput
                    type="text"
                    label="Enter Email Address"
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
                    title="Sign up"
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{ margin: "40px 0 20px 0" }}
                    onClick={usersignup}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <div className="subHeader">
         
          <div className="leftmenu">
          <div className="logo">

            <a href="/">
              <img src={flipkartLogo} className="logoimage" alt="" />
            </a>
            <a style={{ marginTop: '-10px' }}>
              <span className="exploreText">Explore</span>
              <span className="plusText">Plus</span>
              <img src={goldenStar} className="goldenStar" alt="" />
            </a>

          </div>
         

          <div style={{
            padding: '0 10px'
          }}>
            <div className="searchInputContainer">
              <input
                className="searchInput"
                placeholder={'search for products, brands and more'}
              />
              <div className="searchIconContainer">
                <IoIosSearch style={{
                  color: '#2874f0'
                }} />
              </div>

            </div>
          </div>
          </div>
          <div className="menu-toggler" id="menu-toggler" onClick={openMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
          <div className="rightMenu" id="rightMenu">
            {
              auth.authenticate ? renderloggedinmenu() : nonrenderloggedinmenu()
            }
            <DropdownMenu
              menu={
                <a className="more">
                  <span>More</span>
                  <IoIosArrowDown />
                </a>
              }
              menus={[
                { label: 'Notification Preference', href: '', icon: null },
                { label: 'Sell on flipkart', href: '', icon: null },
                { label: '24x7 Customer Care', href: '', icon: null },
                { label: 'Advertise', href: '', icon: null },
                { label: 'Download App', href: '', icon: null }
              ]}
            />
            <div>
              <a href={`/cart`} className="cart">

                <Cart count={Object.keys(cart.cartitems).length} />
                <span style={{ margin: '0 10px' }}>Cart</span>
              </a>
            </div>

          </div>

        </div>
      </div>
     
    </>
  )

}

export default Header
