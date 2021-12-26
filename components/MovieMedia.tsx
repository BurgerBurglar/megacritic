import {
  AspectRatio,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { MouseEvent, useState } from "react";
import { useMovieImages } from "../hooks/useMovieImages";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { Slider } from "./Slider";

interface MovieMediaProps {
  id: string;
}

export const MovieMedia: React.FC<MovieMediaProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState("mostPopular");
  const { images } = useMovieImages(id);
  const { videos } = useMovieVideos(id);
  if (!images || !videos) return <></>;

  const handleTabClick = (e: MouseEvent<HTMLHeadingElement>) => {
    const tab = e.currentTarget.getAttribute("data-id")!;
    console.log({ tab });
    setActiveTab(tab);
  };

  let displayElements: ReactJSXElement;
  if (activeTab === "posters") {
    displayElements = (
      <Slider>
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
      </Slider>
    );
  } else if (activeTab === "backdrops") {
    displayElements = (
      <Slider>
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
      </Slider>
    );
  } else if (activeTab == "videos") {
    displayElements = (
      <Slider>
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
      </Slider>
    );
  } else {
    displayElements = (
      <Slider>
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
      </Slider>
    );
  }

  const activeBarProps = {
    _after: {
      content: "''",
      w: "full",
      h: "5px",
      bgColor: "black",
      position: "absolute",
      left: 0,
      bottom: "-10px",
    },
  };
  return (
    <Flex direction="column" w="100%">
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        align={{
          base: "start",
          md: "center",
        }}
        mb={3}
      >
        <Heading as="h3" size="md" mr={20}>
          Media
        </Heading>
        <HStack
          spacing={{
            base: 2,
            md: 8,
          }}
        >
          <Heading
            data-id="mostPopular"
            as="h4"
            size="sm"
            position="relative"
            onClick={handleTabClick}
            {...(activeTab === "mostPopular" ? activeBarProps : null)}
          >
            Most Popular
          </Heading>
          <Heading
            data-id="videos"
            as="h4"
            size="sm"
            position="relative"
            onClick={handleTabClick}
            {...(activeTab === "videos" ? activeBarProps : null)}
          >
            Videos
            <Text as="span" color="gray.500">
              {" " + videos.length}
            </Text>
          </Heading>
          <Heading
            data-id="backdrops"
            as="h4"
            size="sm"
            position="relative"
            onClick={handleTabClick}
            {...(activeTab === "backdrops" ? activeBarProps : null)}
          >
            Backdrops
            <Text as="span" color="gray.500">
              {" " + images.backdrops.length}
            </Text>
          </Heading>
          <Heading
            data-id="posters"
            as="h4"
            size="sm"
            position="relative"
            onClick={handleTabClick}
            {...(activeTab === "posters" ? activeBarProps : null)}
          >
            Posters
            <Text as="span" color="gray.500">
              {" " + images.posters.length}
            </Text>
          </Heading>
        </HStack>
      </Flex>
      {displayElements}
    </Flex>
  );
};
