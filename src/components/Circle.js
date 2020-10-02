import React, { useEffect, useState } from "react";

function Circle({ circle, getCircle }) {
  const [hasEnded, setHasEnded] = useState(false);
  const [style, setStyle] = useState({
    width: circle.radius,
    height: circle.radius,
    borderRadius: "50%",
    position: "absolute",
    background: `radial-gradient(${circle.color}, transparent)`,
    backgroundBlendMode: "multiply",
    top: circle.top,
    left: circle.left,
    zIndex: -2,
    animation: "opacity infinite",
    animationDuration: circle.duration + "s",
  });

  useEffect(() => {
    let timer;
    if (hasEnded) {
      const newCircle = getCircle();
      setStyle({
        ...style,
        width: newCircle.radius,
        height: newCircle.radius,
        background: `radial-gradient(${newCircle.color}, transparent)`,
        top: newCircle.top,
        left: newCircle.left,
      });
      setHasEnded(false);
    } else {
      timer = setTimeout(() => {
        setHasEnded(true);
      }, circle.duration * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [hasEnded]);

  return <div className="circle" style={style}></div>;
}

export default Circle;
