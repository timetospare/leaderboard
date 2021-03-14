import { useState, useEffect } from "react";
import useInterval from "@use-it/interval";
import FarmGrid from "./farmgrid";
import { FaPause, FaPlay, FaForward, FaFastForward } from "react-icons/fa";
import currencyFormat from "../../functions/currencyFormat";

const generateGridKeys = () => {
  const letters = ["A", "B", "C", "D"];
  const gridKeys = [];
  for (let j = 1; j < 5; j += 1) {
    for (let i = 0; i < letters.length; i += 1) {
      gridKeys.push(`${letters[i]}${j}`);
    }
  }
  return gridKeys;
};

const types = ["Sheep", "Chickens", "Solar Panels"];
const renderSymbol = {
  "Solar Panels": "☀️",
  Chickens: "🐓",
  Sheep: "🐑",
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const landQualityDistribution = [
  ...Array(3).fill(1),
  ...Array(3).fill(2),
  ...Array(4).fill(3),
  ...Array(5).fill(4),
  ...Array(5).fill(5),
];

const initialValues = generateGridKeys().reduce((obj, key) => {
  obj[key] = { value: 0, type: null };
  return obj;
}, {});

const randomQualityDistributions = {};
types.forEach((type) => {
  randomQualityDistributions[type] = shuffleArray(
    landQualityDistribution.slice()
  );
});

const hiddenQualityValues = generateGridKeys().reduce((obj, key, i) => {
  obj[key] = {};
  types.forEach((type) => {
    obj[key][type] = randomQualityDistributions[type][i];
  });
  return obj;
}, {});

const grow = (value) => {
  const rand = Math.random();
  if (value <= 1) {
    if (rand > 0.5) {
      return -1;
    }
    return 0;
  } else if (value === 2) {
    if (rand > 0.8) {
      return 1;
    } else if (rand < 0.2) {
      return -1;
    } else {
      return 0;
    }
  } else if (value === 3) {
    if (rand > 0.9) {
      return 1;
    } else return 0;
  } else if (value === 4) {
    if (rand > 0.8) {
      return 1;
    }
    return 0;
  } else {
    if (rand >= 0.75) {
      return 1;
    }
    return 0;
  }
};

const outputs = {
  Sheep: "👚 Jumpers",
  Chickens: "🥚 Eggs",
  "Solar Panels": "💡 Electricity",
};

const FarmLogic = ({ pointer }) => {
  const [values, setValues] = useState(initialValues);
  const [turn, setTurn] = useState(0);

  const [type, setType] = useState("Chickens");

  const [prices, setPrices] = useState(
    types.reduce((priceObj, type) => {
      priceObj[type] = 10;
      return priceObj;
    }, {})
  );

  const addRandomGrowth = (farmvs) => {
    console.log({ farmvs });
    Object.keys(farmvs).forEach((cell) => {
      const { type, value } = farmvs[cell];
      let newValue = value;
      if (type && value !== 0) {
        console.log(hiddenQualityValues[type]);
        newValue += grow(
          hiddenQualityValues[cell][type] +
            Math.round((Math.random() - 0.5) * 2)
        );
      }
      farmvs[cell] = { type, value: newValue };
    });
    return farmvs;
  };

  const handleClick = (cell) => {
    if (
      (values[cell].type !== type || values[cell].value === 0) &&
      money >= 100
    ) {
      setMoney((currentMoney) => currentMoney - 100);
      setValues({ ...values, [cell]: { value: 1, type } });
    }
  };

  const randomWalkPrices = (priceValues) => {
    Object.keys(priceValues).forEach((value) => {
      priceValues[value] =
        priceValues[value] + Math.round((Math.random() - 0.5) * 2);
    });
    return priceValues;
  };

  const [money, setMoney] = useState(1000);

  const calculateExtraMoney = ({ prices, values, current }) => {
    let newMoney = current;
    Object.values(values).forEach((obj) => {
      console.log({ obj });
      const { type, value } = obj;
      const price = prices[type];
      if (price && value) {
        newMoney += price * value;
      }
    });
    return newMoney;
  };

  const [autoTurn, setAutoTurn] = useState(null);

  useEffect(() => {
    if (turn > 0) {
      let newValues;
      if (window.changeFields) {
        newValues = window.changeFields({ prices, fields: values, money });
      }

      setValues(addRandomGrowth(values));
      setPrices(randomWalkPrices(prices));
      setMoney(calculateExtraMoney({ prices, values, current: money }));
    }
  }, [turn]);

  useInterval(() => {
    setTurn(() => turn + 1);
  }, autoTurn);

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="flex py-4 border-gray-200 border-b justify-between items-center">
        <div className="text-xl mr-16">⏲️ Turn: {turn}</div>
        <div className="flex">
          {!autoTurn && (
            <button
              className="text-white bg-blue-500 px-2 py-1 cursor-pointer mr-8 rounded"
              onClick={() => setTurn(turn + 1)}
            >
              Next Turn
            </button>
          )}

          <div className="flex w-36 justify-between">
            {!autoTurn ? (
              <>
                <button onClick={() => setAutoTurn(500)}>
                  <FaPlay />
                </button>
              </>
            ) : (
              <button onClick={() => setAutoTurn(null)}>
                <FaPause />
              </button>
            )}

            <button onClick={() => setAutoTurn(100)}>
              <FaForward />
            </button>

            <button onClick={() => setAutoTurn(10)}>
              <FaFastForward />
            </button>
          </div>
        </div>
      </div>
      <div className="flex border-gray-200 border-b">
        <div className="w-1/2 mb-4">
          <h4 className="text-xl my-2">Prices:</h4>
          {Object.keys(prices).map((type) => (
            <div className="flex justify-between">
              {outputs[type]}
              <span>£{prices[type]}</span>
            </div>
          ))}
        </div>
        <div className="ml-8 flex-1">
          <h4 className="text-xl my-2">Your Money:</h4>{" "}
          <p className="text-right w-full text-xl">{currencyFormat(money)}</p>
        </div>
      </div>
      <h2 className="text-xl pt-4">Change Fields (costs £100)</h2>
      {types.map((farmType) => (
        <button
          onClick={() => setType(farmType)}
          className={`${
            type === farmType ? "bg-blue-500" : "opacity-80"
          } mr-4  my-4 p-2 rounded`}
        >
          {renderSymbol[farmType]} {farmType}
        </button>
      ))}
      <h4 className="text-xl py-4  border-gray-200 border-t">Your Farm</h4>
      <FarmGrid
        values={values}
        onClick={handleClick}
        prices={prices}
        money={money}
      />
    </div>
  );
};

export default FarmLogic;
