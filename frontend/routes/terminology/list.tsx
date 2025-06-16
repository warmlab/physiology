import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
// import { Handlers, PageProps } from "$fresh/server.ts";

import { TerminologyList } from "../../islands/Terminologies.tsx";


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
      <title>Terminologies Study</title>
    </Head>
    <TerminologyList />
    </>
  );
}
