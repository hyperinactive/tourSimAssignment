import { safeInt, validateEmpty, validateLength } from '../sharedUtils.js';

/**
 * Klasa TennisPlayer
 *
 * @class TennisPlayer
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} country
 * @property {number} ranking
 */
class TennisPlayer {
  #firstName;
  #lastName;
  #country;
  #ranking;

  /**
   * Kreira instancu TennisPlayer
   *
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} country
   * @param {number} ranking
   * @memberof TennisPlayer
   */
  constructor(firstName, lastName, country, ranking) {
    validateEmpty([firstName, lastName, country, ranking]);

    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#country = validateLength(country);
    this.#ranking = safeInt(ranking, 'rank tenisera');
  }

  get getFirstName() {
    return this.#firstName;
  }

  get getLastName() {
    return this.#lastName;
  }

  get getCountry() {
    return this.#country;
  }

  get getRanking() {
    return this.#ranking;
  }

  /**
   * Ispisi informacije o teniseru
   *
   * @memberof TennisPlayer
   */
  prettyPrint = () =>
    `${this.getFirstName[0].toUpperCase()}. ${this.getLastName} (${
      this.getCountry
    }, ${this.getRanking})`;
}

export default TennisPlayer;
