import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Muscle, MuscleCard } from "../components/muscle.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const res = await fetch("http://localhost:8000/muscles");
    const data = await res.json();
    return ctx.render(data as Muscle[]);
  },
};

export default function Home(props: PageProps<Muscle[]>) {
  return (
    <div>
    {props.data.map((a) => (
      MuscleCard(a)
    ))}</div>
  );
}
  /*
export default function Home() {
  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-primary">Massage Appointment System</h1>
      <p class="text-lg text-gray-600 mt-4">Book your session today</p>
      <a href="/book" class="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-blue-500">
        Book Now
      </a>
    </div>
  );
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}*/
