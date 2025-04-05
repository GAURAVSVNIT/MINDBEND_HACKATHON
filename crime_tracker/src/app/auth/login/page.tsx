"use client";

import { useState, FormEvent } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      // Optional: check role from backend
      await fetch("/api/check-role", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
