export function createOverlay() {
  const existing = document.getElementById("mini-apty-overlay");

  if (existing) {
    return existing as HTMLDivElement;
  }

  const overlay = document.createElement("div");

  overlay.id = "mini-apty-overlay";

  overlay.innerHTML = `
<div class="mini-apty-header">
  <div class="mini-apty-logo">
    🚀 Mini <span>Apty</span>
  </div>

  <div id="mini-apty-step" class="mini-apty-step">
    Step 1 of 5
  </div>
</div>

<div class="mini-apty-body">
  <div id="mini-apty-description" class="mini-apty-description">
    Follow the highlighted element to continue this walkthrough.
  </div>
</div>

<div class="mini-apty-footer">
  <button id="mini-apty-prev" class="mini-apty-btn secondary">
    ← Previous
  </button>

  <button id="mini-apty-next" class="mini-apty-btn primary">
    Next →
  </button>
</div>

<button id="mini-apty-close" class="mini-apty-close">
  Exit Walkthrough
</button>
  `;

  document.body.appendChild(overlay);

  return overlay;
}
