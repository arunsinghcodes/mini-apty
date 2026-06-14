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
      <div className="header">
        <h1>
          <span className="mini">Mini</span>{" "}
          <span className="apty">Apty</span>
        </h1>

        <p className="subtitle">
          Digital Adoption Platform
        </p>
      </div>

      <button className="home-btn">
        <div className="btn-title">🎥 Start Recording</div>
        <span>Capture a walkthrough on this page</span>
      </button>

      <button className="home-btn">
        <div className="btn-title">⏹ Stop Recording</div>
        <span>Finish the active recording session</span>
      </button>

      <button className="home-btn">
        <div className="btn-title">📚 My Walkthroughs</div>
        <span>Manage and preview saved guides</span>
      </button>

      <div className="divider"></div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

      <div className="footer">
        Mini Apty • Powered by React + MV3
      </div>
    </div>
  );
}

export default Home;