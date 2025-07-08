import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.text();

    const res = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  },
};
