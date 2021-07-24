import { output, validateClass } from '../sharedUtils.js';
import TennisPlayer from './TennisPlayer.js';

/**
 * Klasa Match
 *
 * @class Match
 * @property {TennisPlayer} player1
 * @property {TennisPlayer} player2
 * @property {Object} outcome
 */
class Match {
  #player1;
  #player2;
  #outcome;

  /**
   * Kreira instancu Match.
   *
   * @param {TennisPlayer} player1
   * @param {TennisPlayer} player2
   * @memberof Match
   */
  constructor(player1, player2) {
    validateClass(player1, TennisPlayer);
    validateClass(player2, TennisPlayer);

    this.#player1 = player1;
    this.#player2 = player2;
    this.#outcome = null;
  }

  get getPlayer1() {
    return this.#player1;
  }

  get getPlayer2() {
    return this.#player2;
  }

  get getOutcome() {
    return this.#outcome;
  }

  set setOutcome(outcome) {
    this.#outcome = outcome;
  }

  /**
   * Simuliraj rezultate meca
   *
   * @memberof Match
   */
  simulateMatch = () => {
    let gameCounter = [0, 0];
    let setCounter = [0, 0];

    let matchCounter = { winner: null, loser: null, score: [] };
    while (true) {
      // pick pobednika game-a
      gameCounter[Math.floor(Math.random() * 2)]++;

      // prvi do 6 ili razlika od 2
      if (gameCounter[0] >= 6 && gameCounter[1] < gameCounter[0] - 1) {
        setCounter[0]++;
        matchCounter.score.push({
          setWinner: this.getPlayer1.getLastName,
          games: [gameCounter[0], gameCounter[1]],
        });
        // reset
        gameCounter[0] = 0;
        gameCounter[1] = 0;
      }
      if (gameCounter[1] >= 6 && gameCounter[0] < gameCounter[1] - 1) {
        setCounter[1]++;
        matchCounter.score.push({
          setWinner: this.getPlayer2.getLastName,
          games: [gameCounter[0], gameCounter[1]],
        });
        // reset
        gameCounter[0] = 0;
        gameCounter[1] = 0;
      }

      // BO5 setovi
      if (setCounter[0] === 3) {
        matchCounter.winner = this.getPlayer1;
        matchCounter.loser = this.getPlayer2;
        this.setOutcome = matchCounter;
        this.printOutcome();
        break;
      }
      if (setCounter[1] === 3) {
        matchCounter.winner = this.getPlayer2;
        matchCounter.loser = this.getPlayer2;
        this.setOutcome = matchCounter;
        this.printOutcome();
        break;
      }
    }
  };

  /**
   * Ispisi rezultate meca
   *
   * @memberof Match
   */
  printOutcome = () => {
    output(
      `${this.getPlayer1.prettyPrint()} vs ${this.getPlayer2.prettyPrint()}`
    );
    for (const score of this.getOutcome.score) {
      console.log(`[${score.games}] to ${score.setWinner}`);
    }
    output(`Winner: ${this.getOutcome.winner.prettyPrint()}`);
    console.log('---------------------------------------------------------');
  };
}

export default Match;
