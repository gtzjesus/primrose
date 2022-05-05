import { useContext, useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Store } from '../Store';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../utils';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Header = ({ totalItems }) => {
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
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__option">
          <Link to="/cart">
            <li>
              <a className="link">Cart</a>
            </li>

            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        </div>
      </div>
      <div className="header__title">
        <a href="/">
          Primrose
          <img src="/images/primrose.png" />
        </a>
      </div>
      <div className="header__account">
        <div className="header__option">
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
                  <a className="link">Sign Out</a>
                </li>
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/signin">
              <li>
                <a className="link">Sign In</a>
              </li>
            </Link>
          )}
        </div>
        <div className="header__option">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
