/** @fileoverview Fresh API route: Proxy to backend Django or FastAPI server */
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req) => {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || "5";
    const page = url.searchParams.get("page") || "1";
    const random: boolean = url.searchParams.get("random").toLowerCase() === 'true' ? true : false;

    // 你的后端地址（开发时可以是 localhost，部署时改成实际域名）
    let backendUrl:string;
    if (random) {
      backendUrl = `http://localhost:8000/muscle/list?limit=${limit}&random=${random}`;
    } else {
      backendUrl = `http://localhost:8000/muscle/list?page=${page}&random=${random}`;
    }

    try {
      const res = await fetch(backendUrl);
      const data = await res.json();

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("[API ERROR] Fetch muscles failed:", err);

      return new Response(JSON.stringify({ error: "Failed to fetch data from backend" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
