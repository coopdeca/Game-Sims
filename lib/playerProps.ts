import { Matchup } from "./data";

export type PlayerProp = {
  playerName: string;
  teamAbbr: string;
  propType: "passing_yards" | "rushing_yards" | "receiving_yards" | "touchdowns";
  over: number;
  under: number;
  overOdds: number; // -110, -120, etc.
  underOdds: number;
};

export type BettingOdds = {
  matchupId: string;
  awayTeam: string;
  homeTeam: string;
  awaySpread: number;
  homeSpread: number;
  overUnder: number;
  awayMoneyline: number;
  homeMoneyline: number;
  awayWinProb: number;
  homeWinProb: number;
};

// Generate player props based on team ratings
export function generatePlayerProps(matchup: Matchup): PlayerProp[] {
  const props: PlayerProp[] = [];
  const away = matchup.away;
  const home = matchup.home;

  // Away team QB props
  props.push({
    playerName: `${away.abbreviation} QB`,
    teamAbbr: away.abbreviation,
    propType: "passing_yards",
    over: Math.round(250 + away.passing * 0.8),
    under: Math.round(250 + away.passing * 0.8),
    overOdds: -110,
    underOdds: -110
  });

  // Away team RB props
  props.push({
    playerName: `${away.abbreviation} RB`,
    teamAbbr: away.abbreviation,
    propType: "rushing_yards",
    over: Math.round(80 + away.rushing * 0.5),
    under: Math.round(80 + away.rushing * 0.5),
    overOdds: -110,
    underOdds: -110
  });

  // Home team QB props
  props.push({
    playerName: `${home.abbreviation} QB`,
    teamAbbr: home.abbreviation,
    propType: "passing_yards",
    over: Math.round(260 + home.passing * 0.8),
    under: Math.round(260 + home.passing * 0.8),
    overOdds: -110,
    underOdds: -110
  });

  // Home team RB props
  props.push({
    playerName: `${home.abbreviation} RB`,
    teamAbbr: home.abbreviation,
    propType: "rushing_yards",
    over: Math.round(90 + home.rushing * 0.5),
    under: Math.round(90 + home.rushing * 0.5),
    overOdds: -110,
    underOdds: -110
  });

  return props;
}

// Calculate betting odds from simulation
export function calculateBettingOdds(
  matchup: Matchup,
  awayWinProb: number,
  homeWinProb: number,
  projectedTotal: number
): BettingOdds {
  // Calculate implied probability to moneyline conversion
  const awayMoneyline =
    awayWinProb > 0.5
      ? Math.round(-100 * awayWinProb / (1 - awayWinProb))
      : Math.round(100 * (1 - awayWinProb) / awayWinProb);

  const homeMoneyline =
    homeWinProb > 0.5
      ? Math.round(-100 * homeWinProb / (1 - homeWinProb))
      : Math.round(100 * (1 - homeWinProb) / homeWinProb);

  // Calculate spread (home team advantage)
  const spreadDifference = (homeWinProb - awayWinProb) * 14;

  return {
    matchupId: matchup.id,
    awayTeam: matchup.away.abbreviation,
    homeTeam: matchup.home.abbreviation,
    awaySpread: Math.round(spreadDifference * 2) / 2, // Half-point increments
    homeSpread: Math.round(-spreadDifference * 2) / 2,
    overUnder: Math.round(projectedTotal * 2) / 2,
    awayMoneyline,
    homeMoneyline,
    awayWinProb: Math.round(awayWinProb * 1000) / 10, // Percentage
    homeWinProb: Math.round(homeWinProb * 1000) / 10
  };
}
