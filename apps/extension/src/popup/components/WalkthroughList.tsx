import { useEffect, useState } from "react";
import { deleteWalkthrough, getWalkthroughs } from "../../api/walkthroughApi";
import WalkthroughCard from "./WalkthroughCard";

interface Walkthrough {
  _id: string;
  title: string;
  origin: string;
  pathPattern: string;
}

interface Props {
  onBack: () => void;
}

function WalkthroughList({ onBack }: Props) {
  const [walkthroughs, setWalkthroughs] = useState<Walkthrough[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchWalkthroughs() {
  //     try {
  //       const data = await getWalkthroughs();
  //       console.log("Walkthroughs:", data);
  //       setWalkthroughs(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchWalkthroughs();
  // }, []);

  useEffect(() => {
  async function fetchWalkthroughs() {
    try {
      const data = await getWalkthroughs();

      console.log("API Response:", data);
      console.log("Is Array:", Array.isArray(data));

      setWalkthroughs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchWalkthroughs();
}, []);

  async function handlePlay(id: string) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab.id) return;

    await chrome.tabs.sendMessage(tab.id, {
      type: "PLAY_WALKTHROUGH",
      walkthroughId: id,
    });
  }

  async function handleDelete(id: string) {
    await deleteWalkthrough(id);

    setWalkthroughs((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <div className="popup-container">
      <h2>📚 My Walkthroughs</h2>

      <button className="switch-btn" onClick={onBack}>
        ← Back
      </button>

      {loading && <p>Loading walkthroughs...</p>}

      {!loading && walkthroughs.length === 0 && (
        <p className="subtitle">No walkthroughs found.</p>
      )}

      {!loading &&
        walkthroughs.map((walkthrough) => (
          <WalkthroughCard
            key={walkthrough._id}
            walkthrough={walkthrough}
            onPlay={handlePlay}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default WalkthroughList;
