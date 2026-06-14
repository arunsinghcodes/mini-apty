export function positionOverlay(element: HTMLElement) {
  const overlay = document.getElementById("mini-apty-overlay");

  if (!overlay) return;

  const rect = element.getBoundingClientRect();

  const popupWidth = 320;
  const popupHeight = 220;
  const gap = 12;

  let top = rect.bottom + gap;
  let left = rect.left;

  // If no space below, show above
  if (top + popupHeight > window.innerHeight) {
    top = rect.top - popupHeight - gap;
  }

  // If no space on right
  if (left + popupWidth > window.innerWidth) {
    left = window.innerWidth - popupWidth - 20;
  }

  // Prevent going off left edge
  if (left < 20) {
    left = 20;
  }

  // Prevent going off top edge
  if (top < 20) {
    top = 20;
  }

  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
}