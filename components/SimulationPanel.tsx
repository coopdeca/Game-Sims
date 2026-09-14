"use client";

import { Matchup } from "../lib/data";
import {
  SimulationResult,
  simulateGame
} from "../lib/simulator";
import { useState } from "react";
import StatBar from "./StatBar";

type Props = {
  matchup: Matchup | null;
};

export default function SimulationPanel({
  matchup
}: Props) {
  const [result, setResult] =
    useState<SimulationResult | null>(null);

  const [running, setRunning] = useState(false);

  if (!matchup) {
    return (
      <div className="empty-panel">
        <div className="empty-icon">◎</div>
        <h2>Select a matchup</h2>
        <p>
          Choose a game above to run the football
          simulation.
        </p>
      </div>
    );
  }

  function runSimulation() {
    setRunning(true);

    setTimeout(() => {
      const simulation = simulateGame(
        matchup,
        10000
      );

      setResult(simulation);
      setRunning(false);
    }, 300);
  }

  return (
    <div className="simulation-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">
            SIMULATION ENGINE
          </span>

          <h2>
            {matchup.away.abbreviation}{" "}
            <span>@</span>{" "}
            {matchup.home.abbreviation}
          </h2>
        </div>

        <button
          className="simulate-button"
          onClick={runSimulation}
          disabled={running}
        >
          {running
            ? "SIMULATING..."
            : "RUN 10,000 SIMULATIONS"}
        </button>
      </div>

      {!result ? (
        <div className="ready-box">
          <div>
            <strong>
              Ready to simulate
            </strong>

            <p>
              The model evaluates offense, defense,
              explosive plays, turnovers, pace and
              home-field advantage.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="winner-display">
            <div className="win-team">
              <span>
                {matchup.away.abbreviation}
              </span>

              <strong>
                {(
                  result.awayWinProbability * 100
                ).toFixed(1)}
                %
              </strong>

              <small>WIN PROBABILITY</small>
            </div>

            <div className="versus">VS</div>

            <div className="win-team">
              <span>
                {matchup.home.abbreviation}
              </span>

              <strong>
                {(
                  result.homeWinProbability * 100
                ).toFixed(1)}
                %
              </strong>

              <small>WIN PROBABILITY</small>
            </div>
          </div>

          <div className="score-grid">
            <div>
              <span>
                {matchup.away.abbreviation}
              </span>

              <strong>
                {result.awayAverageScore.toFixed(1)}
              </strong>

              <small>PROJECTED SCORE</small>
            </div>

            <div>
              <span>
                {matchup.home.abbreviation}
              </span>

              <strong>
                {result.homeAverageScore.toFixed(1)}
              </strong>

              <small>PROJECTED SCORE</small>
            </div>

            <div>
              <span>TOTAL</span>

              <strong>
                {result.averageTotal.toFixed(1)}
              </strong>

              <small>AVERAGE TOTAL</small>
            </div>
          </div>

          <div className="analytics-section">
            <h3>MATCHUP PROFILE</h3>

            <StatBar
              label="OFFENSE"
              away={matchup.away.offense}
              home={matchup.home.offense}
            />

            <StatBar
              label="DEFENSE"
              away={matchup.away.defense}
              home={matchup.home.defense}
            />

            <StatBar
              label="EXPLOSIVE PLAYS"
              away={matchup.away.explosive}
              home={matchup.home.explosive}
            />

            <StatBar
              label="PASSING"
              away={matchup.away.passing}
              home={matchup.home.passing}
            />

            <StatBar
              label="RUSHING"
              away={matchup.away.rushing}
              home={matchup.home.rushing}
            />
          </div>

          <div className="secondary-grid">
            <div className="info-card">
              <span>ONE-SCORE GAME</span>
              <strong>
                {(result.oneScoreProbability * 100).toFixed(
                  1
                )}
                %
              </strong>
            </div>

            <div className="info-card">
              <span>OVERTIME</span>
              <strong>
                {(result.overtimeProbability * 100).toFixed(
                  1
                )}
                %
              </strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
