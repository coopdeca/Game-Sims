"use client";

import { useMemo, useState } from "react";
import MatchupCard from "../components/MatchupCard";
import SimulationPanel from "../components/SimulationPanel";
import {
  League,
  matchups,
  Matchup
} from "../lib/data";

export default function Home() {
  const [league, setLeague] =
    useState<League>("NFL");

  const [selected, setSelected] =
    useState<string | null>(null);

  const filteredMatchups = useMemo(
    () =>
      matchups.filter(
        matchup => matchup.league === league
      ),
    [league]
  );

  const selectedMatchup =
    matchups.find(
      matchup => matchup.id === selected
    ) ?? null;

  function changeLeague(value: League) {
    setLeague(value);
    setSelected(null);
  }

  return (
    <main>
      <header className="header">
        <div className="brand">
          <div className="logo">FL</div>

          <div>
            <h1>FOOTBALL SIM LAB</h1>
            <p>
              NFL & COLLEGE FOOTBALL ANALYTICS
            </p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot" />
          SIMULATION ENGINE ONLINE
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">
            WEEKLY MATCHUP INTELLIGENCE
          </span>

          <h2>
            Simulate the game
            <br />
            <span>before it happens.</span>
          </h2>

          <p>
            Analyze matchups using offensive
            tendencies, defensive strength,
            explosive plays, game plans and
            Monte Carlo simulations.
          </p>
        </div>

        <div className="hero-stat">
          <strong>10K</strong>
          <span>
            SIMULATIONS
            <br />
            PER MATCHUP
          </span>
        </div>
      </section>

      <section className="league-selector">
        <button
          className={
            league === "NFL"
              ? "league-button active"
              : "league-button"
          }
          onClick={() => changeLeague("NFL")}
        >
          NFL
        </button>

        <button
          className={
            league === "CFB"
              ? "league-button active"
              : "league-button"
          }
          onClick={() => changeLeague("CFB")}
        >
          COLLEGE FOOTBALL
        </button>
      </section>

      <section className="games-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              UPCOMING GAMES
            </span>

            <h2>
              {league === "NFL"
                ? "NFL MATCHUPS"
                : "COLLEGE MATCHUPS"}
            </h2>
          </div>

          <span className="game-count">
            {filteredMatchups.length} GAMES
          </span>
        </div>

        <div className="matchup-grid">
          {filteredMatchups.map(
            (matchup: Matchup) => (
              <MatchupCard
                key={matchup.id}
                matchup={matchup}
                selected={
                  selected === matchup.id
                }
                onSelect={() =>
                  setSelected(matchup.id)
                }
              />
            )
          )}
        </div>
      </section>

      <section className="simulation-section">
        <SimulationPanel
          matchup={selectedMatchup}
        />
      </section>

      <section className="feature-grid">
        <div>
          <span>01</span>
          <h3>GAME PLAN</h3>
          <p>
            Identify how each offense and defense
            is likely to attack the matchup.
          </p>
        </div>

        <div>
          <span>02</span>
          <h3>BIG PLAYS</h3>
          <p>
            Measure explosive-play potential and
            defensive explosive-play prevention.
          </p>
        </div>

        <div>
          <span>03</span>
          <h3>HISTORY</h3>
          <p>
            Compare recent head-to-head meetings,
            scoring margins and trends.
          </p>
        </div>

        <div>
          <span>04</span>
          <h3>WEATHER</h3>
          <p>
            Adjust simulations for wind,
            precipitation and temperature.
          </p>
        </div>

        <div>
          <span>05</span>
          <h3>CHAMPIONSHIP</h3>
          <p>
            Understand playoff, conference and
            CFP implications.
          </p>
        </div>

        <div>
          <span>06</span>
          <h3>AUTOMATION</h3>
          <p>
            Automatically refresh schedules and
            matchup data every week.
          </p>
        </div>
      </section>

      <footer>
        <strong>FOOTBALL SIM LAB</strong>
        <span>
          Personal analytics & simulation project
        </span>
      </footer>
    </main>
  );
}
