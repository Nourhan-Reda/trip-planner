import { Plane } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: "#F59E0B" }}
      >
        <Plane size={16} color="#fff" style={{ transform: "rotate(45deg)" }} />
      </div>
      <span
        className="text-lg font-black"
        style={{ color: "#F8F6F1", letterSpacing: "-0.03em" }}
      >
        Wandr
      </span>
    </Link>
  );
}