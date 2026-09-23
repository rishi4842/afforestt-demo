function Testimonials() {
  const voices = [
    {
      quote:
        "Native forests are essential for restoring ecological balance and nurturing biodiversity.",
      source: "AFFORESTT · THE METHOD"
    },
    {
      quote:
        "Forests grow by working in harmony with local soil, climate, water and wildlife.",
      source: "AFFORESTT · FIELD PRACTICE"
    },
    {
      quote:
        "A global community dedicated to forest restoration can turn learning into living landscapes.",
      source: "AFFORESTT · COMMUNITY"
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonial-heading">
        <p className="eyebrow">FROM THE AFFORESTT COMMUNITY</p>
        <h2>Why the method matters.</h2>
      </div>

      <div className="testimonial-grid">
        {voices.map((voice) => (
          <article className="testimonial-card" key={voice.source}>
            <span className="quote">“</span>
            <p>{voice.quote}</p>
            <div className="testimonial-author">
              <div className="author-line"></div>
              <strong>{voice.source}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
