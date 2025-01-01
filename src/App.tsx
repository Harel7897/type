import React, { useState } from "react";
import { calculateAge } from "./ageCalculator";

const App: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number | string>("");
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const currentYear = new Date().getFullYear();
      if (typeof birthYear === "string" && birthYear.trim() === "") {
        setError("Please enter a valid year.");
        return;
      }
      const ageResult = calculateAge(Number(birthYear), currentYear);
      setAge(ageResult);
      setError(null); // Clear error
    } catch (err: any) {
      setError(err.message);
      setAge(null); // Clear previous age
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Age Calculator</h1>
      <div>
        <label>
          Enter your birth year:
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <button onClick={handleCalculate} style={{ marginLeft: "10px" }}>
          Calculate
        </button>
      </div>
      {age !== null && <p>Your age is: {age}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
