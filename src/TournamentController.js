import readlineSync from 'readline-sync';
import fs from 'fs';

import { isPowOfTwo, output, safeInt, validateClass } from './sharedUtils.js';
import TennisPlayer from './models/TennisPlayer.js';
import TournamentView from './TournamentView.js';
import Tournament from './models/Tournament.js';
import Match from './models/Match.js';

/**
 * Klasa TournamentController
 *
 * @class TournamentController
 * @property {Tournament} model
 * @property {TournamentView} view
 */
class TournamentController {
  #model;
  #view;

  /**
   * Kreira instancu TournamentController
   *
   * @param {Tournament} model
   * @param {TournamentView} view
   * @throws kada model ili view nisu instance klasa Tournament i TournamentView
   * @memberof TournamentController
   */
  constructor(model, view) {
    validateClass(model, Tournament);
    validateClass(view, TournamentView);

    this.#model = model;
    this.#view = view;
  }

  get getModel() {
    return this.#model;
  }

  get getView() {
    return this.#view;
  }

  /**
   * Poziva ispisivanje tenisera iz view-a
   *
   * @memberof TournamentController
   */
  printPlayers = () => {
    this.getView.printPlayers(this.#model);
  };

  /**
   * Cita fajl i dodaje igrace
   *
   * @param {string} filename
   * @throws kada fajl nije pronadjen ili json nije validan
   * @returns {number} broj dodatih tenisera
   * @memberof Tournament
   */
  #parseJSONSync = (filename) => {
    // proveri status
    fs.statSync(`./playersData/${filename}`, function (err, _) {
      if (err) throw new Error('File not found');
    });

    // citaj
    const rf = fs.readFileSync(`./playersData/${filename}`, {
      encoding: 'utf-8',
    });
    // probaj parse
    const json = JSON.parse(rf);

    let playersAdded = 0;
    // dodaj tenisere
    Object.values(json).forEach((value) => {
      const { firstName, lastName, country, ranking } = value;
      const newPlayer = new TennisPlayer(
        firstName,
        lastName,
        country,
        Number(ranking)
      );
      try {
        this.getModel.addPlayer(newPlayer);
        output(`${newPlayer.prettyPrint()} dodat`);
        playersAdded++;
      } catch (error) {
        console.log(error.message);
      }
    });
    return playersAdded;
  };

  /**
   * Rucno dodaje igrace
   *
   * @memberof TournamentController
   * @throws kada unos tenisera nije validan
   */
  manualInput = () => {
    output('Manuelno dodavanje igraca');

    let N = null;
    while (!N) {
      // trazi broj tenisera
      const tmpN = Number(
        readlineSync.question('>> Unesite broj tenisera (N): ')
      );
      try {
        N = safeInt(tmpN, 'N');
      } catch (error) {
        console.error(error.message);
      }
    }

    // loop N i dodaj tenisere
    for (let i = 0; i < N; i++) {
      const tempTennisPlayer = readlineSync.question(
        '>> Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:'
      );

      // parsiraj input
      const tempTennisPlayerData = tempTennisPlayer.split(',');
      try {
        // dodaj novog teniseta u turnir
        const newTennisPlayer = new TennisPlayer(
          tempTennisPlayerData[0],
          tempTennisPlayerData[1],
          tempTennisPlayerData[2],
          Number(tempTennisPlayerData[3])
        );

        this.getModel.addPlayer(newTennisPlayer);
        output(`${newTennisPlayer.prettyPrint()} dodat`);
      } catch (error) {
        console.error(error.message);
        i--;
      }
    }
  };

  /**
   * Automatski dodaje igraca iz fajla
   *
   * @memberof TournamentController
   * @throws kada nije validan status/json/podaci o igracima
   */
  autoInput = () => {
    output('Automatsko dodavanje igraca');

    let maintainLoop = true;
    while (maintainLoop) {
      const filename = readlineSync.question('>> Unesite ime fajla: ');

      try {
        // uspesno ucitao validan fajl break
        const added = this.#parseJSONSync(filename);
        maintainLoop = false;
        output(`Uspesno dodao [${added}] tenisera`);
      } catch (error) {
        // err i nastavi loop
        console.error(error.message);
      }
    }
  };

  /**
   * Brise igraca
   *
   * @param {string} ranking
   * @memberof TournamentController
   */
  deletePlayer = () => {
    const ranking = readlineSync.question(
      '>> Unesite rang tenisera kojeg zelite da izbrisete: '
    );
    try {
      this.getModel.deletePlayer(Number(ranking));
      output(`Izbrisao tenisera sa rangom ${ranking}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Provera odgovarajuceg broja igraca
   *
   * @memberof TournamentController
   * @returns {boolean}
   */
  checkStart = () => {
    return isPowOfTwo(this.getModel.getTennisPlayers.size);
  };

  /**
   * Generise prvu rundu
   *
   * @memberof TournamentController
   * @returns {Array<number>} redosled meceva
   */
  generateDraw = () => {
    if (this.getModel.getTennisPlayers.size > 2) {
      // map to arr
      const arr = Array.from(this.getModel.getTennisPlayers, ([key, _]) =>
        Number(key)
      );
      // sort
      arr.sort((a, b) => {
        if (a > b) return 1;
        return -1;
      });

      const roundArr = [];
      const len = arr.length / 2;

      // [0, mid] [1, mid + 1]...
      let i = 0;
      while (i < len) {
        roundArr.push(arr[i]);
        roundArr.push(arr[i + len]);
        i++;
      }
      return roundArr;
    } else {
      return Array.from(this.getModel.getTennisPlayers, ([key, _]) => key);
    }
  };

  /**
   * Simulira turnir
   *
   * @memberof TournamentController
   */
  simulateTournament = async () => {
    const arr = this.generateDraw();
    let rounds = Math.log2(arr.length);

    let i = 0;
    while (arr.length > 1) {
      // print krug takmicenja
      switch (rounds) {
        case 1:
          output('Finals');
          break;
        case 2:
          output('Semi');
          break;
        default:
          output('Round ' + rounds);
      }
      // simuliraj mec
      const p1 = this.getModel.getTennisPlayers.get(arr[i]);
      const p2 = this.getModel.getTennisPlayers.get(arr[i + 1]);
      const match = new Match(p1, p2);
      match.simulateMatch();

      // izbaci gubitnika
      if (match.getOutcome.winner.getRanking !== p1.getRanking) {
        arr.splice(i, 1);
      } else {
        arr.splice(i + 1, 1);
      }
      // kraj runde, idi na pocetak niza
      if (i === arr.length - 1) {
        i = 0;
        rounds--;
      } else {
        i++;
      }
      // nepotrebno, ali lepo
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    output(
      `Pobednik turnira: ${this.getModel.getTennisPlayers
        .get(arr[0])
        .prettyPrint()}`
    );
  };
}

export default TournamentController;
