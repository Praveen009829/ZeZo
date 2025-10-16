import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../Moviecard/Moviecard";
import "./Slider.css";

const Slider = ({ title, movies }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 7,
      slidesToSlide: 5, // move 5 at once
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 5,
      slidesToSlide: 5, // move 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // move 3
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 2, // move 2
    },
  };

  return (
    <div className="slider-container pb-4">
      <h3 className="text-light mb-3 ms-3">{title}</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        showDots={false}
        arrows={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-10-px"
        partialVisible={true}
        customTransition="transform 0.6s ease-in-out" // smoother slide
        transitionDuration={600}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
