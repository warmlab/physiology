import { Head } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";

import { AuthSuccess } from "../../islands/Auth.tsx";

export default function SuccessPage() {
  return (
    <>
      <Head>
        <title>Login Successful</title>
      </Head>
      <div class="min-h-screen bg-green-50 flex items-center justify-center px-4">
	<AuthSuccess />
      </div>
    </>
  );
}
