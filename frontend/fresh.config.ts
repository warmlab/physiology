import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  plugins: [tailwind()],
  hostname: "0.0.0.0",
  port: Deno.env.get("PORT")
});
