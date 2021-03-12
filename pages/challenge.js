import Head from "next/head";
import { useEffect, useState } from "react";
import SnakeBoard from "../components/SnakeBoard";
import Score from "../components/Score";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

const defaultCode = `// Don't delete these lines
window.changeDirection = ({
  direction,
  head,
  food,
  tail,
  width,
  height,
}) => {  
  // Put your code in here
  
  // This example here is our Zoolander snake AI.
  let newDirection = direction
  if (direction === "right" && food.x === head.x + 1) {
    newDirection = "down";
  }
  if (direction === "left" && food.x === head.x - 1) {
    newDirection = "down";
  }
  if (direction === "down" && food.y === head.y - 1) {
    newDirection = "right";
  }
  if (direction === "up") {
    newDirection = "right"
  }
  return newDirection
  
  // This function should return "up", "down", "left" or "right".
}

// direction is the current direction of the snake
// head is an object { x: value, y: value } giving current location of the head
// width and height are the dimensions of the board (40 x 40)
// food is an {x, y} object location of the next piece of snake food
// tail is an array of { x, y} object locations of each part of the snake's tail

`;

const scores = [
  {
    name: "snA.I.ke",
    score: 1,
    color: "orange",
  },
];

const Test = () => {
  const [code, setCode] = useState(defaultCode);

  const [boardRunKey, setBoardRunKey] = useState(1);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("code")?.length > 0
    ) {
      setCode(localStorage.getItem("code"));
    }
  }, [typeof window]);

  const [selected, setSelected] = useState("id");
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(30);

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
        color: "white",
        backgroundColor: "#021420",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>Time to Spare Code Challenge</title>
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
        <a
          href="https://timetospare.com"
          target="_blank"
          style={{ color: "#0087ee" }}
        >
          Time to Spare
        </a>{" "}
        Code Challenge
      </h1>
      <p style={{ textAlign: "center", marginTop: 0 }}>
        We'll run your AI five times up until your snake dies or the ticker hits
        60. Your score will be the average of the five runs.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 16,
          borderTop: "1px solid #DBDBDB",
        }}
      >
        <div style={{ marginRight: 48 }}>
          <div style={{ paddingLeft: 16 }}>
            <h2
              style={{
                color: "white",
                marginTop: 0,
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                Tick speed:
                <input
                  type="number"
                  style={{ marginLeft: 16, height: "100%", width: 64 }}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
              </div>
              <button
                style={{
                  backgroundColor: "#3047ec",
                  padding: "8px 16px",
                  fontSize: "16px",
                  borderRadius: 4,
                  boxShadow: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setBoardRunKey(boardRunKey + 1)}
              >
                Restart
              </button>
            </h2>
          </div>
          <div>
            {scores.map((obj, i) => (
              <div>
                <SnakeBoard
                  color={obj.color}
                  score={obj.score}
                  selected={selected}
                  speed={speed}
                  stopAt={400}
                  boardRunKey={boardRunKey}
                  gameProp
                  onError={(err) => {
                    console.log({ err });

                    const secondLine = err.stack.substring(
                      err.stack.indexOf("handleSaveCode")
                    );
                    const columnRow = secondLine
                      .substring(
                        secondLine.indexOf("anonymous"),
                        secondLine.indexOf(" at")
                      )
                      .replace("anonymous>:", "")
                      .replace(")", "")
                      .trim();

                    console.log({ columnRow });

                    setError({ message: `${err.message} - line ${columnRow}` });
                  }}
                  smartProp
                  setSelected={(value) => {
                    setSelected(value);
                  }}
                  name={obj.name}
                  setColor={(newColor) => handleSetColor(i, newColor)}
                />

                <h1 style={{ textAlign: "center", color: obj.color }}>
                  {obj.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 500 }}>
          <h2
            style={{
              color: "white",
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Your code{" "}
            <button
              style={{
                backgroundColor: "#3047ec",
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: 4,
                boxShadow: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleSaveCode}
            >
              Run
            </button>
          </h2>
          {error && (
            <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
          )}
          <Editor
            value={code}
            onValueChange={(hello) => {
              setCode(hello);
              localStorage.setItem("code", hello);
            }}
            highlight={(value) => highlight(value, languages.js)}
            padding={10}
            style={{
              color: "black",
              marginTop: 16,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              minHeight: 500,
              overflow: "auto",
            }}
          />
          <div
            style={{
              paddingTop: 16,
              paddingBottom: 160,
              fontSize: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                backgroundColor: "#3047ec",
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: 4,
                boxShadow: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleSaveCode}
            >
              Run
            </button>
            <button
              style={{
                backgroundColor: "red",
                padding: "8px 16px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: 4,
                boxShadow: "none",
                border: "none",
                color: "white",
              }}
              onClick={() => setCode(defaultCode)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          button:hover {
            opacity: 80%;
          }
        `}
      </style>
    </div>
  );
};

export default Test;
