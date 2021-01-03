import { useState, useEffect, useRef } from "react";
import randomColor from "randomcolor";

const Snake = ({ color, setColor, score }) => {
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

  const renderSnake = () =>
    body.map((part, i) => (
      <div
        key={i}
        style={{
          width: 10,
          borderRadius: dots && "50%",
          height: 10,
          backgroundColor: multipleColors?.[i] || color,
          position: "absolute",
          bottom: part.y * 10,
          left: part.x * 10,
          opacity: "80%",
        }}
      />
    ));

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

  const [selected, setSelected] = useState(false);
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
        default:
      }
    }
  };

  return (
    <div
      onClick={() => {
        if (!selected) {
          setSelected(true);
          board.current.focus();
        } else {
          setSelected(false);
          board.current.blur();
        }
      }}
      onKeyDown={handleKeyPress}
      ref={board}
      tabindex="0"
      style={{
        position: "relative",
        height: height * 10,
        overflow: "hidden",
        borderRadius: circle && "50%",
        width: width * 10,
        border: "1px solid white",
        transform: circle && "rotate(90deg)",
        transition: "transform 2s ease-in-out",
        outline:
          !circle && `${selected ? 5 : 1}px solid rgba(255, 255, 255, 0.8)`,
        margin: 16,
      }}
    >
      {renderSnake()}
    </div>
  );
};

export default Snake;
