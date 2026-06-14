import { useState } from "react";

import { signup } from "../services/auth";
import { saveToken } from "../storage/auth";
import { useAuthStore } from "../store/authStore";

interface Props {
  onBackToLogin: () => void;
}

export default function Signup({ onBackToLogin }: Props) {
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const result = await signup({
        name,
        email,
        password,
      });

      await saveToken(result.token);

      login(result.token);
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="popup-container">
      <h1>🚀 Mini Apty</h1>

      <p className="subtitle">Create your account</p>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </button>

      <div className="switch-text">Already have an account?</div>

      <button className="switch-btn" onClick={onBackToLogin}>
        Login
      </button>
    </div>
  );
}
