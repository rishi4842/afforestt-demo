const images = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=700&q=80"
];

function SocialGallery() {
  return (
    <section className="social-section">
      <div className="social-heading">
        <p className="eyebrow">FOLLOW AFFORESTT</p>
        <h2>
          Life in the
          <br />
          forest.
        </h2>
        <p>
          Follow our work, forests and communities on Instagram.
        </p>
        <a href="https://www.instagram.com/afforestt/" target="_blank" rel="noreferrer">
          @AFFORESTT →
        </a>
      </div>

      <div className="social-grid">
        {images.map((image, index) => (
          <a
            href="https://www.instagram.com/afforestt/"
            target="_blank"
            rel="noreferrer"
            key={image}
            className="social-image"
          >
            <img src={image} alt={`Afforestt forest ${index + 1}`} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default SocialGallery;
