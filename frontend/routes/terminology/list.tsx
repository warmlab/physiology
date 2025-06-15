import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Terminology } from "../components/Terminology.tsx";


export const handler: Handlers<Terminology[]> = {
  async GET(_, ctx) {
    const res = await fetch("http://localhost:8000/terminologies");
    const data: Terminology[] = await res.json();
    return ctx.render(data);
  },
};

export default function TerminologiesPage({ data }: PageProps<Terminology[]>) {
  return (
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-blue-800">Medical Terminologies</h1>
      <div class="grid sm:grid-cols-2 gap-4">
        {data.map((item) => (
          <a
            href={`/terminology?slug=${item.slug}`}
            class="block p-4 rounded-xl shadow-sm bg-white hover:bg-green-50 hover:shadow-md transition duration-200 border border-gray-200"
          >
            <div class="text-lg font-semibold text-gray-800">{item.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
