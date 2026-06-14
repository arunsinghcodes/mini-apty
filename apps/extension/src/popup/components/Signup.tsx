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
      <div className="header">
        <h1>
          <span className="mini">Mini</span> <span className="apty">Apty</span>
        </h1>

        <p className="subtitle">Digital Adoption Platform</p>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Create your account ✨</h2>

        <p className="auth-description">
          Start creating and managing interactive walkthroughs in minutes.
        </p>

        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="divider"></div>

        <div className="switch-text">Already have an account?</div>

        <button className="switch-btn" onClick={onBackToLogin}>
          Sign In →
        </button>
      </div>

      <div className="footer">Secure authentication powered by JWT</div>
    </div>
  );
}
