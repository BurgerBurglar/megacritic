import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import { MovieImages, MovieVideo } from "../types/Movie";
import { getBackdropUrl, getPosterUrl } from "../utils/getUrl";
import { NextImage } from "./NextImage";
import { Slider } from "./Slider";
import { Tabs } from "./Tabs";

interface MovieMediaProps {
  images: MovieImages;
  videos: MovieVideo[];
}

export const MovieMedia: React.FC<MovieMediaProps> = ({ images, videos }) => {
  const tabs = ["Most Popular", "Videos", "Backdrops", "Posters"];
  const counts = [
    null,
    videos.length,
    images.backdrops.length,
    images.posters.length,
  ];
  const elements = [
    <Slider key={3}>
      {
        <>
          {videos[0] ? (
            <AspectRatio key={videos[0].id} minW="560px" ratio={16 / 9}>
              <iframe
                src={"https://www.youtube.com/embed/" + videos[0].key}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          ) : null}
          {images.backdrops[0] ? (
            <NextImage
              key={images.backdrops[0].file_path}
              src={getBackdropUrl(images.backdrops[0].file_path)}
              alt={images.backdrops[0].file_path}
              w="533px"
              h="300px"
              flexShrink={0}
            />
          ) : null}
          {images.posters[0] ? (
            <NextImage
              key={images.posters[0].file_path}
              src={getPosterUrl(images.posters[0].file_path)}
              alt={images.posters[0].file_path}
              w="200px"
              h="300px"
              flexShrink={0}
            />
          ) : null}
        </>
      }
    </Slider>,
    <Slider key={2}>
      {videos.map((video) => (
        <AspectRatio key={video.id} minW="560px" ratio={16 / 9}>
          <iframe
            src={"https://www.youtube.com/embed/" + video.key}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      ))}
    </Slider>,
    <Slider key={1}>
      {images.backdrops.slice(0, 6).map((backdrop) => (
        <NextImage
          key={backdrop.file_path}
          src={getBackdropUrl(backdrop.file_path)}
          alt={backdrop.file_path}
          w="533px"
          h="300px"
          flexShrink={0}
        />
      ))}
    </Slider>,
    <Slider key={0}>
      {images.posters.slice(0, 6).map((poster) => (
        <NextImage
          key={poster.file_path}
          src={getPosterUrl(poster.file_path)}
          alt={poster.file_path}
          w="200px"
          h="300px"
          flexShrink={0}
        />
      ))}
    </Slider>,
  ];

  return (
    <Tabs header="Media" tabs={tabs} counts={counts} elements={elements} />
  );
};
