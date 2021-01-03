import DigitDisplay from "./DigitDisplay";

const Digit = ({ value, color }) => {
  if (value === "0") {
    return <DigitDisplay a b c e f g color={color} />;
  } else if (value === "1") {
    return <DigitDisplay c f color={color} />;
  } else if (value === "2") {
    return <DigitDisplay a c d e g color={color} />;
  } else if (value === "3") {
    return <DigitDisplay a c d f g color={color} />;
  } else if (value === "4") {
    return <DigitDisplay b d c f color={color} />;
  } else if (value === "5") {
    return <DigitDisplay a b d f g color={color} />;
  } else if (value === "6") {
    return <DigitDisplay a b d e f g color={color} />;
  } else if (value === "7") {
    return <DigitDisplay a c f color={color} />;
  } else if (value === "8") {
    return <DigitDisplay a b c d e f g color={color} />;
  } else {
    return <DigitDisplay a b c d f g color={color} />;
  }
};

export default Digit;
