import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const WorldPrim = (props) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <h1>ENTER THE WORLD OF PRIMROSE</h1>
        <p>Hear about exclusive events, collections, drops, and news.</p>
        <input placeholder="Enter Email Address"></input>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 10vh;
  padding: 40px 70px;
  overflow-x: hidden;
  cursor: none;
  background: url('/images/world-prim.png') no-repeat;
  width: 100%;
  height: 100%;

  & > button {
    opacity: 1;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 0.5;
      transition: opacity 0.2s ease 0s;
    }
  }
  @media screen and (max-width: 956px) {
    height: 100%;
    font-size: 16px;
    padding: 10px;
    input {
      border: none;
      color: #1c1c1c;
      margin: 10px 0 0 0;
      padding: 1.5%;
      width: 100%;
    }
  }

  h1 {
    padding: 0 0 0 0;
    font-size: 25px;

    &:hover {
      color: inherit;
      style: none;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: #1c1c1c;
    z-index: 99;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -15px;
  }

  .slick-next {
    right: -15px;
  }
`;

const Wrap = styled.div`
  border-radius: 0px;
  cursor: pointer;
  position: relative;
  background-image: url('/images/world-prim.png') a {
    border-radius: 2.5px;
    /* box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px; */
    cursor: none;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 2.5px solid #1c1c1c;
      transition-duration: 300ms;
    }
  }
`;

export default WorldPrim;
