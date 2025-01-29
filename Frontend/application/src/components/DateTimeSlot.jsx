import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function DateTimeSlot() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // time ranges
  const availableTimes = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const confirmSlot = async () => {
    if (!startTime || !endTime || !selectedDate) return;

    try {
      const response = await axios.post("http://localhost:3000/api/slots", {
        startTime,
        endTime,
        date: selectedDate.toDateString(),
      });
      if (response.status === 201) {
        alert("Slot created successfully!");
      }
      if (response.status === 400) {
        alert("Slot already exist")
      }
    } catch (error) {
      alert("Slot already exist");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStartTime("");
    setEndTime("");
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime("");
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div className="mx-10 p-4">
      <h1 className="text-2xl font-semibold mb-6">Interview Scheduling</h1>

      <div className="flex gap-10">
        {/* Date */}
        <div>
          <h2 className="text-xl font-medium mb-4">Select Date</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="mb-6"
          />
        </div>

        {/* Time */}
        {selectedDate && (
          <div>
            <div className="flex text-lg mb-4">
              <p>Select Time Slot for</p> &nbsp;{" "}
              <p className="text-blue-700 font-medium">
                {selectedDate.toDateString()}
              </p>
            </div>

            <div className="flex gap-6 mb-4">
              <div>
                <label className="block text-lg">Start Time</label>
                <select
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="">Select Start Time</option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg">End Time</label>
                <select
                  value={endTime}
                  onChange={handleEndTimeChange}
                  className="p-2 border rounded-lg"
                  disabled={!startTime}
                >
                  <option value="">Select End Time</option>
                  {availableTimes
                    .map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {startTime && endTime && (
              <div className="mt-4">
                <div className="flex text-lg">
                  <p>Time Slot:</p> &nbsp;
                  <p className="font-medium text-blue-700">
                    {startTime} - {endTime}
                  </p>
                </div>
                <button
                  className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={confirmSlot}
                >
                  Confirm Slot
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DateTimeSlot;