import { useState } from "react";

import { login } from "../services/auth.js";
import { useAuthStore } from "../store/authStore";
import { saveToken } from "../storage/auth.js";

interface Props {
  onSignup: () => void;
}

function Login({ onSignup }: Props) {
  const loginStore = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

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

    try {
      setLoading(true);

      const result = await login({
        email,
        password,
      });

      await saveToken(result.token);
      loginStore(result.token);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
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
        <h2 className="auth-title">Welcome back 👋</h2>

        <p className="auth-description">
          Sign in to continue creating and managing walkthroughs.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="divider"></div>

        <div className="switch-text">New to Mini Apty?</div>

        <button className="switch-btn" onClick={onSignup}>
          Create Account →
        </button>
      </div>

      <div className="footer">Secure authentication powered by JWT</div>
    </div>
  );
}

export default Login;
