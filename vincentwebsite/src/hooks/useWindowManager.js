import { useState, useCallback, useRef } from 'react';

export default function useWindowManager(initialState = {}) {
  const {
    openWindows: initialOpenWindows = [],
    positions: initialPositions = {},
    zOrder: initialZOrder = [],
  } = initialState;

  const [openWindows, setOpenWindows] = useState(() => new Set(initialOpenWindows));
  const [positions, setPositions] = useState(initialPositions);
  const [zOrder, setZOrder] = useState(initialZOrder);
  
  const nextZ = useRef(100);

  const openWindow = useCallback((id) => {
    setOpenWindows(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    setPositions(prev => {
      if (prev[id]) return prev;
      const offset = Object.keys(prev).length * 30;
      return {
        ...prev,
        [id]: {
          x: 180 + offset,
          y: 60 + offset,
        }
      };
    });

    bringToFront(id);
  }, []);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setZOrder(prev => prev.filter(wId => wId !== id));
  }, []);

  const bringToFront = useCallback((id) => {
    nextZ.current += 1;
    setZOrder(prev => {
      const filtered = prev.filter(wId => wId !== id);
      return [...filtered, id]; 
    });
  }, []);

  const updatePosition = useCallback((id, x, y) => {
    setPositions(prev => ({
      ...prev,
      [id]: { x, y }
    }));
  }, []);

  const getZIndex = useCallback((id) => {
    const idx = zOrder.indexOf(id);
    return idx === -1 ? 100 : 100 + idx;
  }, [zOrder]);

  return {
    openWindows,
    positions,
    openWindow,
    closeWindow,
    bringToFront,
    updatePosition,
    getZIndex,
  };
}
