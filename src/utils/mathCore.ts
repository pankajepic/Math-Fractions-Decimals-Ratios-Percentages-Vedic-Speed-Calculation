/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Core GCD and LCM algorithms
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round(a * b)) / gcd(a, b);
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) throw new Error('Denominator cannot be zero');
  const divisor = gcd(num, den);
  const sign = den < 0 ? -1 : 1;
  return {
    num: (sign * num) / divisor,
    den: Math.abs(den) / divisor,
  };
}

export function toMixedNumber(num: number, den: number): { whole: number; remainder: number; den: number; text: string } {
  const { num: sNum, den: sDen } = simplifyFraction(num, den);
  const whole = Math.floor(Math.abs(sNum) / sDen);
  const remainder = Math.abs(sNum) % sDen;
  const isNegative = sNum < 0;

  let text = '';
  if (remainder === 0) {
    text = `${isNegative ? '-' : ''}${whole}`;
  } else if (whole === 0) {
    text = `${isNegative ? '-' : ''}${remainder}/${sDen}`;
  } else {
    text = `${isNegative ? '-' : ''}${whole} ${remainder}/${sDen}`;
  }

  return {
    whole: isNegative ? -whole : whole,
    remainder,
    den: sDen,
    text,
  };
}

// 1. Butterfly Cross-Multiplication for Addition & Subtraction
export interface ButterflyResult {
  a: number;
  b: number;
  c: number;
  d: number;
  op: '+' | '-';
  leftWing: number; // a * d
  rightWing: number; // b * c
  baseProduct: number; // b * d
  combinedWing: number; // leftWing ± rightWing
  rawNum: number;
  rawDen: number;
  simplifiedNum: number;
  simplifiedDen: number;
  mixedNumber: string;
  decimal: number;
}

export function calculateButterfly(a: number, b: number, c: number, d: number, op: '+' | '-'): ButterflyResult {
  if (b === 0 || d === 0) throw new Error('Denominators cannot be zero');
  const leftWing = a * d;
  const rightWing = b * c;
  const baseProduct = b * d;
  const combinedWing = op === '+' ? leftWing + rightWing : leftWing - rightWing;

  const simplified = simplifyFraction(combinedWing, baseProduct);
  const mixed = toMixedNumber(simplified.num, simplified.den);

  return {
    a,
    b,
    c,
    d,
    op,
    leftWing,
    rightWing,
    baseProduct,
    combinedWing,
    rawNum: combinedWing,
    rawDen: baseProduct,
    simplifiedNum: simplified.num,
    simplifiedDen: simplified.den,
    mixedNumber: mixed.text,
    decimal: Number((simplified.num / simplified.den).toFixed(6)),
  };
}

// 2. Rapid Inequality Comparison
export function compareFractions(a: number, b: number, c: number, d: number) {
  if (b === 0 || d === 0) throw new Error('Denominators cannot be zero');
  const leftProduct = a * d;
  const rightProduct = b * c;
  let symbol: '<' | '>' | '=' = '=';
  if (leftProduct > rightProduct) symbol = '>';
  else if (leftProduct < rightProduct) symbol = '<';

  return {
    a,
    b,
    c,
    d,
    leftProduct,
    rightProduct,
    symbol,
    larger: symbol === '>' ? `${a}/${b}` : symbol === '<' ? `${c}/${d}` : 'Equal',
  };
}

// 3. Keep-Change-Flip & Cross-Cancel Multiplication
export function multiplyFractionsWithCancel(a: number, b: number, c: number, d: number) {
  if (b === 0 || d === 0) throw new Error('Denominators cannot be zero');
  const gcd1 = gcd(a, d);
  const gcd2 = gcd(c, b);

  const aPrime = a / gcd1;
  const dPrime = d / gcd1;
  const cPrime = c / gcd2;
  const bPrime = b / gcd2;

  const rawNum = a * c;
  const rawDen = b * d;
  const finalSimplified = simplifyFraction(rawNum, rawDen);
  const mixed = toMixedNumber(finalSimplified.num, finalSimplified.den);

  return {
    a,
    b,
    c,
    d,
    gcdDiagonalAD: gcd1,
    gcdDiagonalCB: gcd2,
    aPrime,
    dPrime,
    cPrime,
    bPrime,
    finalNum: finalSimplified.num,
    finalDen: finalSimplified.den,
    mixedText: mixed.text,
    decimal: Number((finalSimplified.num / finalSimplified.den).toFixed(6)),
  };
}

export function divideFractionsReciprocal(a: number, b: number, c: number, d: number) {
  if (b === 0 || c === 0 || d === 0) throw new Error('Division by zero is undefined');
  // keep a/b, change ÷ to ×, flip c/d -> d/c
  const multResult = multiplyFractionsWithCancel(a, b, d, c);
  return {
    ...multResult,
    originalDivisorNum: c,
    originalDivisorDen: d,
    flippedNum: d,
    flippedDen: c,
  };
}

// 4. Split-Whole Subtraction: e.g. Whole - (subWhole + num/den)
export function splitWholeSubtract(whole: number, subWhole: number, num: number, den: number) {
  if (den === 0) throw new Error('Denominator cannot be zero');
  const borrowedWhole = whole - 1;
  const wholePart = borrowedWhole - subWhole;
  const fracNumerator = den - num;
  const simplifiedFrac = simplifyFraction(fracNumerator, den);

  return {
    whole,
    subWhole,
    num,
    den,
    borrowedSplit: `${borrowedWhole} + ${den}/${den}`,
    wholePart,
    fracPartNum: simplifiedFrac.num,
    fracPartDen: simplifiedFrac.den,
    resultText: `${wholePart} ${simplifiedFrac.num}/${simplifiedFrac.den}`,
    decimal: wholePart + simplifiedFrac.num / simplifiedFrac.den,
  };
}

// 5. Telescoping Series 1/(1*2) + 1/(2*3) + ... + 1/(n*(n+1)) = n/(n+1)
export function calculateTelescoping(n: number) {
  return {
    termsCount: n,
    formula: `1 - 1/${n + 1} = ${n}/${n + 1}`,
    numerator: n,
    denominator: n + 1,
    decimal: Number((n / (n + 1)).toFixed(6)),
  };
}

// 6. Terminating vs Repeating Decimals
export function analyzeDenominatorBase10(num: number, den: number) {
  const { num: sNum, den: sDen } = simplifyFraction(num, den);
  let tempDen = sDen;
  let count2 = 0;
  let count5 = 0;

  while (tempDen % 2 === 0 && tempDen > 0) {
    count2++;
    tempDen /= 2;
  }
  while (tempDen % 5 === 0 && tempDen > 0) {
    count5++;
    tempDen /= 5;
  }

  const isTerminating = tempDen === 1;
  const decimalPlaces = Math.max(count2, count5);

  return {
    reducedNum: sNum,
    reducedDen: sDen,
    factors2: count2,
    factors5: count5,
    remainingFactor: tempDen,
    isTerminating,
    decimalPlaces: isTerminating ? decimalPlaces : null,
    classification: isTerminating ? 'Terminating Decimal' : 'Repeating / Recurring Decimal',
    value: sNum / sDen,
  };
}

// 7. Repeating Decimal Conversion to Fraction
export function convertPureRepeating(repeatingStr: string) {
  const clean = repeatingStr.trim().replace(/^0\./, '');
  if (!clean || !/^\d+$/.test(clean)) throw new Error('Invalid repeating digits');
  const num = parseInt(clean, 10);
  const den = parseInt('9'.repeat(clean.length), 10);
  const simplified = simplifyFraction(num, den);
  return {
    repeatingStr: clean,
    num,
    den,
    simplifiedNum: simplified.num,
    simplifiedDen: simplified.den,
    text: `${simplified.num}/${simplified.den}`,
  };
}

export function convertMixedRepeating(nonRepeatingStr: string, repeatingStr: string) {
  const nr = nonRepeatingStr.trim().replace(/^0\./, '');
  const rep = repeatingStr.trim();
  if (!/^\d*$/.test(nr) || !/^\d+$/.test(rep)) throw new Error('Invalid digits');

  const fullDigitsStr = nr + rep;
  const fullVal = parseInt(fullDigitsStr, 10);
  const nonRepVal = nr.length > 0 ? parseInt(nr, 10) : 0;
  const num = fullVal - nonRepVal;

  const denStr = '9'.repeat(rep.length) + '0'.repeat(nr.length);
  const den = parseInt(denStr, 10);

  const simplified = simplifyFraction(num, den);
  return {
    nonRepeatingStr: nr,
    repeatingStr: rep,
    fullDigitsStr,
    num,
    den,
    simplifiedNum: simplified.num,
    simplifiedDen: simplified.den,
    text: `${simplified.num}/${simplified.den}`,
  };
}

// 8. The 142857 Cyclic Wheel for 1/7 to 6/7
export function getCyclicSeventh(k: number) {
  if (k < 1 || k > 6) throw new Error('k must be between 1 and 6');
  const baseDigits = [1, 4, 2, 8, 5, 7];
  const sortedDigits = [1, 2, 4, 5, 7, 8];
  const startDigit = sortedDigits[k - 1];
  const startIndex = baseDigits.indexOf(startDigit);

  const rotatedDigits: number[] = [];
  for (let i = 0; i < 6; i++) {
    rotatedDigits.push(baseDigits[(startIndex + i) % 6]);
  }
  const decimalStr = `0.${rotatedDigits.join('')}...`;
  const exactVal = k / 7;

  return {
    k,
    startDigit,
    rotatedDigits,
    decimalStr,
    exactVal,
    complementaryPairs: [
      { a: 1, b: 8, sum: 9 },
      { a: 4, b: 5, sum: 9 },
      { a: 2, b: 7, sum: 9 },
    ],
  };
}

// 9. Ratios: Partitioning & N-Bridge
export function partitionTotal(total: number, a: number, b: number) {
  const totalParts = a + b;
  const unitValue = total / totalParts;
  const shareA = unitValue * a;
  const shareB = unitValue * b;
  return {
    total,
    a,
    b,
    totalParts,
    unitValue,
    shareA,
    shareB,
  };
}

export function invertNBridgeRatio(a: number, b: number, c: number, d: number) {
  // A:B = a:b, B:C = c:d
  // N-path: a*c : b*c : b*d
  const pA = a * c;
  const pB = b * c;
  const pC = b * d;

  const commonGcd = gcd(gcd(pA, pB), pC);
  const sA = pA / commonGcd;
  const sB = pB / commonGcd;
  const sC = pC / commonGcd;

  return {
    a,
    b,
    c,
    d,
    rawA: pA,
    rawB: pB,
    rawC: pC,
    simplifiedA: sA,
    simplifiedB: sB,
    simplifiedC: sC,
    ratioText: `${sA} : ${sB} : ${sC}`,
  };
}

// 10. Componendo & Dividendo: (x+y)/(x-y) = a/b => x/y = (a+b)/(a-b)
export function calculateComponendoDividendo(a: number, b: number) {
  const num = a + b;
  const den = a - b;
  const simplified = simplifyFraction(num, den);
  return {
    a,
    b,
    rawNum: num,
    rawDen: den,
    simplifiedNum: simplified.num,
    simplifiedDen: simplified.den,
    ratioText: `${simplified.num} : ${simplified.den}`,
    fractionText: `${simplified.num}/${simplified.den}`,
  };
}

// 11. Alligation Mixture Cross-Flow
export function calculateAlligation(cheap: number, dear: number, mean: number) {
  if (mean <= cheap || mean >= dear) {
    throw new Error('Mean concentration must be strictly between Cheaper and Dearer values.');
  }
  const ratioCheapParts = dear - mean; // D - M
  const ratioDearParts = mean - cheap; // M - C
  const commonGcd = gcd(ratioCheapParts, ratioDearParts);

  const simplifiedCheap = ratioCheapParts / commonGcd;
  const simplifiedDear = ratioDearParts / commonGcd;

  return {
    cheap,
    dear,
    mean,
    diffDearMinusMean: ratioCheapParts,
    diffMeanMinusCheap: ratioDearParts,
    simplifiedCheap,
    simplifiedDear,
    ratioText: `${simplifiedCheap} : ${simplifiedDear}`,
  };
}

// 12. Percentage Master Utilities
export function commutativePercent(pct: number, val: number) {
  // x% of y = y% of x
  const result = (pct * val) / 100;
  return {
    pct,
    val,
    swappedFormula: `${val}% of ${pct}`,
    standardFormula: `${pct}% of ${val}`,
    result,
  };
}

export function successivePercentage(a: number, b: number) {
  // Net = A + B + (A*B)/100
  const productTerm = (a * b) / 100;
  const net = a + b + productTerm;
  return {
    a,
    b,
    sum: a + b,
    productTerm,
    net,
    isGain: net > 0,
    isNeutral: net === 0,
  };
}

export function productConstancy(risePctOrFractionN: number, fractionD?: number) {
  // If price rises by n/d, consumption must drop by n/(d+n)
  let n: number;
  let d: number;
  if (fractionD !== undefined) {
    n = risePctOrFractionN;
    d = fractionD;
  } else {
    // Treat as percentage e.g. 20% = 1/5
    const simp = simplifyFraction(risePctOrFractionN, 100);
    n = simp.num;
    d = simp.den;
  }

  const dropNum = n;
  const dropDen = d + n;
  const dropPct = (dropNum / dropDen) * 100;

  return {
    n,
    d,
    riseFractionText: `${n}/${d}`,
    dropFractionText: `${dropNum}/${dropDen}`,
    dropPercentage: Number(dropPct.toFixed(2)),
  };
}

// 13. Vedic Sutra 1: Ekadhikena Purvena (Squaring ending in 5 & Complementary units)
export function ekadhikenaSquare(n: number) {
  if (n % 10 !== 5) throw new Error('Number must end in 5');
  const prefix = Math.floor(n / 10);
  const left = prefix * (prefix + 1);
  const right = 25;
  const result = left * 100 + right;
  return {
    n,
    prefix,
    prefixTimesNext: left,
    suffix: right,
    result,
  };
}

export function antyayordashakeMultiply(a: number, b: number) {
  const prefixA = Math.floor(a / 10);
  const prefixB = Math.floor(b / 10);
  const unitA = a % 10;
  const unitB = b % 10;

  if (prefixA !== prefixB) {
    throw new Error('Tens prefix must match');
  }
  if (unitA + unitB !== 10) {
    throw new Error('Units digits must add up to 10');
  }

  const left = prefixA * (prefixA + 1);
  const right = unitA * unitB;
  const rightStr = right < 10 ? `0${right}` : `${right}`;
  const result = left * 100 + right;

  return {
    a,
    b,
    prefix: prefixA,
    unitA,
    unitB,
    left,
    right,
    rightStr,
    result,
  };
}

// 14. Vedic Sutra 2: Nikhilam Navatashcaramam Dashatah
export function nikhilamSubtractPowerOf10(powerOf10: number, n: number) {
  if (powerOf10 <= n) throw new Error('Power of 10 must be strictly greater than n');
  const baseLen = powerOf10.toString().length - 1;
  const nStr = n.toString().padStart(baseLen, '0');

  // Find last non-zero digit index
  let lastNonZeroIdx = nStr.length - 1;
  while (lastNonZeroIdx >= 0 && nStr[lastNonZeroIdx] === '0') {
    lastNonZeroIdx--;
  }

  const steps: { digit: number; rule: string; resultDigit: number }[] = [];
  const resultDigits: number[] = [];

  for (let i = 0; i < nStr.length; i++) {
    const d = parseInt(nStr[i], 10);
    if (i > lastNonZeroIdx) {
      steps.push({ digit: d, rule: 'Trailing zero remains 0', resultDigit: 0 });
      resultDigits.push(0);
    } else if (i === lastNonZeroIdx) {
      const sub = 10 - d;
      steps.push({ digit: d, rule: `Last non-zero: 10 - ${d} = ${sub}`, resultDigit: sub });
      resultDigits.push(sub);
    } else {
      const sub = 9 - d;
      steps.push({ digit: d, rule: `All from 9: 9 - ${d} = ${sub}`, resultDigit: sub });
      resultDigits.push(sub);
    }
  }

  const result = parseInt(resultDigits.join(''), 10);
  return {
    powerOf10,
    n,
    nStr,
    steps,
    result,
  };
}

// Nikhilam Base Multiplication (Base 100 or Base 1000)
export function nikhilamBaseMultiply(a: number, b: number, base: 100 | 1000 = 100) {
  const defA = a - base;
  const defB = b - base;
  const numDigitsRight = base === 100 ? 2 : 3;

  // LHS = cross combine: a + defB or b + defA
  const lhs = a + defB;
  const rhsRaw = defA * defB;

  let finalResult = 0;
  let formattedLhs = lhs;
  let formattedRhs = '';
  let note = '';

  if (rhsRaw >= 0) {
    // Both below or both above base
    const rhsPadded = rhsRaw.toString().padStart(numDigitsRight, '0');
    finalResult = lhs * base + rhsRaw;
    formattedRhs = rhsPadded;
  } else {
    // Mixed: one above, one below -> borrow 1 from LHS
    formattedLhs = lhs - 1;
    const borrowedVal = base + rhsRaw;
    formattedRhs = borrowedVal.toString().padStart(numDigitsRight, '0');
    finalResult = formattedLhs * base + borrowedVal;
    note = `Negative RHS product (${rhsRaw}): Borrow 1 base unit (${base}) from LHS -> LHS becomes ${formattedLhs}, RHS becomes ${base} + (${rhsRaw}) = ${borrowedVal}`;
  }

  return {
    a,
    b,
    base,
    defA,
    defB,
    rawLhs: lhs,
    rawRhs: rhsRaw,
    formattedLhs,
    formattedRhs,
    finalResult,
    note,
  };
}

// 15. Vedic Sutra 3: Urdhva Tiryagbhyam (2x2 and 3x3)
export function urdhva2x2(a: number, b: number) {
  if (a < 10 || a > 99 || b < 10 || b > 99) throw new Error('Inputs must be 2-digit numbers');
  const a1 = Math.floor(a / 10);
  const a0 = a % 10;
  const b1 = Math.floor(b / 10);
  const b0 = b % 10;

  // Frame 1: Left Vertical
  const f1 = a1 * b1;
  // Frame 2: Crosswise Sum
  const f2 = a1 * b0 + a0 * b1;
  // Frame 3: Right Vertical
  const f3 = a0 * b0;

  // Combining with carries
  const unitDigit = f3 % 10;
  const carry1 = Math.floor(f3 / 10);

  const tensVal = f2 + carry1;
  const tensDigit = tensVal % 10;
  const carry2 = Math.floor(tensVal / 10);

  const hundredsVal = f1 + carry2;

  const finalResult = a * b;

  return {
    a,
    b,
    digitsA: [a1, a0],
    digitsB: [b1, b0],
    f1,
    f2,
    f3,
    intermediate: `${f1} | ${f2} | ${f3}`,
    finalResult,
    stepDetails: [
      { step: 1, name: 'Left Vertical', formula: `${a1} × ${b1}`, value: f1 },
      { step: 2, name: 'Crosswise Sum', formula: `(${a1} × ${b0}) + (${a0} × ${b1}) = ${a1 * b0} + ${a0 * b1}`, value: f2 },
      { step: 3, name: 'Right Vertical', formula: `${a0} × ${b0}`, value: f3 },
    ],
  };
}

export function urdhva3x3(a: number, b: number) {
  if (a < 100 || a > 999 || b < 100 || b > 999) throw new Error('Inputs must be 3-digit numbers');
  const [a2, a1, a0] = a.toString().split('').map(Number);
  const [b2, b1, b0] = b.toString().split('').map(Number);

  // Frame 1: Left Vertical
  const f1 = a2 * b2;
  // Frame 2: Left Cross
  const f2 = a2 * b1 + a1 * b2;
  // Frame 3: 3-Way Star Pattern
  const f3 = a2 * b0 + a0 * b2 + a1 * b1;
  // Frame 4: Right Cross
  const f4 = a1 * b0 + a0 * b1;
  // Frame 5: Right Vertical
  const f5 = a0 * b0;

  const finalResult = a * b;

  return {
    a,
    b,
    digitsA: [a2, a1, a0],
    digitsB: [b2, b1, b0],
    f1,
    f2,
    f3,
    f4,
    f5,
    intermediate: `${f1} | ${f2} | ${f3} | ${f4} | ${f5}`,
    finalResult,
    stepDetails: [
      { step: 1, name: 'Left Vertical', formula: `${a2} × ${b2}`, value: f1 },
      { step: 2, name: 'Left Cross (2x2)', formula: `(${a2}×${b1}) + (${a1}×${b2})`, value: f2 },
      { step: 3, name: '3-Way Star (Center)', formula: `(${a2}×${b0}) + (${a0}×${b2}) + (${a1}×${b1})`, value: f3 },
      { step: 4, name: 'Right Cross (2x2)', formula: `(${a1}×${b0}) + (${a0}×${b1})`, value: f4 },
      { step: 5, name: 'Right Vertical', formula: `${a0} × ${b0}`, value: f5 },
    ],
  };
}

// 16. Vedic Sutra 14: Ekanyunena Purvena (Multiplication by strings of 9s)
export function ekanyunenaMultiply9s(n: number, numNines: number) {
  const lhs = n - 1;
  const ninesVal = Math.pow(10, numNines) - 1;
  const rhs = ninesVal - lhs;
  const rhsPadded = rhs.toString().padStart(numNines, '0');
  const result = n * ninesVal;

  return {
    n,
    numNines,
    lhs,
    rhs: rhsPadded,
    result,
  };
}

// 17. Sliding Window Multiplication by 11
export function multiplyBy11Sliding(n: number) {
  const s = n.toString();
  const digits = s.split('').map(Number);
  const parts: number[] = [];

  // Right to left neighbor addition
  // Last digit remains
  // Sum adjacent pairs
  // First digit
  for (let i = digits.length - 1; i >= 0; i--) {
    if (i === digits.length - 1) {
      parts.push(digits[i]);
    } else {
      parts.push(digits[i] + digits[i + 1]);
    }
  }
  parts.push(digits[0]); // outer left

  const finalResult = n * 11;
  return {
    n,
    digits,
    finalResult,
    explanation: `${digits[0]} | ` + digits.slice(0, -1).map((d, i) => `(${d}+${digits[i + 1]})`).join(' | ') + ` | ${digits[digits.length - 1]}`,
  };
}

// 18. Yaavadunam Base Squaring (e.g. 96^2 or 108^2)
export function yaavadunamSquare(n: number, base: 100 | 1000 = 100) {
  const deviation = n - base;
  const lhs = n + deviation;
  const rhs = Math.pow(deviation, 2);
  const numDigitsRight = base === 100 ? 2 : 3;
  const rhsPadded = rhs.toString().padStart(numDigitsRight, '0');
  const result = Math.pow(n, 2);

  return {
    n,
    base,
    deviation,
    lhs,
    rhs,
    rhsPadded,
    result,
  };
}

// 19. Duplex Squaring (D-Method) for 2 digits: (ab)^2 = a^2 | 2ab | b^2
export function duplexSquare2Digit(n: number) {
  if (n < 10 || n > 99) throw new Error('Input must be a 2-digit number');
  const a = Math.floor(n / 10);
  const b = n % 10;

  const d1 = Math.pow(a, 2);
  const d2 = 2 * a * b;
  const d3 = Math.pow(b, 2);

  const result = Math.pow(n, 2);

  return {
    n,
    a,
    b,
    d1,
    d2,
    d3,
    intermediate: `${d1} | ${d2} | ${d3}`,
    result,
  };
}

// 20. Exact Mental Cube Root of 4 to 6-digit perfect cubes
export function exactMentalCubeRoot(cube: number) {
  if (cube < 1000 || cube > 1000000) throw new Error('Cube must be between 1,000 and 1,000,000');
  const cubeStr = cube.toString();
  const last3 = cubeStr.slice(-3);
  const prefix = parseInt(cubeStr.slice(0, -3), 10);
  const lastDigit = parseInt(cubeStr.slice(-1), 10);

  // Cube unit digit is 1-to-1 bijection:
  // 0->0, 1->1, 2->8, 3->7, 4->4, 5->5, 6->6, 7->3, 8->2, 9->9
  const unitMap: Record<number, number> = {
    0: 0,
    1: 1,
    2: 8,
    3: 7,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 2,
    9: 9,
  };
  const unitRoot = unitMap[lastDigit];

  // Find tens root: largest k such that k^3 <= prefix
  let tensRoot = 0;
  for (let k = 1; k <= 9; k++) {
    if (k * k * k <= prefix) {
      tensRoot = k;
    } else {
      break;
    }
  }

  const root = tensRoot * 10 + unitRoot;
  const isExactCube = root * root * root === cube;

  return {
    cube,
    prefix,
    last3,
    lastDigit,
    unitRoot,
    tensRoot,
    tensLowerBoundCube: Math.pow(tensRoot, 3),
    tensUpperBoundCube: Math.pow(tensRoot + 1, 3),
    root,
    isExactCube,
  };
}

// 21. Beejank / Digital Root Check
export function digitalRoot(n: number): number {
  let val = Math.abs(Math.round(n));
  if (val === 0) return 0;
  const rem = val % 9;
  return rem === 0 ? 9 : rem;
}

export function verifyBeejankMultiplication(a: number, b: number, product: number) {
  const drA = digitalRoot(a);
  const drB = digitalRoot(b);
  const drProductOfRoots = digitalRoot(drA * drB);
  const drActualProduct = digitalRoot(product);
  const isValid = drProductOfRoots === drActualProduct;

  return {
    a,
    b,
    product,
    drA,
    drB,
    drProductOfRoots,
    drActualProduct,
    isValid,
  };
}

// 22. Divisibility Diagnostic Matrix (2 through 13)
export function checkDivisibility(n: number) {
  const absN = Math.abs(n);
  const s = absN.toString();
  const digits = s.split('').map(Number);
  const lastDigit = digits[digits.length - 1];
  const last2Digits = absN % 100;
  const last3Digits = absN % 1000;
  const digitSum = digits.reduce((acc, d) => acc + d, 0);

  // Rule 7 Osculator: Prefix - 2 * Unit
  const prefix7 = Math.floor(absN / 10);
  const osculator7 = prefix7 - 2 * lastDigit;

  // Rule 11: Alternating sum of digits
  let altSum = 0;
  for (let i = 0; i < digits.length; i++) {
    altSum += (digits.length - 1 - i) % 2 === 0 ? digits[i] : -digits[i];
  }

  // Rule 13 Osculator: Prefix + 4 * Unit
  const prefix13 = Math.floor(absN / 10);
  const osculator13 = prefix13 + 4 * lastDigit;

  return [
    { divisor: 2, passed: absN % 2 === 0, rule: 'Ends in even digit (0, 2, 4, 6, 8)', check: `Last digit is ${lastDigit}` },
    { divisor: 3, passed: absN % 3 === 0, rule: 'Sum of digits is multiple of 3', check: `Digit sum = ${digitSum} (${digitSum % 3 === 0 ? 'divisible by 3' : 'not divisible'})` },
    { divisor: 4, passed: absN % 4 === 0, rule: 'Last 2 digits divisible by 4', check: `Last 2 digits = ${last2Digits} (${last2Digits % 4 === 0 ? 'divisible' : 'not divisible'})` },
    { divisor: 5, passed: absN % 5 === 0, rule: 'Ends in 0 or 5', check: `Last digit is ${lastDigit}` },
    { divisor: 6, passed: absN % 6 === 0, rule: 'Divisible by both 2 and 3', check: `Passes 2: ${absN % 2 === 0}, Passes 3: ${absN % 3 === 0}` },
    { divisor: 7, passed: absN % 7 === 0, rule: 'Negative Osculator: Prefix - 2 × Unit is divisible by 7', check: `${prefix7} - 2(${lastDigit}) = ${osculator7}` },
    { divisor: 8, passed: absN % 8 === 0, rule: 'Last 3 digits divisible by 8', check: `Last 3 digits = ${last3Digits} (${last3Digits % 8 === 0 ? 'divisible' : 'not divisible'})` },
    { divisor: 9, passed: absN % 9 === 0, rule: 'Sum of digits is multiple of 9', check: `Digit sum = ${digitSum}` },
    { divisor: 10, passed: absN % 10 === 0, rule: 'Ends in 0', check: `Last digit is ${lastDigit}` },
    { divisor: 11, passed: absN % 11 === 0, rule: 'Alternating sum of odd/even digits is 0 or multiple of 11', check: `Alternating diff = ${altSum}` },
    { divisor: 12, passed: absN % 12 === 0, rule: 'Divisible by coprime pair 3 and 4', check: `Passes 3: ${absN % 3 === 0}, Passes 4: ${absN % 4 === 0}` },
    { divisor: 13, passed: absN % 13 === 0, rule: 'Positive Osculator: Prefix + 4 × Unit is divisible by 13', check: `${prefix13} + 4(${lastDigit}) = ${osculator13}` },
  ];
}
