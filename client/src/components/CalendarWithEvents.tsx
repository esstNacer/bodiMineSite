import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Tooltip } from "react-tooltip";
import "react-calendar/dist/Calendar.css";
import "react-tooltip/dist/react-tooltip.css"; // important

type Event = {
  date_line: string;
  first_name: string;
  last_name: string;
};

export default function CalendarWithEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/admin/calendar")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Erreur calendrier :", err));
  }, []);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const tileContent = ({ date }: { date: Date }) => {
    const formatted = formatDate(date);
    const matches = events.filter(
      (ev) => ev.date_line.slice(0, 10) === formatted
    );

    if (matches.length > 0) {
      const tooltipText = matches
        .map((ev) => `${ev.first_name} ${ev.last_name}`)
        .join(", ");

      return (
        <div
          data-tooltip-id="calendar-tooltip"
          data-tooltip-content={tooltipText}
          className="relative"
        >
          <span className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full"></span>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Calendar tileContent={tileContent} />
      <Tooltip id="calendar-tooltip" place="top" />
    </>
  );
}
