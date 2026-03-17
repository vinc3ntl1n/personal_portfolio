import { useState } from 'react';
import { projects } from '../data/projects';
import SketchIcon from '../components/SketchIcon';

export default function ProjectsWindow() {
  const [selectedProject, setSelectedProject] = useState(null);

  // the detailed view
  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    return (
      <div className="projects-detail">
        {/* the back button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="decker-btn"
          style={{ fontSize: '19px', padding: '5px 11px', marginBottom: '14px' }}
        >
          <SketchIcon name="back" size={18} />
          Back
        </button>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          marginBottom: '10px',

        }}>
          {project.name}
        </h2>

        {/* the tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              border: '2px solid var(--fg)',
              padding: '2px 10px',
              background: 'var(--bg)',
    
            }}>
              {t}
            </span>
          ))}
        </div>

        <p style={{ marginBottom: '16px', lineHeight: 1.75 }}>
          {project.description}
        </p>

        <p style={{ marginBottom: '10px', lineHeight: 1.75, opacity: 0.75, fontSize: '0.95em' }}>
          more details for each project will be written later
        </p>

        {/* links */}
        <div style={{
          display: 'flex', gap: '11px', marginTop: '16px',
          borderTop: '2px dashed var(--fg)', paddingTop: '14px',
        }}>
          {project.link && project.link !== '#' && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
               className="decker-btn" style={{ fontSize: '19px' }}>
              <SketchIcon name="external" size={18} />
              Live Site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="decker-btn" style={{ fontSize: '19px' }}>
              <SketchIcon name="github" size={18} />
              GitHub
            </a>
          )}
        </div>
      </div>
    );
  }

  // list view
  return (
    <div className="projects-list">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => setSelectedProject(project.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            width: '100%',
            padding: '11px 12px',
            background: 'var(--bg)',
            border: 'none',
            borderBottom: '2px solid var(--fg)',
            textAlign: 'left',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--fg)',
            transition: 'background 0.08s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--fg)';
            e.currentTarget.style.color = 'var(--bg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--bg)';
            e.currentTarget.style.color = 'var(--fg)';
          }}
        >
          <SketchIcon name="folder" size={32} />
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              marginBottom: '4px',

            }}>
              {project.name}
            </div>
            <div style={{ opacity: 0.75, fontSize: '0.95em', lineHeight: 1.5 }}>
              {project.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
