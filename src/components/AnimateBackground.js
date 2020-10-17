import React, { useState, useEffect } from "react";
import Circle from "../Classes/Circle";
import CircleElement from "./Circle";
function AnimateBackground({ colors }) {
  const MIN_RADIUS = 450;
  const MAX_RADIUS = 1000;
  const ANIMATION_DURATION_MIN_S = 7;
  const ANIMATION_DURATION_MAX_S = 15;
  const TOTAL_ELEMENTS = 10;

  const [circles, setCircles] = useState([]);

  function getCircleElement() {
    const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;

    const duration = parseInt(
      ANIMATION_DURATION_MIN_S +
        Math.random() * (ANIMATION_DURATION_MAX_S - ANIMATION_DURATION_MIN_S)
    );
    const color = colors[Math.floor(Math.random() * colors.length)]["hex"];
    return new Circle(radius, left, top, duration, color);
  }

  useEffect(() => {
    let circlesArray = [];
    for (let i = 0; i < TOTAL_ELEMENTS; i++) {
      circlesArray.push(getCircleElement());
    }
    setCircles(circlesArray);
  }, [colors]);

  const [firstColor] = colors;
  const style = {
    background: `rgba(${firstColor.red}, ${firstColor.green}, ${firstColor.blue}, 0.15)`,
    zIndex: "-3",
  };

  return (
    <div style={style} className="background-div">
      {circles.map((circle, index) => (
        <CircleElement
          getCircle={getCircleElement}
          key={index + circle.radius}
          circle={circle}
        />
      ))}
    </div>
  );
}

export default AnimateBackground;
