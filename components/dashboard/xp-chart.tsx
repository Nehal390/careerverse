"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { xpHistory } from "@/lib/dashboard-data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function XpChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(24,24,27,0.06)";
  const tickColor = isDark ? "#A1A1AA" : "#71717A";
  const tooltipBg = isDark ? "#1B1B1F" : "#18181B";
  const tooltipTitle = isDark ? "#F4F4F6" : "#FAFAFA";
  const tooltipBody = isDark ? "#A1A1AA" : "#D4D4D8";

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: tooltipBg,
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)",
        borderWidth: 1,
        titleColor: tooltipTitle,
        bodyColor: tooltipBody,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { size: 11 } },
      },
    },
  };

  const data = {
    labels: xpHistory.map((d) => d.day),
    datasets: [
      {
        label: "XP earned",
        data: xpHistory.map((d) => d.xp),
        backgroundColor: "#6366F1",
        hoverBackgroundColor: "#818CF8",
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  return (
    <div className="h-56">
      <Bar data={data} options={options} />
    </div>
  );
}
