import { useEffect, useState } from "react";
import { getToken } from "./storage/auth";
import { useAuthStore } from "./store/authStore";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
// @ts-ignore: Enable side-effect CSS import in TypeScript
import "./popup.css";

function App() {
  const restore = useAuthStore((state) => state.restore);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const storage = await chrome.storage.local.get(null);

        console.log("RAW STORAGE:", storage);

        const token = storage.token ?? null;

        console.log("TOKEN:", token);

        restore((token as string | undefined) ?? null);
      } catch (error) {
        console.error("Failed to restore auth:", error);

        restore(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [restore]);

  if (loading) {
    return (
      <div className="popup-container">
        <h2>🚀 Mini Apty</h2>
        <p className="subtitle">Loading...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Home />;
  }

  return showSignup ? (
    <Signup onBackToLogin={() => setShowSignup(false)} />
  ) : (
    <Login onSignup={() => setShowSignup(true)} />
  );
}

export default App;
