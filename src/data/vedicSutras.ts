/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VedicSutra {
  id: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  category: string;
  application: string;
  example: string;
  interactiveKey?: string;
}

export const SIXTEEN_SUTRAS: VedicSutra[] = [
  {
    id: 1,
    sanskrit: 'एकाधिकेन पूर्वेण',
    transliteration: 'Ekadhikena Purvena',
    english: 'By one more than the previous one',
    category: 'Squaring & Series',
    application: 'Instant squaring of numbers ending in 5, complementary units multiplication, repeating decimals for 1/19, 1/29.',
    example: '85² = (8×9)|25 = 7,225; 43 × 47 = (4×5)|(3×7) = 2,021',
    interactiveKey: 'ekadhikena',
  },
  {
    id: 2,
    sanskrit: 'निखिलं नवतश्चरमं दशतः',
    transliteration: 'Nikhilam Navatashcaramam Dashatah',
    english: 'All from 9 and the last from 10',
    category: 'Subtraction & Base Multiplication',
    application: 'Instant subtraction from powers of 10 without borrowing; fast multiplication of numbers near bases 10, 100, 1000.',
    example: '10,000 − 4,672 = 5,328; 96 × 92 (Base 100): (96−8)|(4×8) = 8,832',
    interactiveKey: 'nikhilam',
  },
  {
    id: 3,
    sanskrit: 'ऊर्ध्वतिर्यग्भ्याम्',
    transliteration: 'Urdhva Tiryagbhyam',
    english: 'Vertically and crosswise',
    category: 'Universal Multiplication',
    application: 'Universal 1-line multiplication for any 2×2, 3×3, or polynomial product without scratch lines.',
    example: '43 × 21 = (4×2)|(4×1 + 3×2)|(3×1) = 8 | 10 | 3 = 903',
    interactiveKey: 'urdhva',
  },
  {
    id: 4,
    sanskrit: 'परावर्त्य योजयेत्',
    transliteration: 'Paravartya Yojayet',
    english: 'Transpose and apply',
    category: 'Division & Algebra',
    application: 'Division when divisor is slightly above base (e.g., 112, 103) and solving linear and polynomial equations.',
    example: 'Divide by 112: transpose +12 to -1 -2 and compute synthetic remainder column.',
    interactiveKey: 'paravartya',
  },
  {
    id: 5,
    sanskrit: 'शून्यं साम्यसमुच्चये',
    transliteration: 'Shunyam Samyasamuccaye',
    english: 'When the sum is the same, that sum is zero',
    category: 'Algebraic Simplification',
    application: 'Instant solution of symmetric algebraic equations without expanding brackets.',
    example: 'If (x+1) + (x+2) = (x+3) + (x+0), sum of independent terms balance, yields x = 0.',
  },
  {
    id: 6,
    sanskrit: 'आनुरूप्ये शून्यमन्यत्',
    transliteration: 'Anurupye Shunyamanyat',
    english: 'If one is in ratio, the other is zero',
    category: 'Simultaneous Equations',
    application: 'Solving simultaneous linear equations where one variable\'s coefficients are proportional to constant terms.',
    example: 'In 3x + 7y = 21 and 6x + 5y = 42: x coefficients ratio is 3:6 = 1:2 = 21:42, so y = 0.',
  },
  {
    id: 7,
    sanskrit: 'संकलनव्यवकलनाभ्याम्',
    transliteration: 'Sankalana-Vyavakalanabhyam',
    english: 'By addition and by subtraction',
    category: 'Symmetric Systems',
    application: 'Solving symmetric systems (ax + by = p, bx + ay = q) in two simple mental operations.',
    example: '31x + 23y = 85 and 23x + 31y = 77: Add -> 54(x+y)=162 => x+y=3; Subtract -> 8(x-y)=8 => x-y=1.',
  },
  {
    id: 8,
    sanskrit: 'पूरणापूरणाभ्याम्',
    transliteration: 'Puranapuranabhyam',
    english: 'By the completion or non-completion',
    category: 'Complements & Roots',
    application: 'Completing the square or cube; mental summation by completing to nearest decade/hundred.',
    example: 'Mental addition: 47 + 38 = (47 + 3) + 35 = 50 + 35 = 85.',
  },
  {
    id: 9,
    sanskrit: 'चलनकलनाभ्याम्',
    transliteration: 'Chalana-Kalanabhyam',
    english: 'Differences and similarities',
    category: 'Calculus & Roots',
    application: 'Factorizing quadratic and cubic expressions; finding roots via differential calculus analogues.',
    example: '7x² - 11x - 6 = 0: derive first differential 14x - 11 = ±√(121 - 4(7)(-6)).',
  },
  {
    id: 10,
    sanskrit: 'यावदूनम्',
    transliteration: 'Yaavadunam',
    english: 'Whatever the extent of its deficiency',
    category: 'Base Squaring',
    application: 'Instant squaring and cubing of numbers near a power of 10 in 2 seconds.',
    example: '94² (d = −6): (94−6)|(−6)² = 88 | 36 = 8,836; 108² = (108+8)|8² = 11,664',
    interactiveKey: 'yaavadunam',
  },
  {
    id: 11,
    sanskrit: 'व्यष्टिसमष्टिः',
    transliteration: 'Vyashtisamanstih',
    english: 'Part and whole',
    category: 'Averages & Factors',
    application: 'Finding weighted averages using deviations from an assumed mean; factoring polynomials.',
    example: 'Assumed mean deviation method for rapid group averages.',
  },
  {
    id: 12,
    sanskrit: 'शेषाण्यङ्केन चरमेण',
    transliteration: 'Sheshanyankena Charamena',
    english: 'The remainders by the last digit',
    category: 'Repeating Decimals',
    application: 'Converting fractions into exact repeating decimals digit-by-digit.',
    example: 'Expressing 1/7, 1/13, 1/19 directly via remainder chain.',
  },
  {
    id: 13,
    sanskrit: 'सोपान्त्यद्वयमन्त्यम्',
    transliteration: 'Sopantyadvayamantyam',
    english: 'The ultimate and twice the penultimate',
    category: 'Reciprocal Equations',
    application: 'Solving special reciprocal fraction equations in one inspection step.',
    example: '1/(x+2) + 1/(x+3) = 1/(x+1) + 1/(x+4) => inspection yields symmetric root.',
  },
  {
    id: 14,
    sanskrit: 'एकन्यूनेन पूर्वेण',
    transliteration: 'Ekanyunena Purvena',
    english: 'By one less than the previous one',
    category: 'Strings of 9s',
    application: 'Instant multiplication of any number by strings of 9s (99, 999, 9999).',
    example: '73 × 99 = (73−1)|(99−72) = 72 | 27 = 7,227; 642 × 999 = 641,358',
    interactiveKey: 'ekanyunena',
  },
  {
    id: 15,
    sanskrit: 'गुणितसमुच्चयः',
    transliteration: 'Gunitasamuchyah',
    english: 'The product of the sum is equal to the sum of the product',
    category: 'Algebraic Verification',
    application: 'Verifying factorization and polynomial expansions via coefficient sums.',
    example: 'In (x+2)(x+3) = x²+5x+6: For x=1, (3)(4) = 12 = 1+5+6 = 12.',
  },
  {
    id: 16,
    sanskrit: 'गुणकसमुच्चयः',
    transliteration: 'Gunakasamuchyah',
    english: 'The factors of the sum is equal to the sum of the factors',
    category: 'Digital Root Audit',
    application: 'Checking algebraic expansions and digital root (Beejank) modular 9 verification.',
    example: 'Digital root casting-out-9s audit: DR(A × B) = DR(DR(A) × DR(B)).',
    interactiveKey: 'beejank',
  },
];

export interface SubSutra {
  id: number;
  sanskrit: string;
  transliteration: string;
  english: string;
  application: string;
}

export const THIRTEEN_SUB_SUTRAS: SubSutra[] = [
  { id: 1, sanskrit: 'आनुरूप्येण', transliteration: 'Anurupyena', english: 'Proportionately', application: 'Sub-base multiplication (e.g., base 50 as 100/2, base 200 as 100×2).' },
  { id: 2, sanskrit: 'शिष्यते शेषसंज्ञः', transliteration: 'Sisyate Sesasamjnah', english: 'The remainder remains a constant', application: 'Finding modulo remainders and cyclic division patterns.' },
  { id: 3, sanskrit: 'आद्यमाद्येनान्त्यमन्त्येन', transliteration: 'Adyamadyenantyamantyena', english: 'First by first and last by last', application: 'Determining first and last terms of quadratic equations and square roots.' },
  { id: 4, sanskrit: 'केवलैः सप्तकं गुण्यात्', transliteration: 'Kevalaih Saptakam Gunyat', english: 'For 7 the multiplicand is 143', application: 'Decimal expansions of 1/7 and related cyclic periods.' },
  { id: 5, sanskrit: 'वेष्टनम्', transliteration: 'Vestanam', english: 'By osculation', application: 'High-speed divisibility testing for primes using positive (+4 for 13) and negative (-2 for 7) osculators.' },
  { id: 6, sanskrit: 'यावदूनं तावदूनम्', transliteration: 'Yavadunam Tavadunam', english: 'Lessen by the deficiency', application: 'Cubing numbers near powers of 10.' },
  { id: 7, sanskrit: 'यावदूनं तावदूनीकृत्य वर्गं च योजयेत्', transliteration: 'Yavadunam Tavadunikritya Varganca Yojayet', english: 'Lessen by deficiency and set up the square', application: 'The classic Yaavadunam base squaring rule.' },
  { id: 8, sanskrit: 'अन्त्ययोर्दशकेऽपि', transliteration: 'Antyayordashake\'pi', english: 'When the sum of final digits is 10 and tens match', application: 'Fast multiplication: e.g., 43 × 47 = 2021, 72 × 78 = 5616.' },
  { id: 9, sanskrit: 'अन्त्ययोरेव', transliteration: 'Antyayoreva', english: 'Only the last terms', application: 'Evaluating end terms in simultaneous rational equations.' },
  { id: 10, sanskrit: 'समुच्चयगुणितः', transliteration: 'Samuccayagunitah', english: 'The sum of the coefficients into the product', application: 'Co-factor analysis in higher-order determinants and polynomials.' },
  { id: 11, sanskrit: 'लोपनस्थापनाभ्याम्', transliteration: 'Lopanasthapanabhyam', english: 'By elimination and retention', application: 'Factoring multi-variable homogeneous expressions.' },
  { id: 12, sanskrit: 'विलोकनम्', transliteration: 'Vilokanam', english: 'By mere observation (Inspection)', application: 'Exact mental square root and cube root extraction for perfect powers.' },
  { id: 13, sanskrit: 'गुणितसमुच्चयः समुच्चयगुणितः', transliteration: 'Gunitasamuccayah Samuccayagunitah', english: 'Product of sum is sum of products', application: 'Cross-verifying polynomial factorizations.' },
];
