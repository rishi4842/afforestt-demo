import { useState } from "react";

function CalendarBooking({ selectedTraining }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("en-IN", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];

  const isFriday = (day) =>
    day && new Date(year, month, day).getDay() === 5;

  const isPast = (day) => {
    if (!day) return true;
    const date = new Date(year, month, day);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < startOfToday;
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  return (
    <section className="calendar-section" id="booking">
      <div className="calendar-intro">
        <p className="eyebrow">BOOK YOUR TRAINING</p>
        <h2>
          Choose your
          <br />
          Friday.
        </h2>
        <p>
          Training sessions are available every Friday evening. Select an
          available Friday from the calendar.
        </p>

        {selectedTraining && (
          <div className="selected-training">
            <span>SELECTED TRAINING</span>
            <strong>{selectedTraining.title}</strong>
          </div>
        )}
      </div>

      <div className="calendar">
        <div className="calendar-header">
          <button aria-label="Previous month" onClick={() => changeMonth(-1)}>
            ←
          </button>
          <h3>{monthName} {year}</h3>
          <button aria-label="Next month" onClick={() => changeMonth(1)}>
            →
          </button>
        </div>

        <div className="weekdays">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            const selectable = isFriday(day) && !isPast(day);
            const active = selectedDate?.toDateString() ===
              new Date(year, month, day || 1).toDateString();

            return (
              <button
                key={`${year}-${month}-${index}`}
                disabled={!selectable}
                className={active ? "calendar-day active" : selectable ? "calendar-day friday" : "calendar-day"}
                onClick={() => selectable && setSelectedDate(new Date(year, month, day))}
              >
                {day}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <div className="calendar-confirm">
            <div>
              <span>SELECTED DATE</span>
              <strong>
                {selectedDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long"
                })}
              </strong>
            </div>
            <button>CONTINUE TO BOOKING →</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CalendarBooking;
