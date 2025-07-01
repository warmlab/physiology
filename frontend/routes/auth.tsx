/** routes/auth.tsx */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

import AuthForm from "../islands/Auth.tsx";
import Navigator from "../islands/Navigator.tsx"

export default function AuthPage() {
  return (
    <>
    <Head>
      <title>Muscles Study</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Lora:wght@400;600&display=swap"
          rel="stylesheet" />
    </Head>
    <Navigator />
    <div class="min-h-screen">
      <AuthForm />
    </div></>
  );
}
