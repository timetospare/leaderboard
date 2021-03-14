import { useState, useEffect } from "react";
import FarmLogic from "../../components/farm/FarmLogic";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

const FarmChallenge = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleSaveCode = () => {
    try {
      eval(code);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <div className="bg-black h-screen w-screen text-white grid grid-cols-2">
      <div className="mx-auto my-auto p-6">
        <FarmLogic />
      </div>
      <div className="w-full max-w-xl m-auto p-6">
        <h2 className="flex w-full justify-between items-center text-white text-xl">
          Your code
          <button
            className="text-base bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
            onClick={handleSaveCode}
          >
            Run
          </button>
        </h2>
        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error.message}</p>
        )}
        <Editor
          value={code}
          onValueChange={(hello) => {
            setCode(hello);
            localStorage.setItem("challengeCode", hello);
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
        <div className="pt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
            onClick={handleSaveCode}
          >
            Run
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
            onClick={() => setCode(defaultCode)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmChallenge;
