//this is the for the about window

export default function AboutWindow() {
  return (
    <div className="about-window">
      {/* the title */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '38px',
        marginBottom: '12px',
        borderBottom: '2px solid var(--fg)',
        paddingBottom: '6px',

      }}>
        Vincent Lin
      </h2>

      {/* the bio */}

      <p style={{ marginBottom: '18px', lineHeight: 1.75 }}>
        Hello, I'm Vincent Lin, a 3rd-year Computer Science major with a minor in Electrical Engineering at the 
        University of Florida. I have a particular interest in C++, low-level programming, 
        and computer architecture. I'm eager to deepen my understanding of systems-level development and 
        just continuing to learn.
      </p>

      <p style={{ marginBottom: '18px', lineHeight: 1.75 }}>
        Outside of class, I enjoy cycling, gaming, collecting vinyl records, video editing, and going to the gym. 
        Recently, I've also started watching a lot more movies so any recommendations are greatly appreciated.
      </p>
      

    </div>
  );
}
