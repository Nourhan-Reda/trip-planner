import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | boolean | undefined | null | { [key: string]: boolean })[]) {
  const classes = inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
  return twMerge(classes);
}
