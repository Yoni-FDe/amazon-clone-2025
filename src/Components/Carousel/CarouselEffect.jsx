import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // this grap from react-responsive-carousel
import classes from "./Carousel.module.css";

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
      // grap those procedure from react carousel repnosive 
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false} 
        showThumbs={false}
      >
        {img.map((imageItemLink) => {
          return <img key={imageItemLink} src={imageItemLink} />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
// render into pages in 'Landing'
