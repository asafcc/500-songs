import React, { useEffect, useState, useRef } from "react";

function Circle({ circle, getCircle }) {
  const [hasEnded, setHasEnded] = useState(false);
  const timeoutRef = useRef(null);

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
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    // console.log("start " + hasEnded);
    if (!hasEnded) {
      // animation started
      // console.log("started " + hasEnded);
      timeoutRef.current = setTimeout(() => {
        setHasEnded(true);
      }, circle.duration * 1000);
      return () => {
        // console.log("clear " + hasEnded);
        clearTimeout(timeoutRef.current);
      };
    } else {
      //animation ended
      // console.log("ended " + hasEnded);
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
    }
  }, [hasEnded]);

  return <div className="circle" style={style}></div>;
}

export default Circle;
