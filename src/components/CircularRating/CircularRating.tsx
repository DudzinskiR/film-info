"use client";

import { useEffect, useState } from "react";
import CircularProgress from "../CircularProgress/CircularProgress";

interface CircularRatingProps {
  rating: number;
  duration?: number;
}

const getFillColor = (progress: number) => {
  if (progress < 33) {
    return "#800000";
  } else if (progress < 66) {
    return "#ff9900";
  } else {
    return "#33cc33";
  }
};

const getBackgroundColor = (process: number) => {
  if (process < 33) {
    return "#1a0000";
  } else if (process < 66) {
    return "#1a0f00";
  } else {
    return "#0b280b";
  }
};

const CircularRating = ({ rating, duration = 2000 }: CircularRatingProps) => {
  const [process, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progressPercentage = Math.min((elapsed / duration) * rating, 100);

      setProgress(progressPercentage);
      if (progressPercentage < rating) {
        requestAnimationFrame(tick);
      } else {
        setProgress(rating);
      }
    };

    requestAnimationFrame(tick);
  }, [duration, rating]);

  return (
    <div
      className={`relative size-fit ${
        process !== 0 ? "animate-single-pulse" : ""
      }`}
      style={{ animationDuration: `${500}ms`, animationDelay: `${duration}ms` }}
    >
      <CircularProgress
        progress={Math.ceil(process)}
        fillColor={getFillColor(process)}
        backgroundColor={getBackgroundColor(process)}
      />
    </div>
  );
};

export default CircularRating;
