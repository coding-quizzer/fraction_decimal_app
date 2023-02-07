import {
  convertFractionToRepeatingDecimal,
  generateDecimalExpansion,
  DecimalExpansionObject,
  getUniqueNumeratorDecimalObjects,
  getUniqueDecimals,
} from "./fractionDecimalFunctions";

describe(generateDecimalExpansion, () => {
  it("Returns object representation of 0.25 when fraction is 1/4", () => {
    const expectedResult: DecimalExpansionObject = {
      decimal: [
        {
          baseNumerator: 1,
          quotient: 2,
        },
        {
          baseNumerator: 2,
          quotient: 5,
        },
      ],
      repeatBeginIndex: null,
    };

    expect(generateDecimalExpansion([1, 4])).toStrictEqual(expectedResult);
  });

  it("Returns object representation of 0.222... when fraction is 2/9", () => {
    const expectedResult: DecimalExpansionObject = {
      decimal: [
        {
          baseNumerator: 2,
          quotient: 2,
        },
      ],
      repeatBeginIndex: 0,
    };
    expect(generateDecimalExpansion([2, 9])).toStrictEqual(expectedResult);
  });
});

describe(convertFractionToRepeatingDecimal, () => {
  it("Returns an array of decimal objects representing 0.25 when for the decimal expansion object representing 1/4", () => {
    expect(convertFractionToRepeatingDecimal([1, 4])).toStrictEqual({
      nonRepeatingDigits: [
        {
          baseNumerator: 1,
          quotient: 2,
        },
        {
          baseNumerator: 2,
          quotient: 5,
        },
      ],
    });
  });

  it("Returns an array of decimal objects representing 0.222... when for the decimal expansion object representing 2/9", () => {
    expect(convertFractionToRepeatingDecimal([2, 9])).toStrictEqual({
      repeatingDigits: [
        {
          baseNumerator: 2,
          quotient: 2,
        },
      ],
    });
  });

  it("Returns an array of decimal objects representing 0.0111... when for the decimal expansion object representing 1/9", () => {
    expect(convertFractionToRepeatingDecimal([1, 90])).toStrictEqual({
      nonRepeatingDigits: [
        {
          baseNumerator: 1,
          quotient: 0,
        },
      ],
      repeatingDigits: [
        {
          baseNumerator: 10,
          quotient: 1,
        },
      ],
    });
  });
});

describe(getUniqueNumeratorDecimalObjects, () => {
  it("Returns all 4 unique decimal objects when denominator is 5", () => {
    const expected: DecimalExpansionObject[] = [
      {
        decimal: [
          {
            baseNumerator: 1,
            quotient: 2,
          },
        ],
        repeatBeginIndex: null,
      },
      {
        decimal: [
          {
            baseNumerator: 2,
            quotient: 4,
          },
        ],
        repeatBeginIndex: null,
      },
      {
        decimal: [
          {
            baseNumerator: 3,
            quotient: 6,
          },
        ],
        repeatBeginIndex: null,
      },
      {
        decimal: [
          {
            baseNumerator: 4,
            quotient: 8,
          },
        ],
        repeatBeginIndex: null,
      },
    ];
    expect(getUniqueNumeratorDecimalObjects(5)).toStrictEqual(expected);
  });
  it("Returns the one unique decimal object when denomenator is 7", () => {
    const expected: DecimalExpansionObject[] = [
      {
        decimal: [
          {
            baseNumerator: 1,
            quotient: 1,
          },
          {
            baseNumerator: 3,
            quotient: 4,
          },
          {
            baseNumerator: 2,
            quotient: 2,
          },
          {
            baseNumerator: 6,
            quotient: 8,
          },
          {
            baseNumerator: 4,
            quotient: 5,
          },
          {
            baseNumerator: 5,
            quotient: 7,
          },
        ],
        repeatBeginIndex: 0,
      },
    ];

    expect(getUniqueNumeratorDecimalObjects(7)).toStrictEqual(expected);
  });
});

describe(getUniqueDecimals, () => {
  it("Returns the decimals for 5", () => {
    expect(getUniqueDecimals(5)).toStrictEqual([
      {
        nonRepeatingDigits: [
          {
            baseNumerator: 1,
            quotient: 2,
          },
        ],
      },
      {
        nonRepeatingDigits: [
          {
            baseNumerator: 2,
            quotient: 4,
          },
        ],
      },
      {
        nonRepeatingDigits: [
          {
            baseNumerator: 3,
            quotient: 6,
          },
        ],
      },
      {
        nonRepeatingDigits: [
          {
            baseNumerator: 4,
            quotient: 8,
          },
        ],
      },
    ]);
  });

  it("Returns the decimal for 7", () => {
    expect(getUniqueDecimals(7)).toStrictEqual([
      {
        repeatingDigits: [
          {
            baseNumerator: 1,
            quotient: 1,
          },
          {
            baseNumerator: 3,
            quotient: 4,
          },
          {
            baseNumerator: 2,
            quotient: 2,
          },
          {
            baseNumerator: 6,
            quotient: 8,
          },
          {
            baseNumerator: 4,
            quotient: 5,
          },
          {
            baseNumerator: 5,
            quotient: 7,
          },
        ],
      },
    ]);
  });
});
