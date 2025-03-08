"use client";

import { Slider } from "@mui/material";

interface UserScoreSliderProps {
  onChange: (value: number[]) => void;
  value: number[];
}

const UserScoreSlider = ({ onChange, value }: UserScoreSliderProps) => {
  const onChangeHandler = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };
  return (
    <Slider
      getAriaLabel={() => "Rating range"}
      value={value}
      onChange={onChangeHandler}
      valueLabelDisplay="auto"
      getAriaValueText={() => "1"}
      marks={[
        { value: 0, label: "0" },
        { value: 25, label: "25" },
        { value: 50, label: "50" },
        { value: 75, label: "75" },
        { value: 100, label: "100" },
      ]}
    />
  );
};

export default UserScoreSlider;
