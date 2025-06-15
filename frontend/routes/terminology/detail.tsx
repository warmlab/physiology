import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import {Terminology} from "../components/Terminology.tsx"


export const handler: Handlers<Terminology | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) return ctx.render(null);

    const res = await fetch(`http://localhost:8000/terminologies/${slug}`);
    if (!res.ok) return ctx.render(null);

    const data: Terminology = await res.json();
    return ctx.render(data);
  },
};

export default function TerminologyPage({ data }: PageProps<Terminology | null>) {
  if (!data) {
    return (
      <div class="text-center text-gray-600 p-10">
        <h2 class="text-xl font-semibold text-red-600 mb-4">Terminology not found</h2>
        <a href="/terminologies" class="text-blue-600 underline">
          Back to list
        </a>
      </div>
    );
  }

  return (
    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-blue-800 mb-4">{data.name}</h1>
      {data.description && (
        <div class="mb-4">
          <p class="text-gray-800 whitespace-pre-line">{data.description}</p>
        </div>
      )}
      {data.note && (
        <div>
          <h2 class="font-semibold text-gray-700 mb-1">Note</h2>
          <p class="text-gray-800 whitespace-pre-line">{data.note}</p>
        </div>
      )}
    </div>
  );
}
