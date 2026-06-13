export function getBestElement(
  element: HTMLElement
): HTMLElement {
  const interactive = element.closest(
    `
      button,
      a,
      input,
      textarea,
      select,
      option,
      label,
      [role="button"],
      [role="textbox"],
      [role="link"]
    `
  );

  return (interactive as HTMLElement) || element;
}