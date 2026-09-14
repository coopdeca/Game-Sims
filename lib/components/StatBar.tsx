type Props = {
  label: string;
  away: number;
  home: number;
};

export default function StatBar({
  label,
  away,
  home
}: Props) {
  const awayWins = away >= home;

  return (
    <div className="stat-row">
      <div className={`stat-number ${awayWins ? "winner" : ""}`}>
        {away}
      </div>

      <div className="stat-middle">
        <div className="stat-label">{label}</div>

        <div className="bar-background">
          <div
            className="bar-away"
            style={{
              width: `${Math.min(100, away)}%`
            }}
          />

          <div
            className="bar-home"
            style={{
              width: `${Math.min(100, home)}%`
            }}
          />
        </div>
      </div>

      <div
        className={`stat-number ${!awayWins ? "winner" : ""}`}
      >
        {home}
      </div>
    </div>
  );
}
