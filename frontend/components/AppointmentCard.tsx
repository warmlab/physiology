// components/AppointmentCard.tsx
import { h } from "preact";

export type Appointment = {
  id: number;
  title: string;
  time: string;
  clientName?: string;
  status: "available" | "booked";
};

export default function AppointmentCard(props: { appointment: Appointment }) {
  const { id, title, time, clientName, status } = props.appointment;

  const isBooked = status === "booked";
  return (
    <div
      class={`p-4 border rounded-2xl shadow-md bg-white space-y-2 transition duration-300 ${
        isBooked ? "opacity-70" : "hover:shadow-xl"
      }`}
    >
      <h2 class="text-xl font-semibold text-primary">{title}</h2>
      <p class="text-gray-600">{time}</p>
      {isBooked ? (
        <p class="text-red-600">Booked by {clientName}</p>
      ) : (
        <p class="text-green-600">Available</p>
      )}
    </div>
  );
}
