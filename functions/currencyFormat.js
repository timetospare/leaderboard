const currencyFormat = (x) => {
  let className;
  if (x < 0) {
    className = "text-red-500 font-bold";
  } else {
    className = "text-green-500";
  }

  return (
    <span className={className}>{`£${x
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
  );
};

export default currencyFormat;
