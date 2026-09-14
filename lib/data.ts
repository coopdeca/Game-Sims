export type League = "NFL" | "CFB";

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  league: League;
  offense: number;
  defense: number;
  passing: number;
  rushing: number;
  explosive: number;
  pace: number;
  turnover: number;
  redZone: number;
  pressure: number;
  blitz: number;
  passRate: number;
};

export type Matchup = {
  id: string;
  league: League;
  week: number;
  date: string;
  away: Team;
  home: Team;
};

export const teams: Team[] = [
  {
    id: "kc",
    name: "Kansas City Chiefs",
    abbreviation: "KC",
    league: "NFL",
    offense: 92,
    defense: 88,
    passing: 95,
    rushing: 78,
    explosive: 91,
    pace: 82,
    turnover: 88,
    redZone: 91,
    pressure: 84,
    blitz: 29,
    passRate: 61
  },
  {
    id: "den",
    name: "Denver Broncos",
    abbreviation: "DEN",
    league: "NFL",
    offense: 78,
    defense: 84,
    passing: 80,
    rushing: 81,
    explosive: 76,
    pace: 73,
    turnover: 79,
    redZone: 75,
    pressure: 87,
    blitz: 31,
    passRate: 57
  },
  {
    id: "buf",
    name: "Buffalo Bills",
    abbreviation: "BUF",
    league: "NFL",
    offense: 91,
    defense: 86,
    passing: 91,
    rushing: 88,
    explosive: 90,
    pace: 86,
    turnover: 85,
    redZone: 89,
    pressure: 82,
    blitz: 27,
    passRate: 58
  },
  {
    id: "det",
    name: "Detroit Lions",
    abbreviation: "DET",
    league: "NFL",
    offense: 90,
    defense: 83,
    passing: 88,
    rushing: 92,
    explosive: 87,
    pace: 80,
    turnover: 83,
    redZone: 93,
    pressure: 78,
    blitz: 25,
    passRate: 55
  },
  {
    id: "phi",
    name: "Philadelphia Eagles",
    abbreviation: "PHI",
    league: "NFL",
    offense: 91,
    defense: 87,
    passing: 89,
    rushing: 94,
    explosive: 92,
    pace: 79,
    turnover: 86,
    redZone: 90,
    pressure: 89,
    blitz: 28,
    passRate: 54
  },
  {
    id: "dal",
    name: "Dallas Cowboys",
    abbreviation: "DAL",
    league: "NFL",
    offense: 84,
    defense: 79,
    passing: 89,
    rushing: 76,
    explosive: 85,
    pace: 84,
    turnover: 74,
    redZone: 81,
    pressure: 75,
    blitz: 24,
    passRate: 63
  },
  {
    id: "bal",
    name: "Baltimore Ravens",
    abbreviation: "BAL",
    league: "NFL",
    offense: 93,
    defense: 91,
    passing: 87,
    rushing: 97,
    explosive: 94,
    pace: 77,
    turnover: 90,
    redZone: 95,
    pressure: 93,
    blitz: 34,
    passRate: 49
  },
  {
    id: "cin",
    name: "Cincinnati Bengals",
    abbreviation: "CIN",
    league: "NFL",
    offense: 89,
    defense: 78,
    passing: 94,
    rushing: 74,
    explosive: 91,
    pace: 83,
    turnover: 76,
    redZone: 86,
    pressure: 72,
    blitz: 22,
    passRate: 64
  },

  {
    id: "osu",
    name: "Ohio State",
    abbreviation: "OSU",
    league: "CFB",
    offense: 96,
    defense: 94,
    passing: 95,
    rushing: 91,
    explosive: 95,
    pace: 78,
    turnover: 92,
    redZone: 94,
    pressure: 95,
    blitz: 31,
    passRate: 55
  },
  {
    id: "mich",
    name: "Michigan",
    abbreviation: "MICH",
    league: "CFB",
    offense: 87,
    defense: 92,
    passing: 81,
    rushing: 95,
    explosive: 86,
    pace: 68,
    turnover: 89,
    redZone: 91,
    pressure: 94,
    blitz: 28,
    passRate: 47
  },
  {
    id: "tex",
    name: "Texas",
    abbreviation: "TEX",
    league: "CFB",
    offense: 94,
    defense: 90,
    passing: 96,
    rushing: 87,
    explosive: 93,
    pace: 82,
    turnover: 87,
    redZone: 92,
    pressure: 88,
    blitz: 29,
    passRate: 59
  },
  {
    id: "uga",
    name: "Georgia",
    abbreviation: "UGA",
    league: "CFB",
    offense: 92,
    defense: 95,
    passing: 91,
    rushing: 90,
    explosive: 89,
    pace: 74,
    turnover: 94,
    redZone: 93,
    pressure: 96,
    blitz: 32,
    passRate: 52
  }
];

export const matchups: Matchup[] = [
  {
    id: "kc-den",
    league: "NFL",
    week: 3,
    date: "Sunday",
    away: teams[0],
    home: teams[1]
  },
  {
    id: "det-buf",
    league: "NFL",
    week: 3,
    date: "Thursday",
    away: teams[3],
    home: teams[2]
  },
  {
    id: "phi-dal",
    league: "NFL",
    week: 3,
    date: "Sunday",
    away: teams[4],
    home: teams[5]
  },
  {
    id: "bal-cin",
    league: "NFL",
    week: 3,
    date: "Sunday",
    away: teams[6],
    home: teams[7]
  },
  {
    id: "osu-mich",
    league: "CFB",
    week: 12,
    date: "Saturday",
    away: teams[8],
    home: teams[9]
  },
  {
    id: "tex-uga",
    league: "CFB",
    week: 10,
    date: "Saturday",
    away: teams[10],
    home: teams[11]
  }
];
