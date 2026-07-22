import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free CareerVerse AI account to save simulations and track your XP.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Experience your dream career before choosing it."
      subtitle="Free to start — run your first simulation in the next five minutes."
    >
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "glass-strong shadow-2xl w-full",
          },
        }}
        signInUrl="/sign-in"
      />
    </AuthShell>
  );
}
