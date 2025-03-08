import { useState, useEffect, useCallback, useRef } from "react";

export const useElementSide = (options?: { rightOffset?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"left" | "right" | undefined>(
    undefined
  );

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.left + rect.width / 2;
      // const windowCenter = window.innerWidth / 2;
      const threshold =
        options?.rightOffset !== undefined
          ? window.innerWidth - options?.rightOffset
          : window.innerWidth / 2;
      setPosition(elementCenter < threshold ? "left" : "right");
    }
  }, [ref, options?.rightOffset]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition]);

  return { position, ref };
};
