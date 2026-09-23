function TrainingCard({
  title,
  duration,
  description,
  price,
  image,
  featured,
  onSelect
}) {
  return (
    <article className={featured ? "training-card featured" : "training-card"}>
      <div className="training-image">
        <img src={image} alt={title} />
      </div>

      <div className="training-content">
        <p className="training-duration">{duration}</p>

        <h3>{title}</h3>

        <p className="training-description">
          {description}
        </p>

        <div className="training-bottom">
          <span className="price">₹{price}</span>

          <button onClick={onSelect}>
            {title === "Offline Workshop"
              ? "CHOOSE DATE"
              : "BOOK TRAINING"}{" "}
            →
          </button>
        </div>
      </div>
    </article>
  );
}

export default TrainingCard;
