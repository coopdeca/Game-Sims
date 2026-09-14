"use client";

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
  const max = Math.max(away, home);
  const awayPercent = (away / max) * 100;
  const homePercent = (home / max) * 100;

  return (
    <div className="stat-bar-container">
      <div className="stat-label">{label}</div>
      
      <div className="stat-bar-wrapper">
        <div className="stat-bar-group away">
          <div 
            className="stat-bar-fill"
            style={{ width: `${awayPercent}%` }}
          />
          <span className="stat-value">{away}</span>
        </div>

        <div className="stat-bar-group home">
          <div 
            className="stat-bar-fill"
            style={{ width: `${homePercent}%` }}
          />
          <span className="stat-value">{home}</span>
        </div>
      </div>
    </div>
  );
}
