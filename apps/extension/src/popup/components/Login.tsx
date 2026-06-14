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
      <h1>🚀 Mini Apty</h1>

      <p className="subtitle">Welcome back</p>

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

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="switch-text">Don't have an account?</div>

      <button className="switch-btn" onClick={onSignup}>
        Create Account
      </button>
    </div>
  );
}

export default Login;
