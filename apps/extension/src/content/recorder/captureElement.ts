import { getCssSelector } from "../../utils/cssSelector";

export interface ElementTarget {
  tagName: string;
  id?: string;
  name?: string;
  role?: string;
  ariaLabel?: string;
  placeholder?: string;
  accessibleText?: string;
  classNames: string[];
  dataAttributes: Record<string, string>;
  cssSelector?: string;
  xpath?: string;
  strategy: "id" | "data" | "aria" | "name" | "text" | "css" | "xpath";
  confidence: number;
}

export function captureElement(element: HTMLElement): ElementTarget {
  const dataAttributes: Record<string, string> = {};

  Array.from(element.attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) {
      dataAttributes[attr.name] = attr.value;
    }
  });

  let strategy: ElementTarget["strategy"] = "css";
  let confidence = 0.5;
  let cssSelector = getCssSelector(element);

  if (element.id) {
    cssSelector = `#${CSS.escape(element.id)}`;
    strategy = "id";
    confidence = 1;
  } else if (element.getAttribute("data-testid")) {
    cssSelector = `[data-testid="${element.getAttribute("data-testid")}"]`;

    strategy = "data";
    confidence = 0.95;
  } else if (element.getAttribute("data-cy")) {
    cssSelector = `[data-cy="${element.getAttribute("data-cy")}"]`;

    strategy = "data";
    confidence = 0.95;
  } else if (element.getAttribute("aria-label")) {
    cssSelector = `[aria-label="${element.getAttribute("aria-label")}"]`;

    strategy = "aria";
    confidence = 0.9;
  } else if (element.getAttribute("name")) {
    cssSelector = `[name="${element.getAttribute("name")}"]`;

    strategy = "name";
    confidence = 0.85;
  }

  return {
    tagName: element.tagName,
    id: element.id || undefined,
    classNames: [...element.classList],
    accessibleText:
      element.innerText?.trim()?.replace(/\s+/g, " ")?.substring(0, 100) ||
      undefined,
    ariaLabel: element.getAttribute("aria-label") || undefined,
    role: element.getAttribute("role") || undefined,
    name: element.getAttribute("name") || undefined,
    placeholder: element.getAttribute("placeholder") || undefined,
    cssSelector,
    xpath: "",
    dataAttributes,
    strategy,
    confidence,
  };
}
