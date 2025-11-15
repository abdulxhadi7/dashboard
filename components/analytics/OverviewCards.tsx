// components/analytics/OverviewCards.tsx
"use client";
import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  trend?: string;
}

export const OverviewCard: React.FC<CardProps> = ({ title, value, trend }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow hover:shadow-lg transition-all flex flex-col">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {trend && <p className="text-green-500 text-sm mt-1">{trend}</p>}
    </div>
  );
};
