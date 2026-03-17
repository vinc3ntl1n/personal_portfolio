import { useRef, useState, useEffect, useCallback } from 'react';
import SketchIcon from './SketchIcon';
import './Window.css';

const MENU_BAR_HEIGHT = 56;
const MIN_WIDTH = 280;
const MIN_HEIGHT = 200;
const WINDOW_MARGIN = 12;

export default function Window({
  id,
  title,
  children,
  x = 100,
  y = 60,
  width: initialWidth = 460,
  height: initialHeight = 380,
  zIndex = 100,
  variant = 'clean',
  onClose,
  onFocus,
  onPositionChange,
}) {
  const windowRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0 });
  const resizeRef = useRef({ resizing: false, startX: 0, startY: 0, startW: 0, startH: 0 });

  const [pos, setPos] = useState({ x, y });
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const [closing, setClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    onFocus && onFocus();

    dragRef.current = {
      dragging: true,
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };

    const handleMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragRef.current.startX));
      const newY = Math.max(MENU_BAR_HEIGHT, Math.min(window.innerHeight - 50, e.clientY - dragRef.current.startY));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      dragRef.current.dragging = false;
      onPositionChange && onPositionChange(pos.x, pos.y);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isMobile, onFocus, onPositionChange, pos]);

  const handleResizeMouseDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    onFocus && onFocus();

    resizeRef.current = {
      resizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.w,
      startH: size.h,
      originX: pos.x,
      originY: pos.y,
    };

    const handleMouseMove = (e) => {
      if (!resizeRef.current.resizing) return;
      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      const maxWidth = Math.max(
        MIN_WIDTH,
        window.innerWidth - resizeRef.current.originX - WINDOW_MARGIN,
      );
      const maxHeight = Math.max(
        MIN_HEIGHT,
        window.innerHeight - resizeRef.current.originY - WINDOW_MARGIN,
      );
      const newW = Math.min(
        Math.max(MIN_WIDTH, resizeRef.current.startW + dx),
        maxWidth,
      );
      const newH = Math.min(
        Math.max(MIN_HEIGHT, resizeRef.current.startH + dy),
        maxHeight,
      );
      setSize({ w: newW, h: newH });
    };

    const handleMouseUp = () => {
      resizeRef.current.resizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onFocus, pos, size]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  const handleWindowClick = () => {
    onFocus && onFocus();
  };

  const frameClass = variant === 'wobbly' ? 'window--wobbly' : 'window--clean';

  if (isMobile) {
    return (
      <div
        className={`window window--mobile ${frameClass}`}
        style={{ zIndex }}
        onClick={handleWindowClick}
        ref={windowRef}
      >
        <div className="window__titlebar">
          <button className="window__close" onClick={handleClose}>
            <SketchIcon name="close" size={14} />
          </button>
          <span className="window__title">{title}</span>
        </div>
        <div className="window__content">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`window ${frameClass} ${closing ? 'window--closing' : 'window--opening'}`}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex,
      }}
      onClick={handleWindowClick}
      ref={windowRef}
    >
      <div className="window__titlebar crosshatch" onMouseDown={handleMouseDown}>
        <button className="window__close" onClick={handleClose}>
          <SketchIcon name="close" size={14} />
        </button>
        <span className="window__title">{title}</span>
      </div>

      <div className="window__content">
        {children}
      </div>

      <div className="window__bottom-chrome">
        <div
          className="window__resize-handle"
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    </div>
  );
}
