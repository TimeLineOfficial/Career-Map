import React from "react";

interface CareerMapLogoProps {
  className?: string;
  size?: number;
}

/**
 * CareerMap Constellation Logo
 * Inspired by the career universe hub: A glowing central node connected
 * by direct orbital vectors to 5 surrounding satellite nodes, symbolizing
 * students exploring diverse interconnected careers and educational pathways.
 */
export default function CareerMapLogo({ className = "h-9 w-9", size = 36 }: CareerMapLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CareerMap Logo"
    >
      <defs>
        {/* Core Node Gradient (Emerald to Cyan to Indigo) */}
        <linearGradient id="cmCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Satellite 1: Top Node (Purple to Violet) */}
        <linearGradient id="cmNodeTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Satellite 2: Top Right (Blue to Cyan) */}
        <linearGradient id="cmNodeTR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Satellite 3: Bottom Right (Fuchsia to Pink) */}
        <linearGradient id="cmNodeBR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Satellite 4: Bottom Left (Amber to Orange) */}
        <linearGradient id="cmNodeBL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Satellite 5: Top Left (Teal to Emerald) */}
        <linearGradient id="cmNodeTL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="cmCoreGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Rounded Shield Tile */}
      <rect
        width="100"
        height="100"
        rx="24"
        className="fill-slate-900/90 dark:fill-slate-950/90"
      />
      <rect
        width="98"
        height="98"
        x="1"
        y="1"
        rx="23"
        stroke="url(#cmCoreGrad)"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* Orbit Rings (Subtle guides) */}
      <circle
        cx="50"
        cy="50"
        r="32"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="1"
        strokeDasharray="3 3"
        className="text-blue-400"
      />

      {/* Connecting Vector Lines from Center (50, 50) to 5 Nodes:
          Node 1: Top (50, 18)
          Node 2: Top-Right (80, 40)
          Node 3: Bottom-Right (69, 79)
          Node 4: Bottom-Left (31, 79)
          Node 5: Top-Left (20, 40)
      */}
      <g strokeWidth="2.5" strokeLinecap="round">
        <line x1="50" y1="50" x2="50" y2="19" stroke="url(#cmNodeTop)" strokeOpacity="0.85" />
        <line x1="50" y1="50" x2="80" y2="40" stroke="url(#cmNodeTR)" strokeOpacity="0.85" />
        <line x1="50" y1="50" x2="69" y2="79" stroke="url(#cmNodeBR)" strokeOpacity="0.85" />
        <line x1="50" y1="50" x2="31" y2="79" stroke="url(#cmNodeBL)" strokeOpacity="0.85" />
        <line x1="50" y1="50" x2="20" y2="40" stroke="url(#cmNodeTL)" strokeOpacity="0.85" />
      </g>

      {/* Orbit Pulse Ring on Center */}
      <circle
        cx="50"
        cy="50"
        r="17"
        fill="url(#cmCoreGrad)"
        fillOpacity="0.2"
      />

      {/* 5 Outer Satellite Nodes */}
      {/* Node 1: Top */}
      <circle cx="50" cy="19" r="8.5" fill="url(#cmNodeTop)" />
      <circle cx="50" cy="19" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Node 2: Top-Right */}
      <circle cx="80" cy="40" r="8.5" fill="url(#cmNodeTR)" />
      <circle cx="80" cy="40" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Node 3: Bottom-Right */}
      <circle cx="69" cy="79" r="8.5" fill="url(#cmNodeBR)" />
      <circle cx="69" cy="79" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Node 4: Bottom-Left */}
      <circle cx="31" cy="79" r="8.5" fill="url(#cmNodeBL)" />
      <circle cx="31" cy="79" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Node 5: Top-Left */}
      <circle cx="20" cy="40" r="8.5" fill="url(#cmNodeTL)" />
      <circle cx="20" cy="40" r="3.5" fill="#FFFFFF" fillOpacity="0.9" />

      {/* Center Core Node ("You" / Start Node) */}
      <circle
        cx="50"
        cy="50"
        r="13"
        fill="url(#cmCoreGrad)"
        filter="url(#cmCoreGlow)"
      />
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="#FFFFFF"
      />
    </svg>
  );
}
