import TrainingCard from "./TrainingCard";

const trainings = [
  {
    title: "Crash Course",
    duration: "2 HOURS",
    description:
      "Learn the basics and implementation of the Miyawaki Method.",
    price: "3,500",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Detailed Training",
    duration: "4 HOURS",
    description:
      "A deeper training experience to understand the methodology.",
    price: "5,500",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "In-depth Training",
    duration: "8 HOURS · 2 DAYS",
    description:
      "Know everything about the Method through an immersive learning experience.",
    price: "9,999",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    featured: true
  }
];

function Trainings({ onSelectTraining }) {
  return (
    <section className="trainings-section" id="trainings">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LEARN WITH AFFORESTT</p>
          <h2>
            Choose your
            <br />
            training.
          </h2>
        </div>

        <p>
          From a two-hour introduction to a complete
          hands-on experience, choose the training that
          fits your journey.
        </p>
      </div>

      <div className="training-grid">
        {trainings.map((training) => (
          <TrainingCard
            key={training.title}
            {...training}
            onSelect={() => onSelectTraining(training)}
          />
        ))}
      </div>
    </section>
  );
}

export default Trainings;
