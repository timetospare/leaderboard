import { useState, useEffect, useRef } from "react";
import randomColor from "randomcolor";
import getOS from "./getOS";
import randomImage from "./RandomImage";

const Snake = ({ color, setColor, score, name, setSelected, selected }) => {
  const width = 40;
  const height = 40;

  const createInitialSnakeBody = (length, initialY) => {
    const snakeBody = [];
    for (let i = 0; i < length; i += 1) {
      snakeBody.push({
        x: i % width,
        y: initialY || 0,
      });
    }
    return snakeBody;
  };

  const length = score;
  const [body, setBody] = useState(createInitialSnakeBody(length, 2));
  const [head, setHead] = useState(body[body.length - 1] || {});
  const [direction, setDirection] = useState("right");
  const [multipleColors, setMultipleColors] = useState(null);

  const getNewSnakeHeadPosition = (input) => {
    const { x, y } = input;
    const newHead = {
      x,
      y,
    };
    if (direction === "right") {
      newHead.x = (x + 1) % width;
    }
    if (direction === "left") {
      if (x === 0) {
        newHead.x = width - 1;
      } else {
        newHead.x = x - 1;
      }
    }
    if (direction === "up") {
      newHead.y = (y + 1) % height;
    }
    if (direction === "down") {
      if (y === 0) {
        newHead.y = height - 1;
      } else {
        newHead.y = y - 1;
      }
    }
    return newHead;
  };

  const moveSnakeBody = (newSnakeHead) => {
    const newBodyPositions = body.map((part, i) => {
      if (i < body.length - 1) {
        return body[i + 1];
      } else {
        return newSnakeHead;
      }
    });
    return newBodyPositions;
  };

  const [dots, setDots] = useState(false);

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("should move");
      setHead(getNewSnakeHeadPosition(head));

      //setBody(moveSnakeBody(newHead));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  */

  const randomDirection = () => {
    const variable = Math.random();
    if (variable < 0.25) {
      return "up";
    } else if (variable < 0.5) {
      return "down";
    } else if (variable < 0.75) {
      return "left";
    } else return "right";
  };

  const opposites = {
    left: "right",
    right: "left",
    up: "down",
    down: "up",
  };

  const board = useRef(null);

  useEffect(() => {
    setBody(moveSnakeBody(head));
    if (!selected && Math.random() < 0.15) {
      const newDirection = randomDirection();
      if (opposites[newDirection] !== direction) {
        setDirection(newDirection);
      }
    }
    const timer = setTimeout(() => setHead(getNewSnakeHeadPosition(head)), 30);
    return () => clearTimeout(timer);
  }, [head, selected]);

  const [circle, setCircle] = useState(false);
  const [image, setImage] = useState(false);

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (pulse) {
      setTimeout(() => {
        setPulse(false);
      }, 600);
    }
  }, [pulse]);

  const [shadow, setShadow] = useState(false);
  const [breaks, setBreaks] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [negative, setNegative] = useState(false);
  const [zSpin, setZSpin] = useState(false);
  const [threeD, setThreeD] = useState(false);

  const [macWindows, setMacWindows] = useState(null);

  const handleKeyPress = (event) => {
    console.log({ event });
    if (selected) {
      switch (event.keyCode) {
        case 37:
        case 65:
          if (direction != "right") {
            setDirection("left");
          }
          break;
        case 38:
        case 87:
          if (direction != "down") setDirection("up");
          break;
        case 39:
        case 68:
          if (direction != "left") setDirection("right");
          break;
        case 40:
        case 83:
          if (direction != "up") setDirection("down");
          break;
        case 32:
          setColor(randomColor({ luminosity: "bright" }));
          break;
        case 81:
          if (multipleColors) {
            setMultipleColors(null);
          } else {
            const colors = [];
            for (let i = 0; i < length; i += 1) {
              colors.push(randomColor({ luminosity: "bright" }));
            }
            setMultipleColors(colors);
          }
          break;
        case 88:
          setCircle(!circle);
          break;
        case 66:
          setDots(!dots);
          break;
        case 80:
          if (image) {
            setImage(false);
          } else {
            setImage(randomImage());
          }
          break;
        case 69:
          setPulse(!pulse);
          break;
        case 82:
          setShadow(!shadow);
          break;
        case 84:
          setBreaks(!breaks);
          break;
        case 76:
          setEasterEgg(!easterEgg);
          break;
        case 78:
          setNegative(!negative);
          break;
        case 90:
          setZSpin(!zSpin);
          break;
        case 75:
          setThreeD(!threeD);
          break;
        case 85:
          console.log({ navigator });
          if (macWindows) {
            setMacWindows(null);
          } else {
            setMacWindows(getOS());
          }
          break;
        default:
      }
    }
  };

  const renderSnake = () =>
    body.map((part, i) => (
      <div
        key={i}
        style={{
          width: 10,
          borderRadius: dots && "50%",
          height: 10,
          backgroundColor: negative
            ? "#021420"
            : !breaks || i % 3 === 0
            ? multipleColors?.[i] || color
            : "",
          position: "absolute",
          bottom: part.y * 10,
          boxShadow: shadow && "10px 10px white",
          left: part.x * 10,
          opacity: "80%",
        }}
      />
    ));

  return (
    <div
      onClick={() => {
        if (!selected) {
          setSelected(name);
          board.current.focus();
        } else {
          setSelected(null);
          board.current.blur();
        }
      }}
      onBlur={() => setSelected(null)}
      onKeyDown={handleKeyPress}
      ref={board}
      tabindex="0"
      style={{
        position: "relative",
        height: height * 10,
        backgroundColor: negative && color,
        overflow: "hidden",
        borderRadius: circle && "50%",
        cursor: "pointer",
        width: width * 10,
        border: "1px solid white",
        transform: `${circle ? "rotate(90deg)" : ""} ${
          pulse ? "scale(0.7)" : ""
        } ${zSpin ? "rotateZ(180deg)" : ""} ${
          threeD ? "rotateY(-180deg)" : ""
        }`,
        transition: `transform ${circle ? "2s" : "0.6s"} ease-in-out`,
        zIndex: 20,
        outline:
          !circle && `${selected ? 5 : 1}px solid rgba(255, 255, 255, 0.8)`,
        margin: 16,
      }}
    >
      {image && (
        <img
          style={{
            position: "absolute",
            zIndex: 0,
            opacity: "50%",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          src={image}
        />
      )}
      {easterEgg && (
        <iframe
          src="https://en.m.wikipedia.org/wiki/Easter_egg_(media)"
          style={{ height: "100%", width: "100%" }}
        />
      )}
      {macWindows?.includes("Mac") && (
        <div style={{ width: "100%", height: "100%", padding: 16 }}>
          <h2 style={{ color: "white", textAlign: "center" }}>Get a PC</h2>
          <img
            src="/pcmap.png"
            style={{ height: "80%", width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      {macWindows?.includes("Windows") && (
        <div style={{ width: "100%", height: "100%", padding: 16 }}>
          <h2 style={{ color: "white", textAlign: "center" }}>Good choice</h2>
          <img
            src="https://cdn.geekwire.com/wp-content/uploads/2019/05/Clippy.jpg.jpg"
            style={{ height: "80%", width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      {renderSnake()}
    </div>
  );
};

export default Snake;
