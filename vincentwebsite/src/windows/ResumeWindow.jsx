import SketchIcon from '../components/SketchIcon';

const RESUME_FILE = '/resume.pdf';

export default function ResumeWindow() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_FILE;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-window">
      <div className="resume-window__header">
        <h2>Resume</h2>
        <button onClick={handleDownload} className="decker-btn" style={{ fontSize: '19px' }}>
          <SketchIcon name="download" size={18} />
          Download PDF
        </button>
      </div>

      <div className="resume-viewer">
        <object
          data={`${RESUME_FILE}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          type="application/pdf"
          style={{
            border: 'none',
            background: 'transparent',
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.7,
            padding: '18px',
            border: '2px solid var(--fg)',
            background: 'var(--bg)',
          }}>
            <p style={{ marginBottom: '12px' }}>
              Your browser cannot display the PDF inline—please download it instead.
            </p>
            <button onClick={handleDownload} className="decker-btn" style={{ fontSize: '20px' }}>
              <SketchIcon name="download" size={18} />
              Download Resume PDF
            </button>
          </div>
        </object>
      </div>
    </div>
  );
}
