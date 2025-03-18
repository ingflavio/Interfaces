import { useEffect, useState } from "react";

const figures = [
  {
    person1: "translate(0, 0) rotate(45, 295.59, 69.9)",
    person2: "translate(-28, 58) rotate(225, 295.59, 69.9)",
    person3: "translate(-85, 87) rotate(225, 295.59, 69.9)",
    person4: "translate(-38, 8) rotate(-45, 295.59, 69.9)",
    person5: "translate(-115, 95) rotate(-90, 295.59, 69.9)",
    person6: "translate(142, 118) rotate(45, 295.59, 69.9)",
    person7: "translate(33, 17) rotate(45, 295.59, 69.9)",
  },
  {
    person1: "translate(0, 0) rotate(45, 295.59, 69.9)",
    person2: "translate(-60, 70) rotate(-90, 295.59, 69.9)",
    person3: "translate(80, 35) rotate(45, 295.59, 69.9)",
    person4: "scale(-1,1) translate(-540, -60)",
    person5: "translate(-68, 30) rotate(-45, 295.59, 69.9)",
    person6: "translate(-58, -19) rotate(-90, 295.59, 69.9)",
    person7: "translate(-179, 68) rotate(-90, 295.59, 69.9)",
  },
  {
    person1: "translate(0, 0) rotate(50, 295.59, 69.9)",
    person2: "translate(20, 0) rotate(0, 295.59, 69.9)",
    person3: "translate(-32, 55) rotate(-90, 295.59, 69.9)",
    person4: "scale(-1,1) translate(-535, -17)",
    person5: "translate(-98, 112) rotate(270, 295.59, 69.9)",
    person6: "translate(-151, -18) rotate(-90, 295.59, 69.9)",
    person7: "translate(-135, 152) rotate(-90, 295.59, 69.9)",
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const positions = figures[index];

  return (
      <svg
        version="1.1"
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
        viewBox="0 0 550 250"
      >
        <g id="wrap-person">
          <g id="person">
            <polygon
              points="275.69,69.9 295.59,50 315.49,69.9 295.59,89.8"
              className="draggable"
              transform={positions.person1}
              id="person1"
              style={{ transition: "transform 0.3s ease-in-out" }}
            />
            <polygon
              points="255.78,89.8 295.59,129.61 335.39,89.8"
              className="draggable"
              transform={positions.person2}
              id="person2"
              style={{ transition: "transform 0.3s ease-in-out" }}
            />
            <polygon
              points="275.26,109.23 235.45,149.04 315.06,149.04"
              className="draggable"
              transform={positions.person3}
              id="person3"
              style={{ transition: "transform 0.3s ease-in-out" }}
            />
            <polygon
              points="247.11,149.04 275.25,149.04 247.11,177.18 218.96,177.18"
              className="draggable"
              transform={positions.person4}
              id="person4"
              style={{ transition: "transform 0.3s ease-in-out" }}
            />
            <polygon
              points="275.25,149.04 315.06,149.04 315.06,188.84"
              style={{
                fill: `${colors.triangle4 || "#d63294"}`,
                transition: "transform 0.3s ease-in-out",
              }}
              className="draggable"
              transform={positions.person5}
              id="person5"
            />
            <polygon
              points="200,167.94 200,196.09 228.15,167.94"
              style={{
                fill: `${colors.triangle5 || "#69dcf0"}`,
                transition: "transform 0.3s ease-in-out",
              }}
              className="draggable"
              transform={positions.person6}
              id="person6"
            />
            <polygon
              points="304.6,178.36 304.6,206.51 332.74,206.51"
              style={{
                fill: colors.parallelogram || "#e67e22",
                transition: "transform 0.3s ease-in-out",
              }}
              className="draggable"
              transform={positions.person7}
              id="person7"
            />
          </g>
        </g>
      </svg>
  );
};
