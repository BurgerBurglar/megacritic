import { AspectRatio, Image } from "@chakra-ui/react";
import React from "react";
import { useMovieImages, useMovieVideos } from "../hooks/useFetch";
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
  const elements = [
    <Slider key={3}>
      {
        <>
          <AspectRatio key={videos[0].id} minW="560px" ratio={16 / 9}>
            <iframe
              src={"https://www.youtube.com/embed/" + videos[0].key}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
          <Image
            key={images.backdrops[0].file_path}
            src={
              "https://www.themoviedb.org/t/p/w533_and_h300_bestv2" +
              images.backdrops[0].file_path
            }
            alt={images.backdrops[0].file_path}
            h="300px"
          />
          <Image
            key={images.posters[0].file_path}
            src={
              "https://www.themoviedb.org/t/p/w220_and_h330_face" +
              images.posters[0].file_path
            }
            alt={images.posters[0].file_path}
            h="300px"
          />
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
          src={
            "https://www.themoviedb.org/t/p/w533_and_h300_bestv2" +
            backdrop.file_path
          }
          alt={backdrop.file_path}
          h="300px"
        />
      ))}
    </Slider>,
    <Slider key={0}>
      {images.posters.slice(0, 6).map((poster) => (
        <Image
          key={poster.file_path}
          src={
            "https://www.themoviedb.org/t/p/w220_and_h330_face" +
            poster.file_path
          }
          alt={poster.file_path}
          h="300px"
        />
      ))}
    </Slider>,
  ];

  return <Tabs header="Media" tabs={tabs} elements={elements} />;
};
