import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DATA_KEY_ATTR } from "$fresh/src/constants.ts";

import { MuscleCard } from "../../islands/Muscle.tsx";
import { Muscle } from "../../types/muscle.ts";


export const handler: Handlers<Muscle | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) {
      return ctx.render(null);
    }
    const blank = url.searchParams.get('blank') || "false";

    const res = await fetch(`http://localhost:8000/muscle/detail/${slug}`);
    if (!res.ok) {
      return ctx.render(null);
    }

    const data: Muscle = await res.json();
    data.blank = blank.toLowerCase() == "true" ? true : false;
    return ctx.render(data);
  },
};

export default function MuscleDetailPage({ data }: PageProps<Muscle | null>) {
  if (!data) {
    return (
      <div class="p-6 max-w-screen-md mx-auto">
        <h1 class="text-red-500 font-bold">Muscle not found or no ID provided</h1>
      </div>
    );
  }

  return (
    <MuscleCard {...data} />
  );
}
