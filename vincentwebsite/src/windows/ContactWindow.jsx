import { useState, useCallback } from 'react';
import { links } from '../data/links';
import SketchIcon from '../components/SketchIcon';

export default function ContactWindow() {
  const [obliterated, setObliterated] = useState(false);

  const handleObliterate = useCallback(() => {
    setObliterated(true);
    document.body.style.animation = 'none';
    void document.body.offsetHeight;
    document.body.style.animation = 'screen-shake 0.5s ease';

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const x = 50 + (Math.random() - 0.5) * 20;
      const y = 50 + (Math.random() - 0.5) * 20;
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 0.5) * 200;
      const size = 4 + Math.random() * 10;
      particle.style.cssText = `
        position:absolute;left:${x}%;top:${y}%;
        width:${size}px;height:${size}px;
        background:var(--fg);transition:all 0.8s ease-out;
      `;
      container.appendChild(particle);
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${dx}vw, ${dy}vh)`;
        particle.style.opacity = '0';
      });
    }

    setTimeout(() => {
      container.remove();
      document.body.style.animation = '';
      setObliterated(false);
    }, 1000);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '19px' }}>
        <SketchIcon name="envelope" size={100} />
      </div>

      {/* for the email button */}
      <a
        href={`mailto:${links.email}`}
        className="decker-btn"
        style={{ display: 'inline-flex', marginBottom: '24px', fontSize: '21px' }}
      >
        <SketchIcon name="email" size={24} />
        {links.email}
      </a>

      {/* the rest of the buttons, add twitter if i ever decide to get it */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        gap: '11px', flexWrap: 'wrap', marginBottom: '29px',
      }}>
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer"
             className="decker-btn" style={{ fontSize: '21px' }}>
            <SketchIcon name="github" size={24} />
            GitHub
          </a>
        )}
        {links.linkedin && (
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
             className="decker-btn" style={{ fontSize: '21px' }}>
            <SketchIcon name="linkedin" size={24} />
            LinkedIn
          </a>
        )}
      </div>

    </div>
  );
}
