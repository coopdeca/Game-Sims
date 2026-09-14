import { Matchup } from "./data";

export type SimulationResult = {
  simulations: number;
  awayWins: number;
  homeWins: number;
  awayWinProbability: number;
  homeWinProbability: number;
  awayAverageScore: number;
  homeAverageScore: number;
  averageTotal: number;
  overtimeProbability: number;
  oneScoreProbability: number;
};

function randomNormal(mean: number, standardDeviation: number) {
  const u = 1 - Math.random();
  const v = Math.random();

  const standardNormal =
    Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

  return mean + standardNormal * standardDeviation;
}

export function simulateGame(
  matchup: Matchup,
  simulations = 10000
): SimulationResult {
  let awayWins = 0;
  let homeWins = 0;
  let overtime = 0;
  let oneScore = 0;

  let awayScoreTotal = 0;
  let homeScoreTotal = 0;

  const away = matchup.away;
  const home = matchup.home;

  const awayStrength =
    away.offense * 0.55 +
    away.defense * 0.2 +
    away.explosive * 0.1 +
    away.turnover * 0.15;

  const homeStrength =
    home.offense * 0.55 +
    home.defense * 0.2 +
    home.explosive * 0.1 +
    home.turnover * 0.15 +
    2.5;

  const strengthDifference = awayStrength - homeStrength;

  for (let i = 0; i < simulations; i++) {
    const awayBase = 21 + strengthDifference * 0.22;
    const homeBase = 21 - strengthDifference * 0.22;

    const awayExplosiveAdjustment =
      (away.explosive - home.defense) * 0.08;

    const homeExplosiveAdjustment =
      (home.explosive - away.defense) * 0.08;

    const awayScore = Math.max(
      0,
      Math.round(
        randomNormal(
          awayBase + awayExplosiveAdjustment,
          8
        )
      )
    );

    const homeScore = Math.max(
      0,
      Math.round(
        randomNormal(
          homeBase + homeExplosiveAdjustment,
          8
        )
      )
    );

    awayScoreTotal += awayScore;
    homeScoreTotal += homeScore;

    if (awayScore > homeScore) {
      awayWins++;
    } else if (homeScore > awayScore) {
      homeWins++;
    } else {
      overtime++;
      
      if (Math.random() > 0.5) {
        awayWins++;
      } else {
        homeWins++;
      }
    }

    if (Math.abs(awayScore - homeScore) <= 8) {
      oneScore++;
    }
  }

  const awayWinProbability = awayWins / simulations;
  const homeWinProbability = homeWins / simulations;

  const awayAverageScore = awayScoreTotal / simulations;
  const homeAverageScore = homeScoreTotal / simulations;

  return {
    simulations,
    awayWins,
    homeWins,
    awayWinProbability,
    homeWinProbability,
    awayAverageScore,
    homeAverageScore,
    averageTotal: awayAverageScore + homeAverageScore,
    overtimeProbability: overtime / simulations,
    oneScoreProbability: oneScore / simulations
  };
}
