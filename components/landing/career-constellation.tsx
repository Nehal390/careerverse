"use client";

import { motion } from "framer-motion";

type Node = { x: number; y: number; label: string; r: number; color: string };

const nodes: Node[] = [
  { x: 200, y: 90, label: "AI Engineer", r: 34, color: "#6366F1" },
  { x: 70, y: 180, label: "UX Designer", r: 26, color: "#F472B6" },
  { x: 330, y: 170, label: "Data Scientist", r: 28, color: "#14B8A6" },
  { x: 150, y: 300, label: "Product Manager", r: 24, color: "#14B8A6" },
  { x: 310, y: 320, label: "Marketer", r: 22, color: "#F472B6" },
  { x: 40, y: 340, label: "Doctor", r: 20, color: "#6366F1" },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [1, 3],
  [3, 5],
  [1, 5],
];

export function CareerConstellation() {
  return (
    <div className="gradient-border shadow-2xl">
      <div className="glass-strong relative overflow-hidden rounded-[1.24rem] p-6">
        <svg
          viewBox="0 0 380 380"
          className="h-auto w-full"
          role="img"
          aria-label="Animated network of connected career paths, illustrating how CareerVerse links related roles"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="url(#nodeGlow)"
              strokeOpacity={0.5}
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.4, delay: 0.4 + i * 0.12, ease: "easeInOut" }}
              style={{ stroke: "rgba(255,255,255,0.18)" }}
            />
          ))}

          {nodes.map((node, i) => (
            <g key={node.label}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.color}
                fillOpacity={0.16}
                stroke={node.color}
                strokeOpacity={0.7}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                transition={{
                  scale: { duration: 0.5, delay: 0.15 * i, ease: "backOut" },
                  opacity: { duration: 0.5, delay: 0.15 * i },
                  y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <motion.text
                x={node.x}
                y={node.y + node.r + 16}
                textAnchor="middle"
                fontSize="10.5"
                className="fill-muted"
                fontFamily="var(--font-body)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                {node.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
