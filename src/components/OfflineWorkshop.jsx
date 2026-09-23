function OfflineWorkshop({ onSelect }) {
  return (
    <section className="experience-section" id="workshop">
      <div className="experience-image">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85"
          alt="Offline workshop in nature"
        />
      </div>

      <div className="experience-content">
        <p className="eyebrow">OFFLINE WORKSHOP</p>

        <h2>
          Experience the
          <br />
          method in person.
        </h2>

        <p>
          Five days of immersive, hands-on training with food,
          accommodation and training included in the fee.
        </p>

        <div className="experience-meta">
          <div>
            <span>DURATION</span>
            <strong>5 DAYS</strong>
          </div>
          <div>
            <span>FORMAT</span>
            <strong>IN PERSON</strong>
          </div>
          <div>
            <span>FEE</span>
            <strong>₹1,00,000</strong>
          </div>
        </div>

        <button className="outline-button" onClick={onSelect}>
          CHOOSE YOUR DATE →
        </button>
      </div>
    </section>
  );
}

export default OfflineWorkshop;
