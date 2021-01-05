import Head from "next/head";
import { useState } from "react";
import SnakeBoard from "../components/SnakeBoard";
import Score from "../components/Score";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

const scores = [
  {
    name: "id",
    score: 10,
    color: "#66fbfb",
  },
];

const Test = () => {
  const [code, setCode] = useState(`// Don't delete these lines
  window.changeDirection = ({
    direction,
    head,
    food,
    body,
    tail,
    width,
    height,
  }) => {  
    // Put your code in here
    
    let newDirection = direction
    if (direction === "right" && food.x === head.x + 1) {
      newDirection = "up";
    }
    if (direction === "left" && food.x === head.x - 1) {
      newDirection = "up";
    }
    if (direction === "up" && food.y === head.y + 1) {
      newDirection = "left";
    }
    return newDirection
    
    // This function should return "up", "down", "left" or "right.
  }
  
// direction is the current direction of the snake
// head is an object { x: value, y: value } giving current location of the head
// width and height are the dimensions of the board (40 x 40)
// food is an {x, y} object location of the next piece of snake food
  `);

  const [selected, setSelected] = useState("id");
  const [error, setError] = useState(null);

  const handleSaveCode = () => {
    try {
      eval(code);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#021420",
        width: "100%",
        height: "100vh",
      }}
    >
      <Head>
        <title>Time to Spare Code Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        style={{
          margin: 0,
          padding: "16px 0px",
          textAlign: "center",
          color: "white",
        }}
      >
        Time to Spare Code Test
      </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {scores.map((obj, i) => (
          <div>
            <SnakeBoard
              color={obj.color}
              score={obj.score}
              selected={selected}
              gameProp
              onError={(err) => setError(err)}
              smartProp
              setSelected={(value) => {
                setSelected(value);
              }}
              name={obj.name}
              setColor={(newColor) => handleSetColor(i, newColor)}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Score score={obj.score} color={obj.color} />
            </div>

            <h1 style={{ textAlign: "center", color: obj.color }}>
              {obj.name}
            </h1>
          </div>
        ))}
        <div style={{ width: 500 }}>
          {error && (
            <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
          )}
          <Editor
            value={code}
            onValueChange={(hello) => setCode(hello)}
            highlight={(value) => highlight(value, languages.js)}
            padding={10}
            style={{
              backgroundColor: "white",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              height: "90%",
            }}
          />
          <button onClick={handleSaveCode}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
