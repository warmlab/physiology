import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import Foot  from "../components/Foot.tsx";
import { Dumbbell, BookOpen } from "lucide-preact"

export default function Home() {
  return (
    <>
      <Head>
        <title>Anatomy & Physiology</title>
      </Head>
      <div class="min-h-screen flex flex-col bg-gray-100">
        <main class="flex-grow flex flex-col items-center justify-center p-4">
          <h2 class="text-3xl font-bold mb-8 text-blue-800 text-center leading-snug">
            Principles of <br />Anatomy & Physiology
          </h2>

          <div class="flex flex-col sm:flex-row gap-6">
            <a
              href="/muscles"
              class="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition transform hover:scale-105"
            >
              <Dumbbell class="w-5 h-5" />
              Muscles
            </a>
            <a
              href="/terminologies"
              class="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition transform hover:scale-105"
            >
              <BookOpen class="w-5 h-5" />
              Medical Terminology
            </a>
          </div>
        </main>

        <Foot />
      </div>
    </>
  );
}
