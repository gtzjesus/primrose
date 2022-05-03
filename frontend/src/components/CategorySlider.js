import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CategorySlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <a href={`/search/?query=Top`}>
          <img src="/images/tops-category.png" alt="" />
        </a>
      </Wrap>

      <Wrap>
        <a href={`/search/?query=Jean`}>
          <img src="/images/jeans-category.png" alt="" />
        </a>
      </Wrap>

      <Wrap>
        <a href={`/search/?query=Dress`}>
          <img src="/images/dresses-category.png" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a href={`/search/?query=Accessorie`}>
          <img src="/images/hats-category.png" alt="" />
        </a>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 2.5vh;
  overflow-x: hidden;

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

  a {
    border-radius: 2.5px;
    /* box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px; */
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }
    @media screen and (max-width: 956px) {
      height: 100%;

      img {
      }
    }

    &:hover {
      padding: 0;
      border: 2.5px solid #1c1c1c;
      transition-duration: 300ms;
    }
  }
`;

export default CategorySlider;
