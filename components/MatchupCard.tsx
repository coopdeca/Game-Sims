"use client";

import { Matchup } from "../lib/data";

type Props = {
  matchup: Matchup;
  selected: boolean;
  onSelect: () => void;
};

export default function MatchupCard({
  matchup,
  selected,
  onSelect
}: Props) {
  return (
    <button
      className={`matchup-card ${
        selected ? "selected" : ""
      }`}
      onClick={onSelect}
    >
      <div className="matchup-top">
        <span>{matchup.league}</span>
        <span>WEEK {matchup.week}</span>
      </div>

      <div className="team-line">
        <div>
          <strong>{matchup.away.abbreviation}</strong>
          <small>{matchup.away.name}</small>
        </div>

        <span>@</span>

        <div>
          <strong>{matchup.home.abbreviation}</strong>
          <small>{matchup.home.name}</small>
        </div>
      </div>

      <div className="matchup-bottom">
        <span>{matchup.date}</span>

        <span>
          {selected ? "✓ SELECTED" : "SELECT"}
        </span>
      </div>
    </button>
  );
}
