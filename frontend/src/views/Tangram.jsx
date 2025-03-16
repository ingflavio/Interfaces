import { useEffect, useState } from "react";

const figures = [
  {
    square: { x: 250, y: 3, rotate: 0 },
    triangle1: { x: 238, y: 395, rotate: 0 },
    triangle2: { x: 130, y: 90, rotate: 135 },
    triangle3: { x: 158, y: 60, rotate: 225 },
    triangle4: { x: 160, y: 258, rotate: 180 },
    triangle5: { x: 105, y: 335, rotate: 0 },
    parallelogram: { x: 195, y: 323, rotate: 270, skew: 45 },
  },
  {
    square: { x: 250, y: 0, rotate: 0 },
    triangle1: { x: 390, y: 210, rotate: 225 },
    triangle2: { x: 175, y: 120, rotate: 0 },
    triangle3: { x: 255, y: 165, rotate: 225 },
    triangle4: { x: 240, y: 270, rotate: 225 },
    triangle5: { x: 125, y: 90, rotate: 135 },
    parallelogram: { x: 215, y: 100, rotate: 45, skew: -45 },
  },
  {
    square: { x: 150, y: 3, rotate: 0 },
    triangle1: { x: 35, y: 210, rotate: 225 },
    triangle2: { x: 230, y: 130, rotate: 180 },
    triangle3: { x: 150, y: 80, rotate: 0 },
    triangle4: { x: 160, y: 315, rotate: 180 },
    triangle5: { x: 150, y: 415, rotate: 225 },
    parallelogram: { x: 130, y: 235, rotate: 45, skew: -45 },
  },
];

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const Tangram = () => {
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState({
    triangle4: getRandomColor(),
    triangle5: getRandomColor(),
    parallelogram: getRandomColor(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % figures.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const positions = figures[index];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dadada",
        zIndex: 100,
      }}
    >
      <div className="tangramDiv">
        <div
          id="square"
          className="block"
          style={{
            transform: `translate(${positions.square.x}px, ${positions.square.y}px) rotate(${positions.square.rotate}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        ></div>
        <div
          id="triangle1"
          className="block"
          style={{
            transform: `translate(${positions.triangle1.x}px, ${positions.triangle1.y}px) rotate(${positions.triangle1.rotate}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        ></div>
        <div
          id="triangle2"
          className="block"
          style={{
            transform: `translate(${positions.triangle2.x}px, ${positions.triangle2.y}px) rotate(${positions.triangle2.rotate}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        ></div>
        <div
          id="triangle3"
          className="block"
          style={{
            transform: `translate(${positions.triangle3.x}px, ${positions.triangle3.y}px) rotate(${positions.triangle3.rotate}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        ></div>
        <div
          id="triangle4"
          className="block"
          style={{
            transform: `translate(${positions.triangle4.x}px, ${positions.triangle4.y}px) rotate(${positions.triangle4.rotate}deg)`,
            transition: "transform 1s ease-in-out",
            borderColor: `transparent transparent ${
              colors.triangle4 || "#d63294"
            } transparent`,
          }}
        ></div>
        <div
          id="triangle5"
          className="block"
          style={{
            transform: `translate(${positions.triangle5.x}px, ${positions.triangle5.y}px) rotate(${positions.triangle5.rotate}deg)`,
            transition: "transform 1s ease-in-out",
            borderColor: `transparent ${
              colors.triangle5 || "#69dcf0"
            } transparent transparent`,
          }}
        ></div>
        <div
          id="parallelogram"
          className="block"
          style={{
            transform: `translate(${positions.parallelogram.x}px, ${positions.parallelogram.y}px) rotate(${positions.parallelogram.rotate}deg) skew(${positions.parallelogram.skew}deg)`,
            width: "130px",
            height: "55px",
            background: colors.parallelogram || "#e67e22",
            transition: "transform 1s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};
