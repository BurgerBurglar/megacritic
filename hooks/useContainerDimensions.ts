import { RefObject, useCallback, useEffect, useState } from "react";

export const useContainerDimensions = (ref: RefObject<HTMLDivElement>) => {
  const getDimensions = useCallback(
    () => ({
      width: ref.current!.offsetWidth,
      height: ref.current!.offsetHeight,
    }),
    [ref]
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getDimensions, ref]);

  return dimensions;
};
