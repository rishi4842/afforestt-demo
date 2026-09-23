function Webinar({ onSelect }) {
  return (
    <section className="experience-section webinar-large" id="webinar">
      <div className="experience-content">
        <p className="eyebrow">MONTHLY WEBINAR</p>

        <h2>
          Learn from
          <br />
          anywhere.
        </h2>

        <p>
          Join our monthly webinar and discover the principles behind
          native forest creation and the Miyawaki Method.
        </p>

        <div className="experience-meta">
          <div>
            <span>NEXT SESSION</span>
            <strong>30 SEPTEMBER</strong>
          </div>
          <div>
            <span>TIME</span>
            <strong>6:30 PM</strong>
          </div>
          <div>
            <span>FEE</span>
            <strong>₹149</strong>
          </div>
        </div>

        <p className="limited">Limited seats available.</p>

        <button className="light-button" onClick={onSelect}>
          RESERVE YOUR SEAT →
        </button>
      </div>

      <div className="experience-image">
        <img
          src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1600&q=85"
          alt="Forest plants"
        />
      </div>
    </section>
  );
}

export default Webinar;
