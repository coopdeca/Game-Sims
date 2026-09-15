import { Matchup } from "./data";

export type WeatherCondition = {
  condition: "clear" | "cloudy" | "rainy" | "snowy" | "windy";
  temperature: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  humidity: number;
  barometricPressure: number;
};

export type GameWeather = {
  matchupId: string;
  stadium: string;
  location: string;
  isIndoor: boolean;
  weather: WeatherCondition;
  gameImpact: string;
};

// Predefined weather for each team's stadium
const stadiumWeather: Record<string, Omit<GameWeather, "matchupId">> = {
  // NFL
  KC: {
    stadium: "Arrowhead Stadium",
    location: "Kansas City, MO",
    isIndoor: false,
    weather: {
      condition: "cloudy",
      temperature: 65,
      windSpeed: 8,
      windDirection: "SW",
      precipitation: 0,
      humidity: 55,
      barometricPressure: 30.05
    },
    gameImpact: "Moderate - slight wind affects passing game"
  },
  DEN: {
    stadium: "Empower Field at Mile High",
    location: "Denver, CO",
    isIndoor: false,
    weather: {
      condition: "clear",
      temperature: 58,
      windSpeed: 12,
      windDirection: "NW",
      precipitation: 0,
      humidity: 45,
      barometricPressure: 29.85
    },
    gameImpact: "High - thin air reduces ball flight, wind affects kicks"
  },
  BUF: {
    stadium: "Highmark Stadium",
    location: "Orchard Park, NY",
    isIndoor: false,
    weather: {
      condition: "rainy",
      temperature: 52,
      windSpeed: 15,
      windDirection: "E",
      precipitation: 0.3,
      humidity: 75,
      barometricPressure: 29.95
    },
    gameImpact: "High - rain impacts passing accuracy and ball handling"
  },
  DET: {
    stadium: "Ford Field",
    location: "Detroit, MI",
    isIndoor: true,
    weather: {
      condition: "clear",
      temperature: 72,
      windSpeed: 0,
      windDirection: "N/A",
      precipitation: 0,
      humidity: 50,
      barometricPressure: 30.0
    },
    gameImpact: "None - controlled indoor environment"
  },
  PHI: {
    stadium: "Lincoln Financial Field",
    location: "Philadelphia, PA",
    isIndoor: false,
    weather: {
      condition: "cloudy",
      temperature: 63,
      windSpeed: 7,
      windDirection: "S",
      precipitation: 0,
      humidity: 60,
      barometricPressure: 30.02
    },
    gameImpact: "Low - favorable conditions for both teams"
  },
  DAL: {
    stadium: "AT&T Stadium",
    location: "Arlington, TX",
    isIndoor: true,
    weather: {
      condition: "clear",
      temperature: 72,
      windSpeed: 0,
      windDirection: "N/A",
      precipitation: 0,
      humidity: 50,
      barometricPressure: 30.0
    },
    gameImpact: "None - controlled indoor environment"
  },
  BAL: {
    stadium: "M&T Bank Stadium",
    location: "Baltimore, MD",
    isIndoor: false,
    weather: {
      condition: "cloudy",
      temperature: 60,
      windSpeed: 10,
      windDirection: "NE",
      precipitation: 0,
      humidity: 65,
      barometricPressure: 29.98
    },
    gameImpact: "Low - manageable conditions"
  },
  CIN: {
    stadium: "Paycor Stadium",
    location: "Cincinnati, OH",
    isIndoor: false,
    weather: {
      condition: "clear",
      temperature: 62,
      windSpeed: 6,
      windDirection: "W",
      precipitation: 0,
      humidity: 58,
      barometricPressure: 30.01
    },
    gameImpact: "Low - favorable conditions"
  },

  // CFB
  OSU: {
    stadium: "Ohio Stadium",
    location: "Columbus, OH",
    isIndoor: false,
    weather: {
      condition: "clear",
      temperature: 55,
      windSpeed: 9,
      windDirection: "NW",
      precipitation: 0,
      humidity: 52,
      barometricPressure: 29.99
    },
    gameImpact: "Low - typical fall conditions"
  },
  MICH: {
    stadium: "Michigan Stadium",
    location: "Ann Arbor, MI",
    isIndoor: false,
    weather: {
      condition: "windy",
      temperature: 50,
      windSpeed: 18,
      windDirection: "NE",
      precipitation: 0,
      humidity: 60,
      barometricPressure: 29.92
    },
    gameImpact: "High - strong wind impacts passing game significantly"
  },
  TEX: {
    stadium: "Darrell K Royal-Texas Memorial Stadium",
    location: "Austin, TX",
    isIndoor: false,
    weather: {
      condition: "clear",
      temperature: 78,
      windSpeed: 5,
      windDirection: "S",
      precipitation: 0,
      humidity: 48,
      barometricPressure: 30.05
    },
    gameImpact: "Low - warm but favorable conditions"
  },
  UGA: {
    stadium: "Sanford Stadium",
    location: "Athens, GA",
    isIndoor: false,
    weather: {
      condition: "cloudy",
      temperature: 68,
      windSpeed: 7,
      windDirection: "E",
      precipitation: 0.1,
      humidity: 70,
      barometricPressure: 30.00
    },
    gameImpact: "Moderate - slight moisture in air may affect kicking"
  }
};

export function getGameWeather(matchup: Matchup): {
  away: GameWeather;
  home: GameWeather;
} {
  const awayStadium = stadiumWeather[matchup.away.abbreviation];
  const homeStadium = stadiumWeather[matchup.home.abbreviation];

  return {
    away: {
      ...awayStadium,
      matchupId: matchup.id
    },
    home: {
      ...homeStadium,
      matchupId: matchup.id
    }
  };
}

// Calculate weather impact multiplier on game outcome
export function getWeatherMultiplier(
  condition: WeatherCondition
): { passingMultiplier: number; rushingMultiplier: number } {
  let passingMultiplier = 1;
  let rushingMultiplier = 1;

  if (condition.condition === "rainy") {
    passingMultiplier = 0.85;
    rushingMultiplier = 1.1;
  } else if (condition.condition === "snowy") {
    passingMultiplier = 0.75;
    rushingMultiplier = 1.05;
  } else if (condition.condition === "windy") {
    passingMultiplier = 0.9;
    rushingMultiplier = 1.0;
  }

  if (condition.windSpeed > 15) {
    passingMultiplier *= 0.95;
  }

  return { passingMultiplier, rushingMultiplier };
}
