import React from "react";

/** Dark visor, so the eyes read on any body colour. */
const VISOR = "#101010";

interface Props {
  /** "head" for the launcher and the header, "full" for the mascot beside the panel. */
  variant: "head" | "full";
  className?: string;
  /** Eye and smile colour. */
  eyeColor?: string;
  /** Wave a couple of times on appearance (full body only). */
  waving?: boolean;
}

/**
 * The assistant's mascot, drawn inline so it costs no request and inherits its
 * body colour from `currentColor`. Motion lives in globals.css (chat-robot-*)
 * and is switched off under prefers-reduced-motion.
 */
const ChatRobot = ({ variant, className = "", eyeColor = "#FFFFFF", waving = false }: Props) => {
  if (variant === "head") {
    return (
      <svg
        viewBox="0 0 48 42"
        role="img"
        aria-hidden="true"
        focusable="false"
        className={`chat-robot-bob ${className}`}
        fill="none"
      >
        {/* Antenna */}
        <circle cx="24" cy="5" r="3" fill="currentColor" className="chat-robot-ping" />
        <rect x="23" y="7" width="2" height="6" rx="1" fill="currentColor" />
        {/* Ears */}
        <rect x="3" y="20" width="3.5" height="9" rx="1.75" fill="currentColor" />
        <rect x="41.5" y="20" width="3.5" height="9" rx="1.75" fill="currentColor" />
        {/* Head + visor */}
        <rect x="7" y="12" width="34" height="27" rx="9" fill="currentColor" />
        <rect x="12" y="17" width="24" height="15" rx="6" fill={VISOR} />
        {/* Face */}
        <g className="chat-robot-eyes">
          <circle cx="19" cy="23" r="2.8" fill={eyeColor} />
          <circle cx="29" cy="23" r="2.8" fill={eyeColor} />
        </g>
        <path
          d="M20 28 Q24 30.6 28 28"
          stroke={eyeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 100"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={`chat-robot-bob ${className}`}
      fill="none"
    >
      {/* Ground shadow */}
      <ellipse cx="32" cy="95" rx="17" ry="3.5" fill="currentColor" opacity="0.18" />
      {/* Antenna */}
      <circle cx="32" cy="5" r="3.2" fill="currentColor" className="chat-robot-ping" />
      <rect x="31" y="7" width="2" height="6" rx="1" fill="currentColor" />
      {/* Ears */}
      <rect x="12.5" y="20" width="3.5" height="9" rx="1.75" fill="currentColor" />
      <rect x="48" y="20" width="3.5" height="9" rx="1.75" fill="currentColor" />
      {/* Head + visor */}
      <rect x="16" y="13" width="32" height="25" rx="8.5" fill="currentColor" />
      <rect x="20.5" y="17.5" width="23" height="14" rx="5.5" fill={VISOR} />
      <g className="chat-robot-eyes">
        <circle cx="27" cy="23" r="2.7" fill={eyeColor} />
        <circle cx="37" cy="23" r="2.7" fill={eyeColor} />
      </g>
      <path
        d="M28 27.8 Q32 30.2 36 27.8"
        stroke={eyeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Neck + torso */}
      <rect x="29" y="37" width="6" height="4.5" rx="1.5" fill="currentColor" />
      <rect x="17" y="41" width="30" height="31" rx="9" fill="currentColor" />
      <circle cx="32" cy="52" r="4.2" fill={VISOR} />
      <circle cx="32" cy="52" r="2" fill={eyeColor} className="chat-robot-ping" />
      <rect x="25" y="61" width="14" height="2" rx="1" fill={VISOR} opacity="0.45" />
      <rect x="27.5" y="65" width="9" height="2" rx="1" fill={VISOR} opacity="0.3" />
      {/* Arms — the left one waves hello */}
      <rect
        x="11"
        y="44"
        width="5.5"
        height="21"
        rx="2.75"
        fill="currentColor"
        className={waving ? "chat-robot-arm" : undefined}
      />
      <rect x="47.5" y="44" width="5.5" height="21" rx="2.75" fill="currentColor" />
      {/* Legs + feet */}
      <rect x="22" y="72" width="8" height="15" rx="4" fill="currentColor" />
      <rect x="34" y="72" width="8" height="15" rx="4" fill="currentColor" />
      <rect x="19" y="85" width="13" height="7" rx="3.5" fill="currentColor" />
      <rect x="32" y="85" width="13" height="7" rx="3.5" fill="currentColor" />
    </svg>
  );
};

export default ChatRobot;
