import { h } from "preact";

export default function Foot() {
  const year = new Date().getFullYear();
  return (
    <footer class="mt-12 border-t pt-6 text-sm text-gray-600 text-center bg-gray-50 p-6">
      <div class="container mx-auto px-4">
        <p>&copy; {year} ArcticCircle.work — All rights reserved.</p>
        <p class="mt-2">
          Built with{" "}
          <a
            href="https://fresh.deno.dev"
            target="_blank"
            class="text-sky-600 hover:underline"
          >
            Deno Fresh
          </a>{" "}
          &{" "}
          <a
            href="https://fastapi.tiangolo.com/"
            target="_blank"
            class="text-sky-600 hover:underline"
          >
            FastAPI
          </a>
        </p>
        <div class="mt-2 space-x-4">
          <a href="/" class="hover:text-sky-600">Home</a>
          <a href="/muscles" class="hover:text-sky-600">Muscles</a>
          <a href="/terminologies" class="hover:text-sky-600">Terminologies</a>
        </div>
      </div>
    </footer>
  );
}
