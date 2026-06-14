export function createOverlay() {
  const existing = document.getElementById("mini-apty-overlay");

  if (existing) {
    return existing as HTMLDivElement;
  }

  const overlay = document.createElement("div");

  overlay.id = "mini-apty-overlay";

  overlay.innerHTML = `
    <div class="mini-apty-header">
      🚀 Mini Apty
    </div>

    <div class="mini-apty-body">
      <div id="mini-apty-step">
        Step 1 of 5
      </div>

      <div id="mini-apty-description">
        Click here to continue
      </div>
    </div>

    <div class="mini-apty-footer">
      <button id="mini-apty-prev">
        Previous
      </button>

      <button id="mini-apty-next">
        Next
      </button>

      <button id="mini-apty-close">
        Close
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  return overlay;
}