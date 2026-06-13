import { requireCurrentUser } from "@/lib/auth";

export default async function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireCurrentUser();

  return <>{children}</>;
}
