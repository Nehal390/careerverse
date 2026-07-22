"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account, security, and connected logins.</p>
      </div>

      <UserProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "glass-strong shadow-none w-full",
            navbar: "hidden",
            navbarMobileMenuButton: "hidden",
          },
        }}
      />
    </div>
  );
}
