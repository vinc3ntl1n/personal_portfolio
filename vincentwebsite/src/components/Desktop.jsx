import { useState, useRef, useCallback } from 'react';
import DesktopIcon from './DesktopIcon';
import './Desktop.css';

const GRID = {
  width: 118,
  height: 140,
  padX: 16,
  padY: 20,
};

const DEFAULT_ICON_POSITIONS = {
  about: { x: GRID.padX, y: GRID.padY },
  projects: { x: GRID.padX + GRID.width, y: GRID.padY },
  resume: { x: GRID.padX, y: GRID.padY + GRID.height },
  contact: { x: GRID.padX + GRID.width, y: GRID.padY + GRID.height },
};

//to add a new icon first add an entry here, then go to app.jsx to make the same window_config and then make a component in src/windows
const INITIAL_ICONS = [
  { id: 'about', icon: 'person', label: 'About Me' },
  { id: 'projects', icon: 'folder', label: 'Projects' },
  { id: 'contact', icon: 'envelope', label: 'Contact' },
  { id: 'resume', icon: 'document', label: 'Resume' },
];

//the initail position for the icons
function getInitialPositions() {
  const positions = {};
  INITIAL_ICONS.forEach((icon, i) => {
    positions[icon.id] = DEFAULT_ICON_POSITIONS[icon.id] || {
      x: GRID.padX,
      y: GRID.padY + i * GRID.height,
    };
  });
  return positions;
}

function snapToGrid(x, y) {
  return {
    x: Math.round((x - GRID.padX) / GRID.width) * GRID.width + GRID.padX,
    y: Math.round((y - GRID.padY) / GRID.height) * GRID.height + GRID.padY,
  };
}

export default function Desktop({ onOpenWindow }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [positions, setPositions] = useState(getInitialPositions);
  const [draggingId, setDraggingId] = useState(null);
  const [dragPos, setDragPos] = useState(null);
  const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 });
  const desktopRef = useRef(null);

  const handleIconMouseDown = useCallback((e, iconId) => {
    const pos = positions[iconId];
    const startX = e.clientX;
    const startY = e.clientY;
    let isDragging = false;

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        isDragging = true;
        dragRef.current = {
          startX,
          startY,
          origX: pos.x,
          origY: pos.y,
        };
        setDraggingId(iconId);
      }

      setDragPos({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy,
      });
    };

    const handleMouseUp = (e) => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const rawX = dragRef.current.origX + dx;
      const rawY = dragRef.current.origY + dy;

      let snapped = snapToGrid(rawX, rawY);

      const desktop = desktopRef.current;
      if (desktop) {
        const maxX = desktop.clientWidth - GRID.width;
        const maxY = desktop.clientHeight - GRID.height;
        snapped.x = Math.max(GRID.padX, Math.min(maxX, snapped.x));
        snapped.y = Math.max(GRID.padY, Math.min(maxY, snapped.y));
      }

      setPositions(prev => {
        const occupied = Object.entries(prev)
          .filter(([id]) => id !== iconId)
          .map(([, p]) => p);

        const isOccupied = (tx, ty) =>
          occupied.some(p => Math.abs(p.x - tx) < 10 && Math.abs(p.y - ty) < 10);

        if (isOccupied(snapped.x, snapped.y)) {
          let bestDist = Infinity;
          let bestPos = { x: dragRef.current.origX, y: dragRef.current.origY };
          const maxCols = desktop ? Math.floor(desktop.clientWidth / GRID.width) : 8;
          const maxRows = desktop ? Math.floor(desktop.clientHeight / GRID.height) : 6;

          for (let row = 0; row < maxRows; row++) {
            for (let col = 0; col < maxCols; col++) {
              const tx = GRID.padX + col * GRID.width;
              const ty = GRID.padY + row * GRID.height;
              if (!isOccupied(tx, ty)) {
                const dist = Math.abs(tx - snapped.x) + Math.abs(ty - snapped.y);
                if (dist < bestDist) {
                  bestDist = dist;
                  bestPos = { x: tx, y: ty };
                }
              }
            }
          }
          snapped = bestPos;
        }

        return { ...prev, [iconId]: snapped };
      });

      setDraggingId(null);
      setDragPos(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [positions]);

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  return (
    <div
      className="desktop"
      onClick={handleDesktopClick}
      ref={desktopRef}
      style={{
        '--desktop-grid-width': `${GRID.width}px`,
        '--desktop-grid-height': `${GRID.height}px`,
        '--desktop-grid-pad-x': `${GRID.padX}px`,
        '--desktop-grid-pad-y': `${GRID.padY}px`,
        '--desktop-icon-footprint': `${GRID.width}px`,
        '--desktop-icon-graphic': '104px',
      }}
    >
      <div className="dither-bg" />

      {INITIAL_ICONS.map(({ id, icon, label }) => {
        const pos = draggingId === id ? dragPos : positions[id];
        return (
          <div
            key={id}
            className="desktop__icon-wrapper"
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              zIndex: draggingId === id ? 1000 : 1,
              opacity: draggingId === id ? 0.8 : 1,
              transition: draggingId === id ? 'none' : 'left 0.15s ease, top 0.15s ease',
            }}
              onMouseDown={(e) => handleIconMouseDown(e, id)}
          >
            <DesktopIcon
              icon={icon}
              label={label}
              selected={selectedIcon === id}
              onSelect={() => setSelectedIcon(id)}
              onOpen={() => onOpenWindow(id)}
            />
          </div>
        );
      })}
    </div>
  );
}
