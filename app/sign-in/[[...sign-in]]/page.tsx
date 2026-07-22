import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your CareerVerse AI account to continue your career simulations.",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Pick up right where you left off."
      subtitle="Your XP, saved careers, and simulation history are all waiting for you."
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "glass-strong shadow-2xl w-full",
          },
        }}
        signUpUrl="/sign-up"
      />
    </AuthShell>
  );
}
