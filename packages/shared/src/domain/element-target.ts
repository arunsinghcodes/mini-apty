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

// export interface ElementTarget {
//   tagName: string;
//   id?: string;
//   name?: string;
//   role?: string;
//   ariaLabel?: string;
//   placeholder?: string;
//   accessibleText?: string;
//   classNames: string[];
//   dataAttributes: Record<string, string>;
//   cssSelector?: string;
//   xpath?: string;
//   strategy:
//     | "id"
//     | "data"
//     | "aria"
//     | "name"
//     | "text"
//     | "css"
//     | "xpath";
//   confidence: number;
// }