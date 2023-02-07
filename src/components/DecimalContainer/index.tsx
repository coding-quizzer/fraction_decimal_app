import { Fraction } from "../../helpers/fractionDecimalFunctions";
import { convertFractionToRepeatingDecimal } from "../../helpers/fractionDecimalFunctions";
import "./index.scss";
import DigitList from "./DigitList";
import NumberInput from "../reusables/NumberInput";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

type DecimalContainerProps = {
  fraction: Fraction;
};

export default function DecimalContainer(props: DecimalContainerProps) {
  const [calculatedFraction, setCalculatedFraction] = useState<Fraction>(
    props.fraction
  );

  const [inputFraction, setInputFraction] = useState<
    [number | null, number | null]
  >(props.fraction);

  const denominatorHeaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputFraction(props.fraction);
    setCalculatedFraction(props.fraction);
  }, [props.fraction[0], props.fraction[1]]);

  useDebounce(() =>
    setCalculatedFraction((prev) => [
      inputFraction[0] || prev[0],
      inputFraction[1] || prev[1],
    ])
  );

  const slashToSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "/") {
      denominatorHeaderRef.current?.focus();
    }
  };

  const [digitLimit, setDigitLimit] = useState<number | null>(8);
  const [tempDigitLimit, setTempDigitLimit] = useState<number | null>(8);
  useDebounce(() => setDigitLimit(tempDigitLimit));
  return (
    <div className="decimal-container">
      <header>
        <div className="decimal-container--label">
          <NumberInput
            name="numerator-container"
            value={inputFraction[0]}
            setValue={(numerator: number | null) =>
              setInputFraction((prev) => [numerator, prev[1]])
            }
            onKeyDown={slashToSelect}
          />
          <section>/</section>
          <NumberInput
            value={inputFraction[1]}
            name="denominator-container"
            setValue={(denominator: number | null) =>
              setInputFraction((prev) => [prev[0], denominator])
            }
            ref={denominatorHeaderRef}
          />
        </div>
        <div className="decimal-container--limit">
          <label htmlFor={"digit-limit"}>Decimal Places</label>
          <NumberInput
            name="digit-limit"
            value={tempDigitLimit}
            setValue={setTempDigitLimit}
          />
        </div>
      </header>
      <DigitList
        digits={convertFractionToRepeatingDecimal(calculatedFraction)}
        denominator={calculatedFraction[1]}
        limit={Number(digitLimit)}
      />
    </div>
  );
}
