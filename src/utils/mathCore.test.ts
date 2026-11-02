/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateButterfly,
  compareFractions,
  divideFractionsReciprocal,
  splitWholeSubtract,
  calculateTelescoping,
  convertPureRepeating,
  convertMixedRepeating,
  getCyclicSeventh,
  partitionTotal,
  invertNBridgeRatio,
  calculateComponendoDividendo,
  calculateAlligation,
  commutativePercent,
  successivePercentage,
  productConstancy,
  ekadhikenaSquare,
  antyayordashakeMultiply,
  nikhilamSubtractPowerOf10,
  nikhilamBaseMultiply,
  urdhva2x2,
  urdhva3x3,
  ekanyunenaMultiply9s,
  multiplyBy11Sliding,
  yaavadunamSquare,
  duplexSquare2Digit,
  exactMentalCubeRoot,
  digitalRoot,
  verifyBeejankMultiplication,
  checkDivisibility,
} from './mathCore';

test('Fractions: Butterfly addition for 4/7 + 3/8 = 53/56 (Problem P1)', () => {
  const res = calculateButterfly(4, 7, 3, 8, '+');
  assert.equal(res.leftWing, 32);
  assert.equal(res.rightWing, 21);
  assert.equal(res.baseProduct, 56);
  assert.equal(res.simplifiedNum, 53);
  assert.equal(res.simplifiedDen, 56);
});

test('Fractions: Reciprocal division for (14/25) ÷ (7/15) = 6/5 = 1 1/5 (Problem P2)', () => {
  const res = divideFractionsReciprocal(14, 25, 7, 15);
  assert.equal(res.finalNum, 6);
  assert.equal(res.finalDen, 5);
  assert.equal(res.mixedText, '1 1/5');
});

test('Fractions: Compare 9/13 vs 11/16 (Problem P3)', () => {
  const res = compareFractions(9, 13, 11, 16);
  assert.equal(res.leftProduct, 144);
  assert.equal(res.rightProduct, 143);
  assert.equal(res.symbol, '>');
});

test('Decimals: Pure repeating 0.363636... = 4/11 (Problem P4)', () => {
  const res = convertPureRepeating('36');
  assert.equal(res.simplifiedNum, 4);
  assert.equal(res.simplifiedDen, 11);
});

test('Decimals: Mixed repeating 0.4666... = 7/15 (Problem P5)', () => {
  const res = convertMixedRepeating('4', '6');
  assert.equal(res.simplifiedNum, 7);
  assert.equal(res.simplifiedDen, 15);
});

test('Decimals: Mixed repeating 0.4363636... = 24/55 (Workbook Drill 04)', () => {
  const res = convertMixedRepeating('4', '36');
  assert.equal(res.simplifiedNum, 24);
  assert.equal(res.simplifiedDen, 55);
});

test('Decimals: Cyclic Seventh Wheel for 5/7 (Workbook Drill 05)', () => {
  const res = getCyclicSeventh(5);
  assert.equal(res.startDigit, 7);
  assert.deepEqual(res.rotatedDigits, [7, 1, 4, 2, 8, 5]);
});

test('Ratios: Inverted N-Bridge for A:B = 3:4 and B:C = 6:7 = 9:12:14 (Problem P7)', () => {
  const res = invertNBridgeRatio(3, 4, 6, 7);
  assert.equal(res.simplifiedA, 9);
  assert.equal(res.simplifiedB, 12);
  assert.equal(res.simplifiedC, 14);
});

test('Ratios: Alligation mixture for 12% and 32% to get 20% = 3:2 (Problem P8)', () => {
  const res = calculateAlligation(12, 32, 20);
  assert.equal(res.simplifiedCheap, 3);
  assert.equal(res.simplifiedDear, 2);
});

test('Percentages: Successive +25% then -20% = 0% net (Problem P10)', () => {
  const res = successivePercentage(25, -20);
  assert.equal(res.net, 0);
});

test('Percentages: Golden Commutative Law 72% of 12.5 = 12.5% of 72 = 9 (Workbook Drill 07)', () => {
  const res = commutativePercent(72, 12.5);
  assert.equal(res.result, 9);
});

test('Vedic: Ekadhikena 95^2 = 9025 & Antyayordashake 72 * 78 = 5616 (Problem P11)', () => {
  const sq = ekadhikenaSquare(95);
  assert.equal(sq.result, 9025);
  const mul = antyayordashakeMultiply(72, 78);
  assert.equal(mul.result, 5616);
});

test('Vedic: Nikhilam Base-100 multiplication 93 * 96 = 8928 & 106 * 109 = 11554 (Problem P12)', () => {
  const resBelow = nikhilamBaseMultiply(93, 96, 100);
  assert.equal(resBelow.finalResult, 8928);
  const resAbove = nikhilamBaseMultiply(106, 109, 100);
  assert.equal(resAbove.finalResult, 11554);
});

test('Vedic: Urdhva Tiryagbhyam 2x2 34 * 52 = 1768 (Problem P13)', () => {
  const res = urdhva2x2(34, 52);
  assert.equal(res.finalResult, 1768);
});

test('Vedic: Nikhilam Subtraction 10,000 - 6,483 = 3,517 & 100,000 - 64,283 = 35,717', () => {
  const sub1 = nikhilamSubtractPowerOf10(10000, 6483);
  assert.equal(sub1.result, 3517);
  const sub2 = nikhilamSubtractPowerOf10(100000, 64283);
  assert.equal(sub2.result, 35717);
});

test('Vedic: Ekanyunena 584 * 999 = 583416 (Problem P14)', () => {
  const res = ekanyunenaMultiply9s(584, 3);
  assert.equal(res.result, 583416);
});

test('Vedic: Yaavadunam 988^2 (Base 1000) = 976,144 (Problem P15)', () => {
  const res = yaavadunamSquare(988, 1000);
  assert.equal(res.result, 976144);
});

test('Vedic: Exact Cube Root ∛389017 = 73 (Workbook Drill 24)', () => {
  const res = exactMentalCubeRoot(389017);
  assert.equal(res.root, 73);
  assert.equal(res.isExactCube, true);
});

test('Telescoping Series 49 terms = 49/50 (Workbook Drill 25)', () => {
  const res = calculateTelescoping(49);
  assert.equal(res.numerator, 49);
  assert.equal(res.denominator, 50);
});

test('Fractions: Split-whole subtraction 500 - 142 7/19 = 357 12/19 (Workbook Drill 02)', () => {
  const res = splitWholeSubtract(500, 142, 7, 19);
  assert.equal(res.resultText, '357 12/19');
});

test('Componendo & Dividendo: (x+y)/(x-y) = 13/5 => x:y = 9:4 (Workbook Drill 09)', () => {
  const res = calculateComponendoDividendo(13, 5);
  assert.equal(res.ratioText, '9 : 4');
});

test('Product Constancy: Price +20% requires consumption drop of 16.67% (Workbook Drill 11)', () => {
  const res = productConstancy(20);
  assert.equal(res.dropPercentage, 16.67);
});

test('Sliding 11: 6274 * 11 = 69014 (Workbook Drill 20)', () => {
  const res = multiplyBy11Sliding(6274);
  assert.equal(res.finalResult, 69014);
});

test('Beejank Digital Root Product Verification', () => {
  const res = verifyBeejankMultiplication(43, 26, 1118);
  assert.equal(res.isValid, true);
});
