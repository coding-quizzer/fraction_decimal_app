import { useState } from "react";
import "./App.css";
import DecimalContainer from "./components/DecimalContainer";
import { Fraction } from "./helpers/fractionDecimalFunctions";
import FractionInputBox from "./components/FractionInputBox";
import Footer from "./components/Footer";

function App() {
  const [fraction, setFraction] = useState<Fraction | null>(null);

  return (
    <div className="App">
      <h1>Fraction Decimal Explorer</h1>
      <FractionInputBox
        onSubmit={(fraction: Fraction) => setFraction(fraction)}
      />
      {fraction && <DecimalContainer fraction={fraction as Fraction} />}
      <Footer />
    </div>
  );
}

export default App;
