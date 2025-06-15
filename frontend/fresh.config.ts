import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

// const port = Deno.env.get("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000;

export default defineConfig({
  plugins: [tailwind()],
  hostname: "0.0.0.0",
  port: parseInt(Deno.env.get("PORT") || "3000")
});
