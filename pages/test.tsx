import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import { right } from "@popperjs/core";
import React, { JSXElementConstructor, ReactElement, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MovieCard } from "../components/MovieCard";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { useOverviews } from "../hooks/useOverviews";

interface ArrowProps {
  isLeft: boolean;
}

const Arrow = ({ isLeft, className, style, onClick }: any) => {
  const leftRight = isLeft ? "left" : "right";
  return (
    <IconButton
      className={className}
      style={{ ...style }}
      h="310px"
      onClick={onClick}
      aria-label={leftRight}
      icon={isLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      size="lg"
      variant="ghost"
      display="block"
      zIndex={1}
      _hover={{
        color: "white",
        bgColor: "rgba(0,0,0,0.5)",
      }}
      borderRadius={0}
    />
  );
};

const App: React.FC = () => {
  const [{ data, loading, error }, refetch] = useOverviews("discover");
  const movies = data?.results || [];

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
    // prevArrow: <Arrow isLeft={true} />,
    // nextArrow: <Arrow isLeft={false} />,
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
export default App;
