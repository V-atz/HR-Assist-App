import React, { useState } from "react";
import DateTimeSlot from "./components/DateTimeSlot";
import ScheduledInterview from "./components/ScheduledInterview";

function App() {
  const [active, setActive] = useState(null);

  const handleBookSlot = () => {
    setActive(active === "bookSlot" ? null : "bookSlot");
  };

  const handleScheduleInterview = () => {
    setActive(active === "scheduledInterview" ? null : "scheduledInterview");
  };

  return (
    <>
      <div className="w-full text-3xl font-bold flex m-2 p-5 justify-center items-center">
        Interview Scheduler
      </div>
      <div className="flex gap-5 justify-center mb-6">
        <button
          onClick={handleBookSlot}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {active === "bookSlot" ? "Hide Slot Booking" : "Book Slots"}
        </button>
        <button
          onClick={handleScheduleInterview}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
        >
          {active === "scheduledInterview"
            ? "Hide Scheduled Interviews"
            : "Scheduled Interviews"}
        </button>
      </div>
      {active === "bookSlot" && <DateTimeSlot />}
      {active === "scheduledInterview" && <ScheduledInterview />}
    </>
  );
}

export default App;