import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://careerverse.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CareerVerse AI — Experience Your Dream Career Before Choosing It",
    template: "%s | CareerVerse AI",
  },
  description:
    "CareerVerse AI lets students and career switchers run realistic, AI-powered work simulations across 40+ careers — from Software Engineer to Doctor — before committing years to one path.",
  keywords: [
    "career simulation",
    "career quiz",
    "career exploration for students",
    "AI career guidance",
    "day in the life simulation",
    "choose a career",
    "career switcher tools",
  ],
  authors: [{ name: "CareerVerse AI" }],
  creator: "CareerVerse AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CareerVerse AI",
    title: "CareerVerse AI — Experience Your Dream Career Before Choosing It",
    description:
      "Run realistic AI-powered work simulations across 40+ careers before you choose one. Get a compatibility score, a learning path, and a shareable certificate.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CareerVerse AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerVerse AI — Experience Your Dream Career Before Choosing It",
    description:
      "Run realistic AI-powered work simulations across 40+ careers before you choose one.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366F1",
          colorBackground: "#FFFFFF",
          colorText: "#18181B",
          colorTextSecondary: "#71717A",
          colorInputBackground: "#FAFAFB",
          colorInputText: "#18181B",
          borderRadius: "0.875rem",
        },
      }}
    >
      <html
        lang="en"
        suppressHydrationWarning
        className={`${display.variable} ${body.variable} ${mono.variable}`}
      >
        <body className="min-h-screen bg-background font-sans">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
