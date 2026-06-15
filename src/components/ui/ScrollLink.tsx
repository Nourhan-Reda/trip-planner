"use client";

import { useEffect } from "react";
import type { ComponentPropsWithoutRef } from "react";
import {
  DISCOVER_DESTINATIONS_HASH,
  DISCOVER_DESTINATIONS_SECTION_ID,
  scrollToSection,
} from "@/features/destinations/constants";

type ScrollLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

export default function ScrollLink({
  href,
  onClick,
  children,
  ...props
}: ScrollLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !href.startsWith("#")) return;

    event.preventDefault();
    scrollToSection(href.slice(1));
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

/** Scrolls to discovery when landing with #discover-destinations in the URL. */
export function DiscoverHashScroll() {
  useEffect(() => {
    if (window.location.hash !== DISCOVER_DESTINATIONS_HASH) return;

    const timer = window.setTimeout(() => {
      scrollToSection(DISCOVER_DESTINATIONS_SECTION_ID);
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}

export { DISCOVER_DESTINATIONS_HASH, DISCOVER_DESTINATIONS_SECTION_ID };
