import React from 'react';
import '../index.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__option">
          <h1>About Us</h1>
          <ul>
            <li>
              <a>Company</a>
            </li>
            <li>
              <a>Data</a>
            </li>
            <li>
              <a>Investor Relations</a>
            </li>
            <li>
              <a>Careers</a>
            </li>
          </ul>
        </div>
        <div className="footer__option">
          <h1>Customer Care</h1>
          <ul>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>Orders & Shipping</a>
            </li>
            <li>
              <a>Returns & Refunds</a>
            </li>
            <li>
              <a>Accessibility</a>
            </li>
          </ul>
        </div>
        <div className="footer__option">
          <h1>Store Services</h1>
          <ul>
            <li>
              <a>Primrose Services</a>
            </li>
            <li>
              <a>Booking</a>
            </li>
            <li>
              <a>Reviews</a>
            </li>
          </ul>
        </div>
        <div className="footer__option">
          <h1>Legal</h1>
          <ul>
            <li>
              <a>Terms & Conditions</a>
            </li>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="signature">
        <p>&copy; Primrose | All Rights Reserved | 2022 | Designer Jesus</p>
      </div>
    </div>
  );
}

export default Footer;
