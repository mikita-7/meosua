/**
 * Nền trời đêm: các vòng xoáy và sao phát sáng (thiết kế riêng, lấy cảm hứng
 * từ nét cọ xoáy của Van Gogh, không sao chép bức tranh nào).
 */

interface Swirl { cx: number; cy: number; r: number; turns: number; color: string; width: number; dur: number }

const SWIRLS: Swirl[] = [
  {cx: 430, cy: 330, r: 260, turns: 3.2, color: '#3d6fd1', width: 16, dur: 140},
  {cx: 1180, cy: 250, r: 220, turns: 3, color: '#5b8fe0', width: 13, dur: 170},
  {cx: 820, cy: 640, r: 300, turns: 3.4, color: '#2a4fa8', width: 18, dur: 200},
  {cx: 1450, cy: 700, r: 190, turns: 2.8, color: '#4a82d8', width: 12, dur: 150},
  {cx: 140, cy: 740, r: 200, turns: 2.8, color: '#6ea4e8', width: 12, dur: 160},
];

function spiral({cx, cy, r, turns}: Swirl): string {
  const steps = Math.round(turns * 48);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const rad = (r * i) / steps;
    pts.push(`${i === 0 ? 'M' : 'L'}${(cx + Math.cos(t) * rad).toFixed(1)} ${(cy + Math.sin(t) * rad).toFixed(1)}`);
  }
  return pts.join(' ');
}

// Sao: x, y, bán kính lõi, màu
const STARS: [number, number, number, string][] = [
  [260, 150, 9, '#f6e27a'], [400, 110, 12, '#fff2a8'], [1000, 330, 10, '#f6e27a'],
  [1330, 120, 13, '#fff2a8'], [520, 520, 8, '#f6e27a'], [1220, 560, 11, '#fff2a8'],
  [150, 420, 8, '#f6e27a'], [900, 230, 7, '#fff2a8'], [1500, 400, 9, '#f6e27a'],
  [640, 780, 9, '#fff2a8'], [1080, 800, 8, '#f6e27a'], [370, 650, 7, '#fff2a8'],
];

export default function Starfield() {
  return (
    <svg
      className="starfield"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050f2b" />
          <stop offset="0.6" stopColor="#0d2260" />
          <stop offset="1" stopColor="#173a85" />
        </linearGradient>
        {/* Làm nét vẽ gợn như nét cọ sơn dầu */}
        <filter id="brush" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" />
        </filter>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#fff6c0" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f6d860" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f6d860" stopOpacity="0" />
        </radialGradient>
        <mask id="crescent">
          <rect width="1600" height="900" fill="black" />
          <circle cx="0" cy="0" r="70" fill="white" />
          <circle cx="26" cy="-14" r="62" fill="black" />
        </mask>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />

      <g filter="url(#brush)" fill="none" strokeLinecap="round" opacity="0.7">
        {SWIRLS.map((s, i) => (
          <path
            key={i}
            d={spiral(s)}
            stroke={s.color}
            strokeWidth={s.width}
            className="starfield__swirl"
            style={{transformOrigin: `${s.cx}px ${s.cy}px`, animationDuration: `${s.dur}s`}}
          />
        ))}
      </g>

      {STARS.map(([x, y, r, c], i) => (
        <g key={i} className="starfield__star" style={{animationDelay: `${(i * 0.7) % 5}s`}}>
          <circle cx={x} cy={y} r={r * 4.5} fill="url(#glow)" />
          <circle cx={x} cy={y} r={r * 1.7} fill="none" stroke={c} strokeOpacity="0.55" strokeWidth="2.5" />
          <circle cx={x} cy={y} r={r} fill={c} />
        </g>
      ))}

      <g transform="translate(1430 150)">
        <circle r="120" fill="url(#glow)" opacity="0.8" />
        <g mask="url(#crescent)"><circle r="70" fill="#ffe98a" /></g>
      </g>
    </svg>
  );
}
