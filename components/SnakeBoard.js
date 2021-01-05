import { useState, useEffect, useRef } from "react";
import randomColor from "randomcolor";
import getOS from "./getOS";
import randomImage from "./RandomImage";
import smartDirection from "../functions/smartDirection";

const Snake = ({
  color,
  setColor,
  score,
  name,
  setSelected,
  selected,
  speed,
  gameProp,
  onError,
  smartProp,
}) => {
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

  const [game, setGame] = useState(gameProp || false);

  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (width - 2)) + 1,
    y: Math.floor(Math.random() * (height - 2)) + 1,
  });
  const [tailLength, setTailLength] = useState(0);
  const [tail, setTail] = useState([]);

  const checkIfEatingFood = (position) => {
    const { x, y } = position;
    if (food.x === x && food.y === y) {
      setFood({
        x: Math.floor(Math.random() * (width - 2)) + 1,
        y: Math.floor(Math.random() * (height - 2)) + 1,
      });

      if (tailLength === 0) {
        setTail([body[0]]);
      } else {
        setTail([...tail, body[0]]);
      }
      setTailLength(tailLength + 1);
    }
  };

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
    if (game) {
      tail.map((part) => {
        if (part.x === newHead.x && part.y === newHead.y) {
          alert("You get nothing! You lose! Good day Sir.");
          setTail([]);
        }
      });
      body.map((part) => {
        if (part.x === newHead.x && part.y === newHead.y) {
          alert("You get nothing! You lose! Good day Sir.");
          setTail([]);
        }
      });
      checkIfEatingFood(newHead);
    }

    return newHead;
  };

  const [gameOver, setGameOver] = useState(false);

  const moveSnakeBody = (newSnakeHead, bodySection, tail) => {
    const newBodyPositions = bodySection.map((part, i) => {
      if (tail) {
        return bodySection[i + 1] || body[0];
      } else if (i < bodySection.length - 1) {
        return bodySection[i + 1];
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

  const [pause, setPause] = useState(false);

  const pickDirection =
    typeof changeDirection !== "undefined" ? changeDirection : smartDirection;

  useEffect(() => {
    setBody(moveSnakeBody(head, body));
    if (game) {
      setTail(moveSnakeBody(head, tail, true));
    }
    if (smart && game) {
      let newDirection = direction;
      try {
        newDirection = pickDirection({
          direction,
          food,
          head,
          tail,
          body,
          width,
          height,
        });
      } catch (err) {
        if (onError) {
          onError(err);
        } else {
          throw err;
        }
      }

      if (opposites[newDirection] !== direction) {
        setDirection(newDirection);
      }
    } else if (!selected) {
      let newDirection = direction;
      if (Math.random() < 0.15) {
        newDirection = randomDirection();
      }
      if (opposites[newDirection] !== direction) {
        setDirection(newDirection);
      }
    }

    if (!pause) {
      const timer = setTimeout(
        () => setHead(getNewSnakeHeadPosition(head)),
        speed || 30
      );
      return () => clearTimeout(timer);
    }
  }, [head, selected, pause]);

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

  const [smart, setSmart] = useState(smartProp || false);

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
            for (let i = 0; i < length + tail?.length; i += 1) {
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
        case 48:
          setPause(!pause);
          break;
        case 71:
          setGame(!game);
          break;
        case 73:
          setSmart(!smart);
        default:
      }
    }
  };

  const renderTail = () => {
    return tail.map((part, i) => (
      <div
        className="tail"
        key={`${i}tail`}
        style={{
          width: 10,
          zIndex: 15,
          borderRadius: dots && "50%",
          height: 10,
          backgroundColor: multipleColors?.[i] || "white",
          position: "absolute",
          bottom: part.y * 10,
          left: part.x * 10,
          opacity: "80%",
        }}
      />
    ));
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
      tabIndex="0"
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
            src="/pcmap-copy.png"
            style={{ height: "80%", width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      {game && (
        <div
          style={{
            width: 10,
            borderRadius: "50%",
            height: 10,
            backgroundColor: "white",
            position: "absolute",
            bottom: food.y * 10,
            left: food.x * 10,
            opacity: "80%",
          }}
        />
      )}
      {game && renderTail()}
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
