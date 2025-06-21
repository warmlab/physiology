/** @fileoverview About Page */

import { Head } from "$fresh/runtime.ts";

import Foot  from "../components/Foot.tsx";
import Navigator from "../islands/Navigator.tsx";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <Navigator />
      <main class="text-gray-800 px-4 py-2 max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-blue-700 mb-6">About This Project</h1>

        <p class="text-lg mb-4">
          <strong>Anatomy & Physiology Study Platform</strong> is a modern educational tool designed to help students learn and review muscle groups, medical terminology, and more — all in an interactive and user-friendly way.
        </p>

        <p class="text-md mb-4">
          Built with 💙 using:
        </p>
        <ul class="list-disc list-inside mb-6 space-y-1 text-md">
          <li>⚡ <strong>FastAPI</strong> — for a powerful, async backend API</li>
          <li>🧬 <strong>Deno + Fresh</strong> — a modern edge-ready frontend framework</li>
          <li>🐘 <strong>PostgreSQL</strong> — for storing structured anatomy content</li>
          <li>🌐 <strong>Nginx</strong> — reverse proxy & frontend delivery</li>
        </ul>

        <p class="text-md mb-4">
          This is an open-source project. The source code is available at:
        </p>

        <p class="text-md mb-6">
          <a
            href="https://github.com/warmlab/physiology"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            https://github.com/warmlab/physiology
          </a>
        </p>

        <p class="text-md mb-6">
          If you would like to contribute or notice any issues, please send an email to:{" "}
          <a
            href="mailto:xusheng.ca@gmail.com"
            class="text-blue-600 hover:underline"
          >
            xusheng.ca@gmail.com
          </a>
        </p>

        <p class="text-sm text-gray-600">
          Version: <code class="bg-gray-100 px-1 py-0.5 rounded">v1.0</code> | Last updated: <code class="bg-gray-100 px-1 py-0.5 rounded">June 2025</code>
        </p>
      </main>
      <Foot />
    </>
  );
}
