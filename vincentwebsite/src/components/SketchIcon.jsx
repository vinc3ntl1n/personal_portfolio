import mailIcon from '../assets/mail.png';
import mePixel from '../assets/me.png';
import folder from '../assets/projects.png'
import resume from '../assets/resume.png'

export default function SketchIcon({ name, size = 48 }) {
  const icons = {
    
    //person icon
    person: (
      <img src={mePixel} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="vincent" />
    ),

    //folder icon
    folder: (
      <img src={folder} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="projectfolder" />
    ),

    //mail icon
    envelope: (
      <img src={mailIcon} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="mail" />
    ),

    //resume icon
    document: (
      <img src={resume} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="resume" />
    ),

    //github
    github: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <path d="M24 4 C12 4 4 13 4 24 C4 33 10 40 18 43 C19 43 20 43 20 42 L20 38 C13 40 12 36 12 36 C11 34 10 33 10 33 C8 32 10 32 10 32 C12 32 14 34 14 34 C16 37 20 36 20 36 L20 34 C14 33 8 30 8 24 C8 21 9 19 11 17 C10 17 9 14 11 10 C11 10 14 10 20 14 C22 13 26 13 28 14 C34 10 37 10 37 10 C39 14 38 17 37 17 C39 19 40 21 40 24 C40 30 34 33 28 34 L28 42 C28 43 29 43 30 43 C38 40 44 33 44 24 C44 13 36 4 24 4 Z" />
      </svg>
    ),

    //linkedin
    linkedin: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <rect x="6" y="6" width="36" height="36" rx="3" />
        <line x1="14" y1="22" x2="14" y2="36" />
        <circle cx="14" cy="16" r="2.5" fill="var(--fg)" strokeWidth="0" />
        <path d="M22 22 L22 36 M22 28 C22 24 26 22 28 22 C32 22 34 24 34 28 L34 36" />
      </svg>
    ),

    //email
    email: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <circle cx="24" cy="24" r="8" />
        <path d="M32 24 C32 30 28 34 24 34 C20 34 16 30 16 24 C16 16 20 10 24 10 C36 10 40 16 40 24 C40 30 38 32 36 32 C34 32 32 30 32 28" />
      </svg>
    ),

    //close
    close: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" shapeRendering="crispEdges">
        <line x1="4" y1="4" x2="12" y2="12" />
        <line x1="12" y1="4" x2="4" y2="12" />
      </svg>
    ),

    back: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <path d="M15 18 L9 12 L15 6" />
      </svg>
    ),

    // download
    download: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <path d="M12 3 L12 15 M7 12 L12 17 L17 12" />
        <path d="M4 20 L20 20" />
      </svg>
    ),

    external: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges">
        <path d="M18 13 L18 19 Q18 21 16 21 L5 21 Q3 21 3 19 L3 8 Q3 6 5 6 L11 6" />
        <path d="M15 3 L21 3 L21 9" />
        <path d="M10 14 L21 3" />
      </svg>
    ),
  };

  return icons[name] || null;
}
