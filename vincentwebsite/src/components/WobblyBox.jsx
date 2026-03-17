import { useMemo } from 'react';

function generateWobblyPath(w, h, wobble = 3, seed = 0) {

  const r = (i) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return (x - Math.floor(x)) * 2 - 1;
  };

  const m = wobble;
  const segments = 8;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push({
      x: t * w + r(i) * m,
      y: r(i + 50) * m
    });
  }

  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    points.push({
      x: w + r(i + 100) * m, 
      y: t * h + r(i + 150) * m
    });
  }

  for (let i = 1; i <= segments; i++) {
    const t = 1 - i / segments;
    points.push({
      x: t * w + r(i + 200) * m,
      y: h + r(i + 250) * m 
    });
  }

  for (let i = 1; i < segments; i++) {
    const t = 1 - i / segments;
    points.push({
      x: r(i + 300) * m,
      y: t * h + r(i + 350) * m
    });
  }

  if (points.length === 0) return '';

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.5 + r(i + 400) * m * 0.5;
    const cpy1 = prev.y + (curr.y - prev.y) * 0.3 + r(i + 450) * m * 0.5;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.5 + r(i + 500) * m * 0.5;
    const cpy2 = prev.y + (curr.y - prev.y) * 0.7 + r(i + 550) * m * 0.5;
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }
  d += ' Z';
  return d;
}

export default function WobblyBox({
  width = 300,
  height = 200,
  wobble = 3,
  seed = 42,
  strokeWidth = 2.5,
  className = '',
  children,
  style = {},
  onClick
}) {
  const path = useMemo(
    () => generateWobblyPath(width, height, wobble, seed),
    [width, height, wobble, seed]
  );

  const pad = wobble + strokeWidth;

  return (
    <div
      className={`wobbly-box ${className}`}
      style={{
        position: 'relative',
        width: width,
        height: height,
        ...style
      }}
      onClick={onClick}
    >
      <svg
        width={width + pad * 2}
        height={height + pad * 2}
        style={{
          position: 'absolute',
          top: -pad,
          left: -pad,
          pointerEvents: 'none'
        }}
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--fg)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  );
}
