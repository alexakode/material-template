// Detect user preferences and select the appropriate CSS file
function getThemeCss() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isHighContrast = window.matchMedia("(prefers-contrast: more)").matches;
  if (isDark && isHighContrast) return "css/dark-hc.css";
  if (isDark) return "css/dark.css";
  if (!isDark && isHighContrast) return "css/light-hc.css";
  return "css/light.css";
}

// Optionally, you can add support for medium contrast if you want
// For demo purposes, only default and high contrast are used

function setThemeClass(theme) {
  document.body.classList.remove(
    "light",
    "dark",
    "light-high-contrast",
    "dark-high-contrast",
    "light-medium-contrast",
    "dark-medium-contrast"
  );
  document.body.classList.add(theme);
}

function themeClassFromCss(cssFile) {
  if (cssFile.includes("dark-hc")) return "dark-high-contrast";
  if (cssFile.includes("light-hc")) return "light-high-contrast";
  if (cssFile.includes("dark-mc")) return "dark-medium-contrast";
  if (cssFile.includes("light-mc")) return "light-medium-contrast";
  if (cssFile.includes("dark")) return "dark";
  return "light";
}

function applyTheme() {
  const cssFile = getThemeCss();
  let link = document.getElementById("theme-css");
  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "theme-css";
    document.head.appendChild(link);
  }
  link.href = cssFile;
  setThemeClass(themeClassFromCss(cssFile));
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applyTheme);
window
  .matchMedia("(prefers-contrast: more)")
  .addEventListener("change", applyTheme);

window.addEventListener("DOMContentLoaded", applyTheme);
