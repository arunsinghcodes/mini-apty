export interface ElementTarget {
  tagName: string;
  id?: string;
  dataTestId?: string;
  role?: string;
  ariaLabel?: string;
  accessibleText?: string;
  classNames: string[];
  dataAttributes: Record<string, string>;
  cssSelector?: string;
}