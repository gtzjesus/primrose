import { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Store } from '../Store';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../utils';

import { Badge } from '@mui/material';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBox from './SearchBox';
import Search from './Search';

const MobileHeader = ({ totalItems }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  // nav bar scroll animation
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.addEventListener('scroll');
    };
  }, []);
  // nav bar scroll animation

  //   closing mobile menu function implementation
  const menuDirectTops = () => {
    window.location.href = `/search/?query=Top`;
  };
  const menuDirectBottoms = () => {
    window.location.href = `/search/?query=Bottom`;
  };
  const menuDirectDresses = () => {
    window.location.href = `/search/?query=Dress`;
  };
  const menuDirectAccessories = () => {
    window.location.href = `/search/?query=Accessorie`;
  };
  const menuDirectSignIn = () => {
    window.location.href = '/signin';
  };

  return (
    <div className={`mobile ${show && 'nav__black'}`}>
      {/* Mobile Header Implementation */}
      <div id="menuToggle">
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span className="strong"></span>

        <ul id="menu">
          <Link to={`/search/?query=Top`} onClick={menuDirectTops}>
            <li>
              <a>Tops</a>
            </li>
          </Link>
          <Link to={`/search/?query=Bottom`} onClick={menuDirectBottoms}>
            <li>
              <a>Bottoms</a>
            </li>
          </Link>
          <Link to={`/search/?query=Dress`} onClick={menuDirectDresses}>
            <li>
              <a>Dresses</a>
            </li>
          </Link>
          <Link
            to={`/search/?query=Accessorie`}
            onClick={menuDirectAccessories}
          >
            <li>
              <a>Accessories</a>
            </li>
          </Link>
          <Link to="/signin">
            <li>
              <a>
                {' '}
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      <li>
                        <a>Sign Out</a>
                      </li>
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signin" onClick={menuDirectSignIn}>
                    <li>
                      <a>
                        <PersonOutlineIcon /> Account
                      </a>
                    </li>
                  </Link>
                )}
              </a>
            </li>
          </Link>
          <Link to="">
            <li>
              <a>
                {' '}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </a>
            </li>
          </Link>
        </ul>
      </div>

      <div>
        <Link to="/">
          <h1 className="mobile__title">
            Primrose
            <img src="/images/primrose.png" />
          </h1>
        </Link>
      </div>
      <div className="mobile__options">
        {/* <div className='mobile__option'>
                    <PersonOutlineIcon className='mobile__icon' />
                </div> */}
        {/* <div className='mobile__option'>
                    <FavoriteBorderIcon className='mobile__icon' />
                </div> */}
        <div className="mobile__option" id="mobile__icon">
          <Link to="/cart">
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
            <WorkOutlineIcon />
          </Link>
        </div>
        {/* <div className="mobile__option">
          <Link to="/search">
            <SearchIcon className="header__icon" />
          </Link>
        </div> */}
      </div>
      {/* Mobile Header Implementation */}
    </div>
  );
};

export default MobileHeader;
