import { useState, useCallback } from 'react';
import './index.css';
import MenuBar from './components/MenuBar';
import Desktop from './components/Desktop';
import Window from './components/Window';
import useWindowManager from './hooks/useWindowManager';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import ResumeWindow from './windows/ResumeWindow';

const DEFAULT_WINDOW_LAYOUT = {
  openWindows: ['about', 'contact', 'resume'],
  positions: {
    contact: { x: 290, y: 99 },
    resume: { x: 722, y: 175 },
    about: { x: 48, y: 472 },
  },
  zOrder: ['about', 'contact', 'resume'],
};

const WINDOW_CONFIG = {
  about: {
    title: 'About Me',
    variant: 'clean',  
    width: 662,
    height: 387,
    component: AboutWindow,
  },
  projects: {
    title: 'Projects',
    variant: 'clean',   
    width: 432,
    height: 384,
    component: ProjectsWindow,
  },
  contact: {
    title: 'Contact',
    variant: 'wobbly',   
    width: 416,
    height: 359,
    component: ContactWindow,
  },
  resume: {
    title: 'Resume',
    variant: 'clean', 
    width: 725,
    height: 621,
    component: ResumeWindow,
  },
};

export default function App() {
  const wm = useWindowManager(DEFAULT_WINDOW_LAYOUT);

  const [drawMode, setDrawMode] = useState(false);

  const [glitching, setGlitching] = useState(false);

  const handleMenuAction = useCallback((action) => {
    switch (action) {
      case 'download-resume':
        {
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;


      case 'open-about':
        wm.openWindow('about');
        break;
      case 'open-projects':
        wm.openWindow('projects');
        break;
      case 'open-contact':
        wm.openWindow('contact');
        break;
      case 'open-resume':
        wm.openWindow('resume');
        break;

      case 'open-help-about':
        alert('Decker Desktop Portfolio\nBuilt with React + SVG\nInspired by Decker & classic Macintosh');
        break;

      case 'draw-mode':
        setDrawMode(prev => !prev);
        break;

      case 'oops':
        setGlitching(true);
        setTimeout(() => setGlitching(false), 2000);
        break;

      default:
        break;
    }
  }, [wm]);

  return (
    <div className={`app-root${glitching ? ' app-glitch' : ''}`}>
      <div className="app-scale">
        <MenuBar onAction={handleMenuAction} />

        <Desktop onOpenWindow={(id) => wm.openWindow(id)} />

        {Array.from(wm.openWindows).map(id => {
        const config = WINDOW_CONFIG[id];
        if (!config) return null;

        const ContentComponent = config.component;
        const pos = wm.positions[id] || { x: 180, y: 60 };

        return (
          <Window
            key={id}
            id={id}
            title={config.title}
            variant={config.variant}
            width={config.width}
            height={config.height}
            x={pos.x}
            y={pos.y}
            zIndex={wm.getZIndex(id)}
            onClose={() => wm.closeWindow(id)}
            onFocus={() => wm.bringToFront(id)}
            onPositionChange={(x, y) => wm.updatePosition(id, x, y)}
          >
            <ContentComponent />
          </Window>
        );
        })}

        {drawMode && <DrawCanvas onClose={() => setDrawMode(false)} />}
      </div>
    </div>
  );
}



function DrawCanvas({ onClose }) {
  const [drawing, setDrawing] = useState(false);

  const [paths, setPaths] = useState([]);

  const [currentPath, setCurrentPath] = useState([]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    setCurrentPath([{ x: e.clientX, y: e.clientY }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    setCurrentPath(prev => [...prev, { x: e.clientX, y: e.clientY }]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
    if (currentPath.length > 1) {
      setPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath([]);
  };

  const pathToD = (points) => {
    if (points.length < 2) return '';
    return 'M ' + points.map(p => `${p.x} ${p.y}`).join(' L ');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        cursor: 'crosshair',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {paths.map((p, i) => (
          <path
            key={i}
            d={pathToD(p)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        ))}
        {currentPath.length > 1 && (
          <path
            d={pathToD(currentPath)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        )}
      </svg>

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'fixed',
          top: 'calc(var(--menu-bar-height) + 2px)',
          right: '14px',
          padding: '6px 14px',
          background: 'var(--accent)',
          color: 'white',
          border: '2px solid var(--fg)',
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          zIndex: 99999,
          boxShadow: '2px 2px 0px var(--fg)',
        }}
      >
        ✕ Exit Draw Mode
      </button>
    </div>
  );
}
