import { useState } from "react";

function getFridays() {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (date.getDay() === 5) {
      dates.push(date);
    }
  }

  return dates;
}

function DateSelector({ selectedTraining }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const fridays = getFridays();

  return (
    <section className="date-section" id="dates">
      <div className="date-heading">
        <p className="eyebrow">BOOK YOUR SESSION</p>

        <h2>
          Choose your
          <br />
          Friday.
        </h2>

        <p>
          Training sessions are available every Friday
          evening. Select a date that works for you.
        </p>
      </div>

      <div className="date-panel">
        <div className="date-grid">
          {fridays.map((date) => {
            const selected =
              selectedDate?.toDateString() ===
              date.toDateString();

            return (
              <button
                key={date.toISOString()}
                className={selected ? "date-card selected" : "date-card"}
                onClick={() => setSelectedDate(date)}
              >
                <span>FRI</span>
                <strong>{date.getDate()}</strong>
                <small>
                  {date.toLocaleDateString("en-IN", {
                    month: "short"
                  })}
                </small>
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="booking-summary">
            <div>
              <p>SELECTED DATE</p>
              <h3>
                {selectedDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long"
                })}
              </h3>
            </div>

            <div>
              <p>TRAINING</p>
              <h3>
                {selectedTraining
                  ? selectedTraining.title
                  : "Select a training"}
              </h3>
            </div>

            <button className="dark-button">
              CONTINUE TO BOOKING →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DateSelector;
