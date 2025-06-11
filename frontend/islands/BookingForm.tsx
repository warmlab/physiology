// islands/BookingForm.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: name, time }),
      });

      if (!res.ok) throw new Error("Booking failed.");
      setSubmitted(true);
    } catch (err) {
      //setError(err.message);
    }
  };

  if (submitted) {
    return (
      <div class="p-4 text-green-600 bg-green-100 rounded-lg shadow">
        Booking confirmed!
      </div>
    );
  }

  return (
    <form
      class="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 class="text-2xl font-bold text-primary">Book Appointment</h2>

      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          required
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Time</label>
        <input
          class="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          type="datetime-local"
          required
          value={time}
          onInput={(e) => setTime((e.target as HTMLInputElement).value)}
        />
      </div>

      {error && <p class="text-red-500">{error}</p>}

      <button
        type="submit"
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
}
