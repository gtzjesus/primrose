import React, {useState, useEffect} from 'react';
import '../sharedCss/Sticky.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import $ from 'jquery';

import { Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import
 {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const SecondSticky =({totalItems}) => {

    // nav bar scroll animation
    const [show, handleShow] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.addEventListener("scroll");
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
    return(
        <div className={`nav ${show && "nav__black"}`}>
            <div className='nav__option'>
                <div class='bottomMenu'>
                    <Link className='header__icon' to='/signin'>
                        <PersonOutlineIcon className='header__icon' />
                    </Link>
                </div>
            </div>
            <div className='nav__option'>
                <div class='bottomMenu'>
                    <Link to='/fave'>
                        <FavoriteBorderIcon className='header__icon' />
                    </Link>
                </div>
            </div>
            {/* <div className='nav__option'>
                    <Link to='/gifts'>
                        <li><a>Gifts</a></li>
                    </Link>
            </div> */}
            <div className='nav__option'>
                    <Link to='/new'>
                        <li><a>New</a></li>
                    </Link>
            </div>
            <div className='nav__option'>
                <Link to='/women'>
                    <a>Women</a>
                </Link>
            </div>
            
            <div className='nav__option'>
                <Link to='/men'>
                    <a>Men</a>
                </Link>
            </div>
            <div className='nav__option'>
                    <Link to='/accessories'>
                        <li><a>Accessories</a></li>
                    </Link>
            </div>
            <div className='nav__option'>
                    <Link to='/gallery'>
                        <li><a>Gallery</a></li>
                    </Link>
            </div>
            <div className='nav__option'>
                <div class='bottomMenu'>
                    <Link to='/work'>
                        <Link className='header__icon' to='/signin'>
                            <WorkOutlineIcon className='header__icon' />
                        </Link>
                    </Link>
                </div>
            </div>
            <div className='nav__option'>
                <div class='bottomMenu'>
                    <Link to='/search'>
                        <SearchIcon className='header__icon' />  
                    </Link> 
                </div>
            </div>
            </div> 
      ); 
    };

export default SecondSticky;
