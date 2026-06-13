export function updateOverlay(
  current: number,
  total: number,
  description: string
) {
  const step = document.getElementById(
    "mini-apty-step"
  );

  const body = document.getElementById(
    "mini-apty-description"
  );

  if (step) {
    step.textContent = `Step ${current} of ${total}`;
  }

  if (body) {
    body.textContent = description;
  }
}