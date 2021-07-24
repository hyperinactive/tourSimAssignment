/**
 * Proverava da li je unos pozitivan ceo broj
 *
 * @param {number} number broj za validaciju
 * @param {string} [desc=''] opis unosa
 * @throws kada unos nije broj, negativan ili nije ceo
 * @return {number} validan unos
 */
const safeInt = (number, desc = '') => {
  if (
    typeof number === 'number' &&
    number > 0 &&
    Math.floor(number) === number
  ) {
    return number;
  }
  throw new Error(
    `${
      desc === '' ? 'Unos' : desc.charAt(0).toUpperCase() + desc.slice(1) // prvo veliko
    } nije pozitivan ceo broj`
  );
};

/**
 * Proverava da li niz unosa sadrzi prazan input
 *
 * @param {Array<string>} inputArray niz unosa
 * @throws kada je jedan od unosa prazan
 */
const validateEmpty = (inputArray) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].toString().trim() === '')
      throw new Error('Podaci ne mogu biti prazni');
  }
};

/**
 * Proverava da li je duzina stringa ispod limita
 *
 * @param {string} input
 * @param {number} [limit=3]
 * @throws kada je duzina unosa preko limita
 * @return {string} validan unos
 */
const validateLength = (input, limit = 3) => {
  if (typeof input !== 'string' || input.trim().length > limit) {
    throw new Error(`Input preko limita karaktera[${limit}]`);
  }
  return input.toUpperCase();
};

/**
 * Enum inputa
 *
 * @readonly
 * @enum {string}
 */
const mainOpt = {
  manAdd: 'Rucno dodaj tenisere u turnir',
  autoAdd: 'Automatski dodaj tenisere u turnir',
  del: 'Uklonite tenisera iz turnira',
  start: 'Zapocni turnir',
  print: 'Prikazi ucesnike turnira',
  sim: 'Simulliraj krug turnira',
};

/**
 * Proverava da li je broj kvadrat dvojke
 *
 * @param {number} number
 * @return {boolean}
 */
const isPowOfTwo = (number) => {
  return Math.log2(number) % 1 === 0;
};

/**
 * Ispisuje text
 *
 * @param {string} str
 */
const output = (str) => {
  console.log(`>> ${str}`);
};

/**
 * Proverava da li je objekat instance prosledjene klase
 *
 * @param {Object} instance
 * @param {Class} tClass
 */
const validateClass = (instance, tClass) => {
  if (instance.constructor.name !== tClass.name)
    throw new Error(`Objekat nije instanca klase ${tClass.name}`);
};

export {
  safeInt,
  validateEmpty,
  validateLength,
  isPowOfTwo,
  mainOpt,
  output,
  validateClass,
};
