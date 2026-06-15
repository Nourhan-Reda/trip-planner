export const DISCOVER_DESTINATIONS_SECTION_ID = "discover-destinations";

export const DISCOVER_DESTINATIONS_HASH = `#${DISCOVER_DESTINATIONS_SECTION_ID}`;

export const SCROLL_NAVBAR_OFFSET_PX = 88;

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    SCROLL_NAVBAR_OFFSET_PX;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `#${sectionId}`);
  return true;
}
