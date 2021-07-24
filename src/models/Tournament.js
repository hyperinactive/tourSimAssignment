import { safeInt, validateClass } from '../sharedUtils.js';
import TennisPlayer from './TennisPlayer.js';

/**
 * Klasa Tournament
 *
 * @class Tournament
 * @property {Map<number, TennisPlayer>} tennisPlayers mapa tenisera na turniru
 */
class Tournament {
  #tennisPlayers;

  /**
   * Kreira instancu Tournament
   *
   * @param {Array<TennisPlayer>} [tennisPlayersList=[]] niz tenisera
   * @memberof Tournament
   */
  constructor(tennisPlayersList = []) {
    this.#tennisPlayers = new Map();
    if (tennisPlayersList.length > 0) this.#initPlayers(tennisPlayersList);
  }

  get getTennisPlayers() {
    return this.#tennisPlayers;
  }

  /**
   * Proverava unos tenisera
   *
   * @param {TennisPlayer} tennisPlayer
   * @throws kada unos nije klase TennisPlayer ili rang tenisera nije unikatan
   * @memberof Tournament
   */
  #validatePlayer = (tennisPlayer) => {
    validateClass(tennisPlayer, TennisPlayer);
    if (this.getTennisPlayers.has(tennisPlayer.getRanking))
      throw new Error('Teniseri ne mogu imati isti rang');
  };

  /**
   * Dodaje novog tenisera u turnir
   *
   * @param {TennisPlayer} tennisPlayer
   * @throws kada je limit od 64 igraca probijen
   * @memberof Tournament
   */
  addPlayer = (tennisPlayer) => {
    if (this.getTennisPlayers.size >= 64)
      throw new Error('Previse igraca, max limit je 64');

    this.#validatePlayer(tennisPlayer);
    this.getTennisPlayers.set(tennisPlayer.getRanking, tennisPlayer);
  };

  /**
   * Brise tenisera sa turnira
   *
   * @param {number} ranking
   * @memberof Tournament
   * @returns {boolean}
   */
  deletePlayer = (ranking) => {
    const delParam = safeInt(ranking);
    if (!this.getTennisPlayers.has(delParam))
      throw new Error(`Igrac sa rangom ${ranking} nije nadjen`);

    this.getTennisPlayers.delete(delParam);
  };

  /**
   * Konvertuje i dodaje niz tenisera u mapu turnira
   *
   * @param {TennisPlayer} tennisPlayers
   * @memberof Tournament
   */
  #initPlayers = (tennisPlayers) => {
    for (let i = 0; i < tennisPlayers.length; i++) {
      this.#validatePlayer(tennisPlayers[i]);
      this.addPlayer(tennisPlayers[i]);
    }
  };
}

export default Tournament;
