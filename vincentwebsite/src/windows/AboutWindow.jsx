//this is the for the about window

export default function AboutWindow() {
  return (
    <div className="about-window">
      <h2 className="about-window__title">Vincent Lin</h2>

      <div className="about-window__intro">
        <img
          src="/headshot.jpg"
          alt="Vincent Lin headshot"
          className="about-window__photo"
        />

        <p>
          Hello, I'm Vincent Lin, a 3rd-year Computer Science major with a minor in 
          Electrical Engineering at the University of Florida. I have a particular 
          interest in C++, low-level programming, and computer architecture. I'm eager 
          to deepen my understanding of systems-level development and just continuing 
          to learn.
        </p>

        <p>
          Outside of class, I enjoy cycling, gaming, collecting vinyl records, video editing, and going to the gym.
        </p>
      </div>
    </div>
  );
}

//extra add later 
//Recently, I've also started watching a lot more movies, so any recommendations are greatly appreciated.