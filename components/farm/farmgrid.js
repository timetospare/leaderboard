import currencyFormat from "../../functions/currencyFormat";

const renderSymbol = {
  "Solar Panels": "☀️",
  Chickens: "🐓",
  Sheep: "🐑",
};

const FarmGrid = ({ values, onClick, prices, money }) => {
  return (
    <div className="grid grid-cols-4 gap-2 text-black max-w-xl">
      {Object.keys(values).map((key) => (
        <div>
          <div
            className={`p-1 text-center bg-gray-50 ${
              money < 100 ? "cursor-not-allowed" : "cursor-pointer"
            } relative rounded shadow hover:opacity-80 w-28`}
            onClick={() => onClick(key)}
          >
            <span className="text-gray-800 absolute top-0 left-0 ml-1">
              {key}
            </span>
            <div>
              {renderSymbol[values[key].type]} x{" "}
              <span
                className={`${
                  values[key].value === 0
                    ? "text-red-600 font-extrabold"
                    : "text-black"
                }`}
              >
                {values[key].value}
              </span>
            </div>
            <span>
              {currencyFormat(
                values[key].value * prices[values[key].type] || 0
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmGrid;
