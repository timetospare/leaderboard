const smartDirection = ({
  direction,
  head,
  food,
  body,
  tail,
  width,
  height,
}) => {
  let dir = direction;
  if (tail.length + body.length < 42) {
    if (direction === "right") {
      if (food.x === head.x + 1) {
        dir = "up";
      }
    }
    if (direction === "left" && food.x === head.x - 1) {
      dir = "up";
    }
    if (direction === "up" && food.y === head.y + 1) {
      dir = "left";
    }
  } else if (tail.length + body.length < 120) {
    if (food.y > width / 2) {
      if (direction === "up" && head.y + 1 === food.y) {
        dir = "right";
      } else if (direction === "right" && head.x === width - 2) {
        dir = "down";
      } else if (direction === "down" && head.y === 1) {
        dir = "left";
      } else if (direction === "left" && head.x === 1) {
        dir = "up";
      }
    } else {
      if (direction === "up" && head.y === height - 2) {
        dir = "right";
      } else if (direction === "right" && head.x === width - 2) {
        dir = "down";
      } else if (direction === "down" && head.y - 1 === food.y) {
        dir = "left";
      } else if (direction === "left" && head.x === 1) {
        dir = "up";
      }
    }
  }

  return dir;
};

export default smartDirection;
