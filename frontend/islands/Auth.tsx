/** islands/AuthForm.tsx */
import { useState } from "preact/hooks";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/auth/login_json" : "/auth/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Success");
    } else {
      setMessage(`❌ ${data.detail || "Error"}`);
    }
  };

  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 class="text-2xl font-bold mb-4 text-blue-800">{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        {mode === "register" && (
          <input type="text" name="username" value={formData.username} onInput={handleInput} class="w-full p-2 border rounded" placeholder="Username" />
        )}
        <input type="email" name="email" value={formData.email} onInput={handleInput} class="w-full p-2 border rounded" placeholder="Email" />
        <input type="password" name="password" value={formData.password} onInput={handleInput} class="w-full p-2 border rounded" placeholder="Password" />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      <div class="text-center mt-4">
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} class="text-sm text-blue-600 underline">
          {mode === "login" ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
      {message && <div class="mt-2 text-sm text-gray-600">{message}</div>}

      <div class="mt-4 text-center">
        <a href="/api/auth/google"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Sign in with Google</a>
      </div>
    </div>
  );
}
