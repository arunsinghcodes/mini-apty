export function getCssSelector(element: HTMLElement): string {
  if (element.id) {
    return `#${element.id}`;
  }

  const path: string[] = [];

  while (element.parentElement && element.tagName.toLowerCase() !== "html") {
    let selector = element.tagName.toLowerCase();

    if (element.classList.length > 0) {
      selector += "." + [...element.classList].join(".");
    }

    path.unshift(selector);

    element = element.parentElement;
  }

  return path.join(" > ");
}
