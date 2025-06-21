import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
// import { Handlers, PageProps } from "$fresh/server.ts";

import { TerminologyList } from "../../islands/Terminologies.tsx";
import Navigator from "../../islands/Navigator.tsx"


/*
export const handler: Handlers<Terminology[] | []> = {
  async GET(_req, ctx) {
    //const url = new URL(req.url);
    //const slug = url.searchParams.get("slug");
    //if (!slug) {
    //  return ctx.render(null);

    const res = await fetch(`/api/terminology/list?page=1`);
    if (!res.ok) {
      return ctx.render([]);
    }

    const data: Terminology[] = await res.json();
    return ctx.render(data);
  },
};*/


export default function TerminologiesPage() {
  return (
    <>
    <Head>
      <title>Terminology Study</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:wght@400;600&display=swap"
          rel="stylesheet" />
    </Head>
    <Navigator />
    <TerminologyList />
    </>
  );
}
