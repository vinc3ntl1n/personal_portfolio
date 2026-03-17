import mailIcon from '../assets/mail.png';
import mePixel from '../assets/me.png';
import folder from '../assets/projects.png'
import resume from '../assets/resume.png'
import github from '../assets/github.svg'
import gmail from '../assets/gmail.svg'
import link from '../assets/linkedin.png'

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
      <img src={github} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="github" />
    ),

    //linkedin
    linkedin: (
      <img src={link} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="link" />
    ),

    //email
    email: (
      <img src={gmail} width={size} height={size}
           draggable={false}
           style={{ imageRendering: 'pixelated', pointerEvents: 'none' }} alt="gmail" />
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
