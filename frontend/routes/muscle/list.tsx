import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { MuscleList } from "../../islands/Muscle.tsx";
import Navigator from "../../islands/Navigator.tsx"
{/*
import { Muscle } from "../types/muscle.tsx";

export const handler: Handlers<Muscle[]> = {
  async GET(_, ctx) {
    const res = await fetch("http://localhost:8000/muscles/");
    const data: Muscle[] = await res.json();
    return ctx.render(data);
  },
};
*/}

export default function MusclesPage() {
  return (
    <>
    <Head>
      <title>Muscles Study</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:wght@400;600&display=swap"
          rel="stylesheet" />
    </Head>
    <Navigator />
    <MuscleList />
    </>
  );
   {/*} <div class="p-6 max-w-screen-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">Muscle List</h1>
      <ul class="list-disc pl-5 space-y-2">
        {data.map((muscle) => (
          MuscleItem(muscle.slug, muscle.name)
        ))}
      </ul>
    </div>*/}
}
