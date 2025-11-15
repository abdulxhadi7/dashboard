"use client";
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CardProps {
  title: string;
  value: string | number;
  change?: string; // e.g. "-20%"
  subtitle?: string; // e.g. "Down 20% this period"
  note?: string; // e.g. "Acquisition needs attention"
}

export const OverviewCard: React.FC<CardProps> = ({ title, value, change, subtitle, note }) => {
  const isNegative = change?.includes("-");
  return (
    <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col border border-zinc-200 dark:border-zinc-700">
      {/* Title + Change Badge */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

        {change && (
          <div
            className={`text-xs px-2 py-1 rounded-lg flex items-center gap-1 border ${
              isNegative
                ? "text-red-500 border-red-400/40 bg-red-50 dark:bg-red-400/10"
                : "text-green-600 border-green-400/40 bg-green-50 dark:bg-green-400/10"
            }`}
          >
            {isNegative ? (
              <ArrowDown className="w-3 h-3" />
            ) : (
              <ArrowUp className="w-3 h-3" />
            )}
            {change}
          </div>
        )}
      </div>

      {/* Main Value */}
      <p className="text-3xl font-bold mt-2">{value}</p>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-1 text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300">
          {isNegative ? (
            <ArrowDown className="w-3 h-3 text-red-500" />
          ) : (
            <ArrowUp className="w-3 h-3 text-green-500" />
          )}
          {subtitle}
        </p>
      )}

      {/* Additional Note */}
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  );
};
