import React, { useState, useEffect } from 'react';
import '../index.css';
import $ from 'jquery';

function Shipping() {
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
    if (y > 20) {
      $('.bottom').fadeIn();
    } else {
      $('.bottom').fadeOut();
    }
  });
  // Displaying Nav Items
  return (
    <div className={`shipping ${show && ''}`}>
      <div className="shipping__option">
        <li>
          <a>Free Shipping on U.S. Orders Above $75 </a>
        </li>
      </div>
    </div>
  );
}

export default Shipping;
