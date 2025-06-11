import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Muscle, MuscleCard } from "../components/Muscle.tsx";

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
