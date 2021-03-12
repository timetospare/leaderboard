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
  
  
}

// direction is the current direction of the snake
// head is an object { x: value, y: value } giving current location of the head
// width and height are the dimensions of the board (40 x 40)
// food is an {x, y} object location of the next piece of snake food
// tail is an array of { x, y} object locations of each part of the snake's tail

`;

const scores = [
  {
    name: "run1",
    score: 1,
    color: "orange",
  },
  {
    name: "run2",
    score: 1,
    color: "red",
  },
  {
    name: "run3",
    score: 1,
    color: "green",
  },
  {
    name: "run4",
    score: 1,
    color: "pink",
  },
  {
    name: "run5",
    score: 1,
    color: "blue",
  },
];

const Test = () => {
  const [code, setCode] = useState(defaultCode);

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
  const [speed, setSpeed] = useState(3);

  const handleSaveCode = () => {
    try {
      eval(code);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const [boardRunKey, setBoardRunKey] = useState(1);

  const [scoreBoard, setScoreBoard] = useState({});

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
        <title>Code Challenge Evaluate</title>
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
        <button onClick={() => setBoardRunKey(boardRunKey + 1)}>Reset</button>
      </p>
      <div style={{ margin: "auto", textAlign: "center", padding: "16px 0px" }}>
        {Object.keys(scoreBoard).map((name) => (
          <span>
            {name}: <b>{scoreBoard[name]}, </b>
          </span>
        ))}
      </div>
      <div style={{ margin: "auto", textAlign: "center", padding: "16px 0px" }}>
        AVERAGE:{" "}
        <b>
          {Object.values(scoreBoard).reduce((total, value) => {
            const extra = total + value;
            return extra;
          }, 0) / 5}
        </b>
      </div>
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

                display: "flex",
                alignItems: "center",
              }}
            >
              Tick speed:
              <input
                type="number"
                style={{ marginLeft: 16, height: "100%", width: 64 }}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            }}
          >
            {scores.map((obj, i) => (
              <div>
                <SnakeBoard
                  color={obj.color}
                  score={obj.score}
                  selected={selected}
                  speed={speed}
                  stopAt={40}
                  boardRunKey={boardRunKey}
                  gameProp
                  onError={(err) => setError(err)}
                  smartProp
                  reportScore={(score) =>
                    setScoreBoard({ ...scoreBoard, [obj.name]: score })
                  }
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
          <h2 style={{ color: "white", marginTop: 0 }}>Your code</h2>
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
          <button onClick={handleSaveCode}>Save</button>
          <button onClick={() => setCode(defaultCode)}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
