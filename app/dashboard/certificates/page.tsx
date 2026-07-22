import type { Metadata } from "next";
import Link from "next/link";
import { Download, Linkedin, FileBadge } from "lucide-react";
import { certificates } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Certificates" };

export default function CertificatesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Certificates</h1>
        <p className="mt-1 text-sm text-muted">Proof of every simulation you've completed.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="card p-12 text-center">
          <FileBadge className="mx-auto mb-3 h-8 w-8 text-muted" />
          <p className="text-sm text-muted">
            No certificates yet — complete a simulation to earn your first one.
          </p>
          <Link
            href="/careers"
            className="mt-4 inline-block rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background"
          >
            Browse careers
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.id} className="gradient-border">
              <div className="glass-strong rounded-[1.24rem] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                    <FileBadge className="h-5 w-5 text-white" />
                  </span>
                  <span className="font-mono text-[11px] text-muted">{cert.certificateNumber}</span>
                </div>
                <h3 className="font-display text-lg font-semibold">{cert.careerTitle}</h3>
                <p className="mt-1 text-xs text-muted">Issued {cert.issuedAt}</p>
                <div className="mt-4 font-display text-2xl font-semibold text-gradient">
                  {cert.score}% compatibility
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground hover:bg-foreground/5">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </button>
                  <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground hover:bg-foreground/5">
                    <Linkedin className="h-3.5 w-3.5" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
