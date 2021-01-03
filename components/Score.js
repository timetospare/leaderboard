import Digit from "./Digit";

const Score = ({ score, color }) => {
  return (
    <div style={{ display: "flex" }}>
      {[...score.toString()].map((letter) => (
        <Digit value={letter} color={color} />
      ))}
    </div>
  );
};

export default Score;
