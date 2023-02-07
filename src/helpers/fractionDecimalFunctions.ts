export type Fraction = [number, number];
export type DecimalPlace = {
  baseNumerator: number;
  quotient: number;
};

export type DecimalExpansionObject = {
  decimal: DecimalPlace[];
  repeatBeginIndex: number | null;
};

export type RepeatingDecimalObject = {
  nonRepeatingDigits?: DecimalPlace[];
  repeatingDigits?: DecimalPlace[];
};
/**
 * Generates an array object with the information neccesary to produce the decimal expansion.
 * @param {[numerator, denominator]} fraction (tuple representation of a fraction.)
 * @returns {
 *  {
 *    decimal: [{
 *      baseNumerator: number
 *       (
 *          Base numerator represents the numerator that coresponds to the
 *          decimal where that digit is the first digit after the decimal point. For example since 1/7 = 0.142857,
 *          the first one in 142857 has a base numerator of 1 and the 4 has a base numerator of 3 since 3/7 = 0.428571...
 *       )
 *
 *       quotient: number (the numerical value of the digit itself)
 *    }],
 *
 *    repeatBeginIndex: number (the index of the first digit in the number's repeating decimal)
 *
 *  }
 * }
 **/

export const generateDecimalExpansion = (fraction: Fraction): DecimalExpansionObject => {
  const [numerator, denominator]: [number, number] = fraction;
  let baseNumerator: number = numerator;
  let quotient: number = Math.floor((numerator * 10) / denominator);

  const decimal: DecimalPlace[] = [];

  let nextDecimal: DecimalPlace = {
    baseNumerator,
    quotient,
  };

  while (
    nextDecimal.baseNumerator !== 0 &&
    !decimal
      .map((decimalPoint) => decimalPoint.baseNumerator)
      .includes(nextDecimal.baseNumerator)
  ) {
    decimal.push(nextDecimal);

    baseNumerator = (nextDecimal.baseNumerator * 10) % denominator;
    quotient = Math.floor((baseNumerator * 10) / denominator);

    nextDecimal = {
      baseNumerator,
      quotient,
    };
  }

  const repeatBeginIndex: number = decimal.findIndex(
    (decimalPlace) => decimalPlace.baseNumerator === nextDecimal.baseNumerator
  );

  const repeatingDecimal: boolean = repeatBeginIndex !== -1;

  return {
    decimal,
    repeatBeginIndex: repeatingDecimal ? repeatBeginIndex : null,
  };
};

const convertDecimalObjectToRepeatingDecimal = (
  decimalObject: DecimalExpansionObject
) => {
  const { decimal, repeatBeginIndex } = decimalObject;

  const repeatingDecimal: {
    nonRepeatingDigits?: DecimalPlace[];
    repeatingDigits?: DecimalPlace[];
  } = {};
  const nonRepeatingDigits = getNonrepeatingDigits(decimal, repeatBeginIndex);
  const repeatingDigits: null | DecimalPlace[] =
    repeatBeginIndex !== null ? getRepeatingDigits(decimal, repeatBeginIndex) : null;

  nonRepeatingDigits && (repeatingDecimal.nonRepeatingDigits = nonRepeatingDigits);
  repeatingDigits && (repeatingDecimal.repeatingDigits = repeatingDigits);

  return repeatingDecimal;
};

const getNonrepeatingDigits = (
  decimal: DecimalPlace[],
  repeatBeginIndex: number | null
): DecimalPlace[] | null => {
  if (repeatBeginIndex === null) return [...decimal];
  const nonRepeatingDigits: DecimalPlace[] = [];
  for (let i = 0; i < repeatBeginIndex; i++) {
    nonRepeatingDigits.push(decimal[i]);
  }

  return nonRepeatingDigits[0] ? nonRepeatingDigits : null;
};

const getRepeatingDigits = (
  decimal: DecimalPlace[],
  repeatBeginIndex: number
): DecimalPlace[] => {
  const repeatingDigits = [];
  for (let i = repeatBeginIndex; i < decimal.length; i++) {
    repeatingDigits.push(decimal[i]);
  }

  return repeatingDigits;
};

/**
 * Convert a fraction to an object with keys referencing arays of objects representing the repeating and nonrepeating digits in the decimal representation
 * @param {[numerator, denominator]} fraction (tuple representation of a fraction)
 * @returns {{
 *  nonRepeatingDigits: {
 *    [{
 *      baseNumerator: {number},
 *      quotient?: {number}
 *    }]
 *  } DecimalPlace[] (represents the decimal digits that do not repeat. Ex. since 1/14 = 0.0714285714285...
 *  0 is the one non-repeating decimal digit),
 *
 *  repeatingDigits?: {
 *   [{
 *      baseNumerator: {number},
 *      quotient?: {number}
 *    }]
 * } DecimalPlace[] (represents the decimal digits that do repeat. Ex. since 1/14 = 0.0714285714285...
 *  714285 are the repeating decimal digits),
 * }
 * }}
 */

export const convertFractionToRepeatingDecimal = (
  fraction: Fraction
): RepeatingDecimalObject => {
  const decimalExpansion = generateDecimalExpansion(fraction);
  return convertDecimalObjectToRepeatingDecimal(decimalExpansion);
};

const addUniqueDecimalPoints = (
  fraction: Fraction,
  encounteredNumerators: { [key: string]: boolean }
) => {
  const decimalObj: DecimalExpansionObject = generateDecimalExpansion(fraction);

  for (const { baseNumerator } of decimalObj.decimal) {
    if (!encounteredNumerators[baseNumerator]) {
      encounteredNumerators[baseNumerator] = true;
    }
  }

  return { encounteredNumerators, decimalObj };
};

// TODO: remove redundant decimals represented by larger numerators. For example, remove 2/6, since it is already represented in the decimal for 5/6
export const getUniqueNumeratorDecimalObjects = (
  denominator: number
): DecimalExpansionObject[] => {
  let encounteredNumerators: { [key: string]: boolean } = {};
  let currentDecimalObj: DecimalExpansionObject = { decimal: [], repeatBeginIndex: 0 };
  let currentNumerator: number = 1;
  // let decimalCount: number = 0;
  const uniqueDecimalObjs: DecimalExpansionObject[] = [];

  while (currentNumerator < denominator) {
    if (encounteredNumerators[currentNumerator]) {
      currentNumerator++;
      continue;
    }
    ({ encounteredNumerators, decimalObj: currentDecimalObj } = addUniqueDecimalPoints(
      [currentNumerator, denominator],
      encounteredNumerators
    ));
    uniqueDecimalObjs.push(currentDecimalObj);
    currentNumerator++;
  }

  return uniqueDecimalObjs;
};

export const getUniqueDecimals = (denominator: number): RepeatingDecimalObject[] => {
  const decimals: RepeatingDecimalObject[] = [];
  const uniqueDecimalObjs = getUniqueNumeratorDecimalObjects(denominator);
  for (const decimalObj of uniqueDecimalObjs) {
    const newDecimal = convertDecimalObjectToRepeatingDecimal(decimalObj);
    decimals.push(newDecimal);
  }
  return decimals;
};
