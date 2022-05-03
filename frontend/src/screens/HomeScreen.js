import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import GoToTop from '../GoToTop';
import ImageSlider from '../components/ImageSlider';
import CategorySlider from '../components/CategorySlider';
import WorldPrim from '../components/WorldPrim';
import DoubleSlider from '../components/DoubleSlider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
      deafult: return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Primrose | Fashion by Jess</title>
      </Helmet>
      <div className="prim-title">
        <h1>
          Primrose
          <img src="/images/primrose.png" alt="" />
        </h1>
      </div>

      <ImageSlider />

      <div className="sub-title">
        <h1>Jess's Latest Collection</h1>
      </div>
      <CategorySlider />

      <div className="sub-title">
        <h1>Shop Primrose By Style</h1>
      </div>
      <DoubleSlider />

      <WorldPrim />

      {/*
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div> */}
      <GoToTop />
    </div>
  );
}

export default HomeScreen;
