export function findElement(step: any): Element | null {
  if (!step) {
    return null;
  }

  // console.log("🔍 Finding step:", step);

  // -----------------------
  // 1. Find by ID
  // -----------------------
  if (step.id) {
    const el = document.getElementById(step.id);

    if (el) {
      // console.log("✅ Found by id");
      return el;
    }
  }

  // -----------------------
  // 2. Find by data attributes
  // -----------------------
  if (step.dataAttributes) {
    for (const [key, value] of Object.entries(step.dataAttributes)) {
      try {
        const el = document.querySelector(`[${key}="${value}"]`);

        if (el) {
          // console.log("✅ Found by data attribute");
          return el;
        }
      } catch {}
    }
  }

  // -----------------------
  // 3. Find by aria-label
  // -----------------------
  if (step.ariaLabel) {
    try {
      const el = document.querySelector(`[aria-label="${step.ariaLabel}"]`);

      if (el) {
        // console.log("✅ Found by aria-label");
        return el;
      }
    } catch {}
  }

  // -----------------------
  // 4. Find by name
  // -----------------------
  if (step.name) {
    try {
      const el = document.querySelector(`[name="${step.name}"]`);

      if (el) {
        // console.log("✅ Found by name");
        return el;
      }
    } catch {}
  }

  // -----------------------
  // 5. Find by placeholder
  // -----------------------
  if (step.placeholder) {
    try {
      const el = document.querySelector(`[placeholder="${step.placeholder}"]`);

      if (el) {
        // console.log("✅ Found by placeholder");
        return el;
      }
    } catch {}
  }

  // -----------------------
  // 6. Find by accessible text
  // -----------------------
  if (step.accessibleText) {
    const elements = document.querySelectorAll(step.tagName || "*");

    for (const el of elements) {
      const text = el.textContent?.replace(/\s+/g, " ").trim() || "";

      if (
        text.includes(
          step.accessibleText.replace(/\s+/g, " ").trim().substring(0, 40),
        )
      ) {
        // console.log("✅ Found by accessibleText");
        return el;
      }
    }
  }

  // -----------------------
  // 7. CSS selector (fallback)
  // -----------------------
  if (step.cssSelector) {
    try {
      const el = document.querySelector(step.cssSelector);

      if (el) {
        // console.log("✅ Found by cssSelector");
        return el;
      }
    } catch (err) {
      console.warn("⚠️ Invalid CSS selector:", step.cssSelector);
    }
  }

  console.warn("❌ Element not found");

  return null;
}