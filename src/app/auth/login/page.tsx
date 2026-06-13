import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
          <div className="text-gray-400">Loading...</div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
