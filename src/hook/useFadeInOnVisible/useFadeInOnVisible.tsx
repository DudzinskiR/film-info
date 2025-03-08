import { useEffect, useRef, useState } from "react";

interface UseFadeInOnVisibleProps {
  offset?: number;
  timeout?: number;
}

export const useFadeInOnVisible = (props?: UseFadeInOnVisibleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const isVisible =
        rect.top + (props?.offset || 0) >= 0 &&
        rect.bottom - (props?.offset || 0) <= window.innerHeight;

      if (isVisible) {
        timer = setTimeout(() => setIsVisible(isVisible), props?.timeout || 0);

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, [props?.offset, props?.timeout]);

  return { isVisible, ref };
};
