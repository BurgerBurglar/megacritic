import { Box } from "@chakra-ui/layout";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { MovieOverview } from "../types/Movie";
import { MovieCard } from "./MovieCard";

interface MovieSliderProps {
  movies: MovieOverview[];
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(sliderContainerRef);

  const slidesToShow = Math.round(width / 200);
  const dots = slidesToShow >= 2;

  const settings = {
    dots,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
  };

  return (
    <div className="App">
      <Box ref={sliderContainerRef}>
        <Slider {...settings}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} itemId={movie.title} movie={movie} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};
