import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { Terminology } from "../../components/Terminology.tsx"
import { TerminologyCard } from "../../islands/Terminologies.tsx";


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
      <div class="font-serif text-center text-gray-600 p-10">
        <h2 class="text-xl font-semibold text-red-600 mb-4">Terminology not found</h2>
        <a href="/terminologies" class="text-blue-600 underline">
          Back to list
        </a>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data.term}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:wght@400;600&display=swap"
          rel="stylesheet" />
      </Head>
      <TerminologyCard {...data}/>
    </>
  );
}
