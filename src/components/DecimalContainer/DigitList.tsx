import {
  DecimalPlace,
  RepeatingDecimalObject,
} from "../../helpers/fractionDecimalFunctions";
import DecimalDigit from "./DecimalDigit";
import "./DigitList.scss";
import NumberContainer from "../reusables/NumberContainer";
import Carousel from "../reusables/Carousel";
type DigitListProps = {
  digits: RepeatingDecimalObject;
  denominator: number;
  limit?: number;
};

const defaultDigits = [
  <NumberContainer key="initial-0" width={36}>
    0
  </NumberContainer>,
  <NumberContainer key="initial-decimal" width={36} background="white">
    .
  </NumberContainer>,
];

const extractDecimalDigits = (
  decimalObject: RepeatingDecimalObject,
  limit = 8
): DecimalPlace[] => {
  const decimalExpansion: DecimalPlace[] = [];
  const { nonRepeatingDigits, repeatingDigits } = decimalObject;

  for (let index = 0; index < limit; index++) {
    const nonRepeatingDigitsLength = nonRepeatingDigits?.length || 0;
    if (nonRepeatingDigits && nonRepeatingDigits[index]) {
      decimalExpansion.push(nonRepeatingDigits[index]);
      continue;
    }

    if (!repeatingDigits) return decimalExpansion;

    decimalExpansion.push(
      repeatingDigits[
        (index - nonRepeatingDigitsLength) % repeatingDigits.length
      ]
    );
  }

  return decimalExpansion;
};

const getDecimalDigitElements = (
  digits: RepeatingDecimalObject,
  options: {
    denominator: number;
    limit?: number;
  }
) => {
  {
    const digitElementList = extractDecimalDigits(digits, options.limit).map(
      (decimalDigit, index) => (
        <DecimalDigit
          key={JSON.stringify({
            ...options,
            numerator: decimalDigit.baseNumerator,
            index,
          })}
          fraction={[decimalDigit.baseNumerator, options.denominator]}
        >
          {decimalDigit.quotient}
        </DecimalDigit>
      )
    );

    digitElementList.unshift(...defaultDigits);

    return digitElementList;
  }
};

export default function DigitList(props: DigitListProps) {
  const options = {
    denominator: props.denominator,
    limit: props.limit,
  };
  return (
    <div className="decimal">
      <Carousel unitWidth={46} show={8}>
        {/* <section>.</section> */}
        {getDecimalDigitElements(props.digits, options)}
      </Carousel>
    </div>
  );
}
