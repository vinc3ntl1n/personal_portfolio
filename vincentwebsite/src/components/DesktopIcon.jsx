import { useState, useCallback } from 'react';
import SketchIcon from './SketchIcon';
import './DesktopIcon.css';

const ICON_SIZE = 104;

export default function DesktopIcon({ icon, label, selected, onSelect, onOpen }) {
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleClick = useCallback((e) => {
    e.stopPropagation();

    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      onOpen && onOpen();
    } else {
      onSelect && onSelect();
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 350);
      setClickTimeout(timeout);
    }
  }, [clickTimeout, onOpen, onSelect]);

  return (
    <div
      className={`desktop-icon ${selected ? 'desktop-icon--selected' : ''}`}
      onClick={handleClick}
    >
      <div className="desktop-icon__graphic">
        <SketchIcon name={icon} size={ICON_SIZE} />
      </div>
      <span className="desktop-icon__label">{label}</span>
    </div>
  );
}
