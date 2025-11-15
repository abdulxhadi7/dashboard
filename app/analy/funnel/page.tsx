"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Dashboard card component
interface DashboardCardProps {
  title: string;
  value: number | string;
  gradient: string;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, gradient, icon }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`p-4 rounded-2xl shadow-lg text-white ${gradient}`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      {icon && <div className="text-2xl">{icon}</div>}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold mt-2"
    >
      {value}
    </motion.div>
  </motion.div>
);

export default function FunnelAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Funnel stages and user counts
  const stages = ["Landing Page", "Sign Up", "Email Verification", "Purchase", "Upsell"];
  const [users, setUsers] = useState<number[]>([1000, 750, 500, 300, 150]);

  const handleUserChange = (index: number, value: number) => {
    const newUsers = [...users];
    newUsers[index] = value;
    setUsers(newUsers);
  };

  // Conversion rates between stages
  const conversionRates = users.map((count, i) =>
    i === 0 ? 100 : ((count / users[i - 1]) * 100).toFixed(1)
  );

  // Funnel chart data
  const funnelData = {
    labels: stages,
    datasets: [
      {
        label: "Users",
        data: users,
        backgroundColor: [
          "#4f46e5",
          "#6366f1",
          "#818cf8",
          "#a5b4fc",
          "#c7d2fe",
        ],
        borderRadius: 12,
        barThickness: 30,
      },
    ],
  };

  const funnelOptions = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 1000,
      easing: "easeOutCubic" as const,
    },
    scales: {
      x: { ticks: { color: "#374151" }, grid: { color: "#e5e7eb" } },
      y: { ticks: { color: "#374151", font: { weight: "500" } }, grid: { color: "#f3f4f6" } },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Funnel Analytics</h1>

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => date && setStartDate(date)}
            className="border px-3 py-1 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => date && setEndDate(date)}
            className="border px-3 py-1 rounded-lg"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Visitors"
          value={users[0]}
          gradient="bg-gradient-to-r from-indigo-600 to-indigo-400"
        />
        <DashboardCard
          title="Total Conversions"
          value={users[3]}
          gradient="bg-gradient-to-r from-purple-600 to-purple-400"
        />
        <DashboardCard
          title="Conversion Rate"
          value={`${((users[3] / users[0]) * 100).toFixed(1)}%`}
          gradient="bg-gradient-to-r from-pink-600 to-pink-400"
        />
        <DashboardCard
          title="Revenue Generated"
          value={`$${(users[3] * 40).toLocaleString()}`}
          gradient="bg-gradient-to-r from-green-600 to-green-400"
        />
      </div>

      {/* Funnel Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold mb-4">Conversion Funnel</h2>
        <Bar data={funnelData} options={funnelOptions} />
      </div>

      {/* Conversion Calculator */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-semibold text-lg mb-2">Conversion Rate Calculator</h2>
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-40">{stage}</span>
            <input
              type="number"
              value={users[i]}
              onChange={(e) => handleUserChange(i, Number(e.target.value))}
              className="border px-3 py-1 rounded-lg w-32"
            />
            <span className="text-gray-500">
              {i > 0 && `${conversionRates[i]}% from previous stage`}
            </span>
          </div>
        ))}
      </div>

      {/* Funnel Insights Panel */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-semibold text-lg mb-2">Funnel Insights</h2>
        {stages.map((stage, i) => {
          if (i === stages.length - 1) return null;
          return (
            <div key={i} className="flex items-center gap-4">
              <span className="w-40">{stage} → {stages[i + 1]}</span>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white font-semibold"
              >
                Drop-off: { (100 - Number(conversionRates[i + 1])).toFixed(1) }%
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${100 - Number(conversionRates[i + 1])}%` }}
                className="h-2 bg-red-500 rounded-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
