"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Briefcase,
  Megaphone,
  Stethoscope,
  Cog,
  Palette,
  Landmark,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { careerCategories } from "@/lib/careers-data";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  briefcase: Briefcase,
  megaphone: Megaphone,
  stethoscope: Stethoscope,
  cog: Cog,
  palette: Palette,
  landmark: Landmark,
  flask: FlaskConical,
};

export function Categories() {
  return (
    <section id="careers" className="py-24">
      <div className="container">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-secondary-400">
              Explore
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Every path, mapped out
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Eight fields, 42+ careers, each with a real simulation — not a stock photo and a
            paragraph.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {careerCategories.map((cat, i) => {
            const Icon = icons[cat.icon];
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/careers?category=${cat.slug}`}
                  className="card-interactive group block p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-400 transition-colors group-hover:from-primary-500/30 group-hover:to-secondary-500/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-medium">{cat.name}</div>
                  <div className="mt-1 text-xs text-muted">{cat.count} careers</div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
