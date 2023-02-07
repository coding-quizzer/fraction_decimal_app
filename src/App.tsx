import { useState } from "react";
import "./App.css";
import DecimalContainer from "./components/DecimalContainer";
import { Fraction } from "./helpers/fractionDecimalFunctions";
import FractionInputBox from "./components/FractionInputBox";

function App() {
  const [fraction, setFraction] = useState<Fraction | null>(null);

  return (
    <div className="App">
      <FractionInputBox
        onSubmit={(fraction: Fraction) => setFraction(fraction)}
      />
      {fraction && <DecimalContainer fraction={fraction as Fraction} />}
    </div>
  );
}

export default App;
