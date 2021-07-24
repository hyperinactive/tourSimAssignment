import readlineSync from 'readline-sync';
import { mainOpt, output } from './sharedUtils.js';

import TournamentController from './TournamentController.js';
import Tournament from './models/Tournament.js';
import TournamentView from './TournamentView.js';

const main = async () => {
  const tournament = new Tournament();
  const tournamentView = new TournamentView();
  const tournamentController = new TournamentController(
    tournament,
    tournamentView
  );

  output('Turnir otvoren');

  mainLoop: while (true) {
    const options = [
      mainOpt.manAdd,
      mainOpt.autoAdd,
      mainOpt.del,
      mainOpt.print,
      mainOpt.start,
    ];
    const optionIndex = readlineSync.keyInSelect(
      options,
      '>> Uredite ucesnike turnira: '
    );

    switch (optionIndex) {
      case 0: {
        tournamentController.manualInput();
        break;
      }
      case 1: {
        tournamentController.autoInput();
        break;
      }
      case 2: {
        tournamentController.deletePlayer();
        break;
      }
      case 3: {
        tournamentController.printPlayers();
        break;
      }
      case 4: {
        if (tournamentController.checkStart()) {
          await tournamentController.simulateTournament();
          break mainLoop;
        }
        output('Format turnira zahteva [2, 4, 8, 16, 32, 64] igraca');
        break;
      }
      case -1: {
        output('Turnir zatvoren');
        break mainLoop;
      }
    }
  }
};

main();
