interface CircularProgressProps {
  progress: number;
  size?: number;
  backgroundColor?: string;
  fillColor?: string;
}

const CircularProgress = ({
  progress,
  size = 70,
  backgroundColor = "#18181b",
  fillColor = "#22c55e",
}: CircularProgressProps) => {
  //100% -> 360°
  const angle = progress * 3.6;

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <div
        className="absolute inset-0 rounded-full duration-300"
        style={{
          background: `conic-gradient(${fillColor} ${angle}deg, ${backgroundColor} 0deg)`,
        }}
      />
      <div
        className="absolute rounded-full duration-300"
        style={{
          backgroundColor,
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
        }}
      />
      <span className="z-10 text-xl font-bold text-white">{progress}%</span>
    </div>
  );
};

export default CircularProgress;
