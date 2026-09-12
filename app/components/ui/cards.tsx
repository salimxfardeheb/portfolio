import React from "react";

export type CardColor =
  | "redOrange"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

interface Props {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  color?: CardColor;
}

const colorClasses: Record<CardColor, { badge: string; icon: string }> = {
  redOrange: {
    badge: "bg-redOrange/10 group-hover:bg-redOrange/20",
    icon: "text-redOrange",
  },
  orange: {
    badge: "bg-orange-500/10 group-hover:bg-orange-500/20",
    icon: "text-orange-500",
  },
  yellow: {
    badge: "bg-yellow-500/10 group-hover:bg-yellow-500/20",
    icon: "text-yellow-500",
  },
  green: {
    badge: "bg-green-500/10 group-hover:bg-green-500/20",
    icon: "text-green-500",
  },
  cyan: {
    badge: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    icon: "text-cyan-500",
  },
  blue: {
    badge: "bg-blue-500/10 group-hover:bg-blue-500/20",
    icon: "text-blue-500",
  },
  indigo: {
    badge: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
    icon: "text-indigo-500",
  },
  purple: {
    badge: "bg-purple-500/10 group-hover:bg-purple-500/20",
    icon: "text-purple-500",
  },
  pink: {
    badge: "bg-pink-500/10 group-hover:bg-pink-500/20",
    icon: "text-pink-500",
  },
};

const Card = ({ icon, title, description, color = "redOrange" }: Props) => {
  const { badge, icon: iconColor } = colorClasses[color];

  return (
    // Compact row on phones (icon beside text), centered column from md up
    <div className="group bg-white h-full flex flex-row md:flex-col items-start md:items-center gap-4 p-5 md:px-6 md:py-8 rounded-2xl border border-black/[0.04] shadow-md md:shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left md:text-center">
      <div className={`flex items-center justify-center w-12 h-12 md:w-20 md:h-20 shrink-0 rounded-xl md:rounded-full transition-all duration-300 group-hover:scale-110 ${badge}`}>
        {typeof icon === "string" ? (
          <img src={icon} alt={`${title} icon`} className="w-6 h-6 md:w-10 md:h-10 object-contain" />
        ) : (
          <span className={`flex items-center justify-center text-xl md:text-4xl ${iconColor}`}>{icon}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 md:gap-4 min-w-0">
        <div className="flex items-center md:justify-center md:min-h-[3.5rem]">
          <p className="text-MobileHeader4 lg:text-Header4 font-Header4 lg:font-Header4 leading-snug transition-colors duration-300 group-hover:text-redOrange">{title}</p>
        </div>
        <p className="text-MobileHeader5 lg:text-Header5 text-nevada leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
