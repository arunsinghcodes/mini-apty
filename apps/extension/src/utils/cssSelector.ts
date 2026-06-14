export function getCssSelector(element: HTMLElement): string {
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  const path: string[] = [];

  let current: HTMLElement | null = element;

  while (current && current.tagName.toLowerCase() !== "body") {
    let selector = current.tagName.toLowerCase();

    // Keep only useful classes
    const classes = [...current.classList].filter((cls) => {
      return (
        !cls.startsWith("elementor-") &&
        !cls.startsWith("e-") &&
        !cls.startsWith("wp-") &&
        !cls.startsWith("vc_") &&
        !cls.startsWith("js-") &&
        !cls.startsWith("swiper-") &&
        !cls.startsWith("slick-") &&
        !cls.startsWith("css-") &&
        !/^\d/.test(cls) &&
        cls.length < 40
      );
    });

    if (classes.length > 0) {
      selector += "." + classes.slice(0, 2).join(".");
    }

    path.unshift(selector);

    // Stop early if parent has id
    if (current.parentElement?.id) {
      path.unshift(`#${CSS.escape(current.parentElement.id)}`);
      break;
    }

    current = current.parentElement;
  }

  return path.join(" > ");
}
