import { removeToken } from "../storage/auth";
import { useAuthStore } from "../store/authStore";

function Home() {
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await removeToken();

    logout();
  }

  return (
    <div className="popup-container">
      <h1>🚀 Mini Apty</h1>

      <p className="subtitle">Create and manage your walkthroughs</p>

      <button className="home-btn">🎥 Start Recording</button>

      <button className="home-btn">⏹ Stop Recording</button>

      <button className="home-btn">📚 My Walkthroughs</button>

      <div className="divider"></div>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Home;
