"use client";

import { formatNumber } from "@/lib/formatNumber";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration: number;
  initValue?: number;
  format?: boolean;
  prefix?: string;
}

const AnimatedCounter = ({
  value,
  duration,
  initValue = 0,
  format = true,
  prefix,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(initValue);

  useEffect(() => {
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progressPercentage = Math.min(elapsed / duration, 100);
      setCount(Math.round(progressPercentage * value));
      if (progressPercentage < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(tick);
  }, [value, duration]);

  if (format) {
    return (
      <span>
        {prefix}
        {formatNumber(count)}
      </span>
    );
  }
  return (
    <span>
      {prefix}
      {count}
    </span>
  );
};

export default AnimatedCounter;
