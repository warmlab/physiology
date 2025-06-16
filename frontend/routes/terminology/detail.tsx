import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Terminology } from "../../components/Terminology.tsx"
import { TerminologyCard } from "../../islands/terminologies.tsx";


export const handler: Handlers<Terminology | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) return ctx.render(null);

    const res = await fetch('http://localhost:8000/terminology/detail/anaplasia');
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
    <TerminologyCard {...data}/>
  );
}
