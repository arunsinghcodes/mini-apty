export function findElement(step: any): Element | null {
  if (step.id) {
    const element = document.getElementById(step.id);

    if (element) {
      return element;
    }
  }

  if (step.cssSelector) {
    const element = document.querySelector(step.cssSelector);

    if (element) {
      return element;
    }
  }

  return null;
}