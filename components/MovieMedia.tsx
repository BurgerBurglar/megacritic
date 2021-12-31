import { AspectRatio, Image } from "@chakra-ui/react";
import React from "react";
import { useMovieImages, useMovieVideos } from "../hooks/useFetch";
import { getBackdropUrl, getPosterUrl } from "../utils/getUrl";
import { Slider } from "./Slider";
import { Tabs } from "./Tabs";

interface MovieMediaProps {
  id: string;
}

export const MovieMedia: React.FC<MovieMediaProps> = ({ id }) => {
  const { images } = useMovieImages(id);
  const { videos } = useMovieVideos(id);
  if (!images || !videos) return <></>;

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
            <Image
              key={images.backdrops[0].file_path}
              src={getBackdropUrl(images.backdrops[0].file_path)}
              alt={images.backdrops[0].file_path}
              h="300px"
            />
          ) : null}
          {images.posters[0] ? (
            <Image
              key={images.posters[0].file_path}
              src={getPosterUrl(images.posters[0].file_path)}
              alt={images.posters[0].file_path}
              h="300px"
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
        <Image
          key={backdrop.file_path}
          src={getBackdropUrl(backdrop.file_path)}
          alt={backdrop.file_path}
          h="300px"
        />
      ))}
    </Slider>,
    <Slider key={0}>
      {images.posters.slice(0, 6).map((poster) => (
        <Image
          key={poster.file_path}
          src={getPosterUrl(poster.file_path)}
          alt={poster.file_path}
          h="300px"
        />
      ))}
    </Slider>,
  ];

  return (
    <Tabs header="Media" tabs={tabs} counts={counts} elements={elements} />
  );
};
