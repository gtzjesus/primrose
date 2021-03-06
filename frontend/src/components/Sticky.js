import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import Search from './Search';

const Sticky = ({ totalItems }) => {
  // nav bar scroll animation
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.addEventListener('scroll');
    };
  }, []);
  // nav bar scroll animation

  // Displaying Nav Items
  $(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 100) {
      $('.bottomMenu').fadeIn();
    } else {
      $('.bottomMenu').fadeOut();
    }
  });
  // Displaying Nav Items
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      {/* <div className='nav__option'>
                    <Link to='/gifts'>
                        <li><a>Gifts</a></li>
                    </Link>
            </div> */}
      <div className="nav__option" class="bottomMenu">
        <Link to={`/search/?query=Top`}>
          <li>
            <a className="stickyLink">Tops</a>
          </li>
        </Link>
      </div>
      <div className="nav__option" class="bottomMenu">
        <Link to={`/search/?query=Jean`}>
          <li>
            <a className="stickyLink">Bottoms</a>
          </li>
        </Link>
      </div>

      <div className="nav__option" class="bottomMenu">
        <Link to={`/search/?query=Dress`}>
          <li>
            <a className="stickyLink">Dresses</a>
          </li>
        </Link>
      </div>
      <div className="nav__option" class="bottomMenu">
        <Link to={`/search/?query=Hat`}>
          <li>
            <a className="stickyLink">Accessories</a>
          </li>
        </Link>
      </div>
      <div class="bottomMenu">{/* <Search /> */}</div>
    </div>
  );
};

export default Sticky;
