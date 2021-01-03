import SnakeBoard from "../components/SnakeBoard";
import Score from "../components/Score";
import Head from "next/head";
import { useState } from "react";

const Snake = () => {
  const [scores, setScores] = useState([
    {
      name: "Reuben",
      score: 0,
      color: "#66fbfb",
    },
    {
      name: "Tom",
      score: 300,
      color: "red",
    },
    {
      name: "Reda",
      score: 15,
      color: "yellow",
    },
  ]);

  const handleSetColor = (i, newColor) => {
    setScores([
      ...scores.slice(0, i),
      {
        ...scores[i],
        color: newColor,
      },
      ...scores.slice(i + 1, scores.length),
    ]);
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
        <title>Time to Spare Leaderboard</title>
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
        Time to Spare Leaderboard
      </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {scores.map((obj, i) => (
          <div>
            <SnakeBoard
              color={obj.color}
              score={obj.score}
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
      </div>
    </div>
  );
};

export default Snake;
