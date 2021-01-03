const DigitDisplay = ({ a, b, c, d, e, f, g, color }) => {
  const height = 40;
  const width = 20;

  return (
    <div style={{ height, width, position: "relative", margin: "0px 2px" }}>
      {a && (
        <div
          style={{
            borderRadius: 2,
            height: 4,
            width: 10,
            left: 5,
            top: 0,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {b && (
        <div
          style={{
            borderRadius: 2,
            width: 4,
            height: 18,
            left: 1,
            top: 0,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {c && (
        <div
          style={{
            borderRadius: 2,
            width: 4,
            height: 18,
            right: 1,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {d && (
        <div
          style={{
            borderRadius: 2,
            height: 4,
            width: 10,
            left: 5,
            top: 20,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {e && (
        <div
          style={{
            borderRadius: 2,
            width: 4,
            height: 18,
            left: 1,
            position: "absolute",
            bottom: 0,
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {f && (
        <div
          style={{
            borderRadius: 2,
            height: 18,
            width: 4,
            right: 1,
            bottom: 0,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
      {g && (
        <div
          style={{
            borderRadius: 2,
            height: 4,
            width: 10,
            left: 5,
            bottom: 0,
            position: "absolute",
            backgroundColor: color,
            opacity: "80%",
          }}
        />
      )}
    </div>
  );
};

export default DigitDisplay;
