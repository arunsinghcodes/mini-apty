interface Walkthrough {
  _id: string;
  title: string;
  origin: string;
  pathPattern: string;
}

interface Props {
  walkthrough: Walkthrough;
  onPlay: (id: string) => void;
  onDelete: (id: string) => void;
}

function WalkthroughCard({
  walkthrough,
  onPlay,
  onDelete,
}: Props) {
  return (
    <div className="walkthrough-card">
      <div className="walkthrough-header">
        <h3>{walkthrough.title}</h3>
      </div>

      <p className="walkthrough-origin">
        🌐 {walkthrough.origin}
      </p>

      <p className="walkthrough-path">
        📄 {walkthrough.pathPattern}
      </p>

      <div className="walkthrough-actions">
        <button
          className="play-btn"
          onClick={() => onPlay(walkthrough._id)}
        >
          ▶ Play
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(walkthrough._id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default WalkthroughCard;