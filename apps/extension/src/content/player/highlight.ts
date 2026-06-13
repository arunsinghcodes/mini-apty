export function highlightElement(element: HTMLElement) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  element.style.outline = "3px solid red";

  setTimeout(() => {
    element.style.outline = "";
  }, 2000);
}