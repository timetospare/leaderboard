import Head from "next/head";
import SnakeBoard from "../components/SnakeBoard";
import Score from "../components/Score";

const scores = [
  {
    name: "id",
    score: 10,
    color: "#66fbfb",
  },
];

const Test = () => {
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
              selected={"id"}
              gameProp
              smartProp
              setSelected={() => {}}
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
      </div>
    </div>
  );
};

export default Test;
