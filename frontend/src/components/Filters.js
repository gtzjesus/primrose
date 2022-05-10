import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Rating from '../components/Rating';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];
const prices = [
  {
    name: '$1 to $12',
    value: '1-12',
  },
  {
    name: '$13 to $19',
    value: '13-19',
  },
  {
    name: '$20 to $99',
    value: '20-99',
  },
];

function Filters() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

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
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
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
    <div className="filters">
      <NavDropdown title="Department" id="basic-nav-dropdown">
        <ul>
          <li>
            <Link
              className={'all' === category ? 'text-bold' : ''}
              to={getFilterUrl({ category: 'all' })}
            >
              Any
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <Link
                className={c === category ? 'text-bold' : ''}
                to={getFilterUrl({ category: c })}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </NavDropdown>
      <NavDropdown title="Price" id="basic-nav-dropdown">
        <ul>
          <li>
            <Link
              className={'all' === price ? 'text-bold' : ''}
              to={getFilterUrl({ price: 'all' })}
            >
              Any
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                to={getFilterUrl({ price: p.value })}
                className={p.value === price ? 'text-bold' : ''}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </NavDropdown>
      <NavDropdown title="Reviews" id="basic-nav-dropdown">
        <ul>
          {ratings.map((r) => (
            <li key={r.name}>
              <Link
                to={getFilterUrl({ rating: r.rating })}
                className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
              >
                <Rating caption={' & up'} rating={r.rating}></Rating>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={getFilterUrl({ rating: 'all' })}
              className={rating === 'all' ? 'text-bold' : ''}
            >
              <Rating caption={' & up'} rating={0}></Rating>
            </Link>
          </li>
        </ul>
      </NavDropdown>
      <NavDropdown title="Sort by:" id="basic-nav-dropdown">
        <select
          value={order}
          onChange={(e) => {
            navigate(getFilterUrl({ order: e.target.value }));
          }}
        >
          <option value="newest">Newest</option>
          <option value="highest">Price - High to Low</option>
          <option value="lowest">Price - Low to High</option>
        </select>
      </NavDropdown>
    </div>
  );
}

export default Filters;
