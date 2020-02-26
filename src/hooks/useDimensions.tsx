import { useLayoutEffect, useState } from "react";

export const useDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState<
    DOMRect | { width: undefined; height: undefined }
  >({ height: undefined, width: undefined });
  useLayoutEffect(() => {
    if (ref.current) {
      setDimensions(ref!.current!.getBoundingClientRect() as DOMRect);
    }
  }, [ref.current]);
  return {
    width: dimensions.width,
    height: dimensions.height
  };
};
