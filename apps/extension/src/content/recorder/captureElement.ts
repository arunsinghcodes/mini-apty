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
  strategy:
    | "id"
    | "data"
    | "aria"
    | "name"
    | "text"
    | "css"
    | "xpath";
  confidence: number;
}

export function captureElement(element: HTMLElement) {
  const dataAttributes: Record<string, string> = {};

  Array.from(element.attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) {
      dataAttributes[attr.name] = attr.value;
    }
  });

  return {
    tagName: element.tagName,
    id: element.id || undefined,
    classNames: [...element.classList],
    accessibleText: element.innerText?.trim(),
    ariaLabel: element.getAttribute("aria-label") || undefined,
    role: element.getAttribute("role") || undefined,
    name: element.getAttribute("name") || undefined,
    placeholder: element.getAttribute("placeholder") || undefined,
    cssSelector: getCssSelector(element),
    xpath: "",
    dataAttributes,
  };
}
