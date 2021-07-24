/**
 * Klasa TournamentView
 *
 * @class TournamentView
 */
class TournamentView {
  constructor() {}

  /**
   * Ispisuje ucesnike na turniru
   *
   * @param {Tournament} tournament
   * @memberof TournamentView
   */
  printPlayers = (tournament) => {
    const niceArr = Array.from(tournament.getTennisPlayers, ([_, value]) => {
      const firstName = value.getFirstName;
      const lastName = value.getLastName;
      const country = value.getCountry;
      const ranking = value.getRanking;
      return { firstName, lastName, country, ranking };
    });
    console.table(niceArr);
  };
}

export default TournamentView;
