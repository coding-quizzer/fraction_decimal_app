import React, { useRef, useState } from "react";
import { Fraction } from "../../helpers/fractionDecimalFunctions";
import NumberInput from "../reusables/NumberInput";
import "./index.scss";
type FractionInputBoxProps = {
  onSubmit?: (fraction: Fraction) => void;
};

export default function FractionInputBox(props: FractionInputBoxProps) {
  const [numerator, setNumerator] = useState<number | null>(null);
  const [denominator, setDenominator] = useState<number | null>(null);

  const denominatorInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (numerator && denominator) {
      props.onSubmit &&
        props.onSubmit([Number(numerator), Number(denominator)]);
    }
    setNumerator(null);
    setDenominator(null);
  };

  const slashToSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/") {
      denominatorInputRef.current?.focus();
    }
  };
  return (
    <form className="fraction-input" onSubmit={handleSubmit}>
      <div className="fraction-input--textboxes">
        <NumberInput
          name={"numerator"}
          value={numerator}
          setValue={setNumerator}
          onKeyDown={slashToSelect}
        />
        <section>/</section>
        <NumberInput
          name={"denominator"}
          value={denominator}
          setValue={setDenominator}
          ref={denominatorInputRef}
        />
      </div>

      <button>Calculate</button>
    </form>
  );
}
