"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, ArrowUp, ArrowDown } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

interface DashboardCardProps {
  title: string;
  value: number | string;
  gradient: string;
  icon?: React.ReactNode;
  trend?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, gradient, icon, trend }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`p-5 rounded-2xl shadow-lg text-white ${gradient} transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      {icon && <div className="text-2xl">{icon}</div>}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold mt-2 flex items-center gap-2"
    >
      {value}
      {trend !== undefined && (
        <span className={`text-sm flex items-center ${trend >= 0 ? "text-green-200" : "text-red-200"}`}>
          {trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />} {Math.abs(trend)}%
        </span>
      )}
    </motion.div>
  </motion.div>
);

export default function FunnelAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const stages = ["Landing Page", "Sign Up", "Email Verification", "Purchase", "Upsell"];
  const [users, setUsers] = useState<number[]>([1000, 750, 500, 300, 150]);

  const handleUserChange = (index: number, value: number) => {
    const newUsers = [...users];
    newUsers[index] = value < 0 ? 0 : value;
    setUsers(newUsers);
  };

  const conversionRates = users.map((count, i) =>
    i === 0 ? 100 : ((count / users[i - 1]) * 100).toFixed(1)
  );

  const funnelData = {
    labels: stages,
    datasets: [
      {
        label: "Users",
        data: users,
        backgroundColor: [
          "rgba(79,70,229,0.8)",
          "rgba(99,102,241,0.8)",
          "rgba(129,140,248,0.8)",
          "rgba(165,180,252,0.8)",
          "rgba(199,210,254,0.8)",
        ],
        borderRadius: 12,
        barThickness: 30,
      },
    ],
  };

  const dropOffData = {
    labels: stages.slice(1),
    datasets: [
      {
        label: "Stage Drop-off (%)",
        data: stages.slice(1).map((_, i) => 100 - Number(conversionRates[i + 1])),
        borderColor: "rgba(239,68,68,0.8)",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const funnelOptions: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => `${context.dataset.label}: ${context.parsed.x}`,
        },
      },
    },
    animation: { duration: 1200, easing: "easeOutCubic" },
    scales: {
      x: { ticks: { color: "#374151" }, grid: { color: "#e5e7eb" } },
      y: { ticks: { color: "#374151", font: { weight: "bold" } }, grid: { color: "#f3f4f6" } },
    },
  };

  const dropOffOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line">) =>
            `${ctx.dataset.label}: ${ctx.parsed.y?.toFixed(1) ?? 0}%`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#374151" }, grid: { color: "#e5e7eb" } },
      x: { ticks: { color: "#374151" }, grid: { color: "#f3f4f6" } },
    },
    animation: { duration: 1200, easing: "easeOutCubic" },
  };

  const projectedRevenue = users[users.length - 1] * 40 * 1.2; // 20% growth projection

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Funnel Analytics</h1>

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {[startDate, endDate].map((date, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <DatePicker
              selected={date}
              onChange={(d: Date | null) => d && (idx === 0 ? setStartDate(d) : setEndDate(d))}
              className="border px-3 py-1 rounded-lg w-full sm:w-auto"
            />
          </div>
        ))}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <DashboardCard title="Total Visitors" value={users[0]} gradient="bg-gradient-to-r from-indigo-600 to-indigo-400" />
        <DashboardCard title="Total Conversions" value={users[3]} gradient="bg-gradient-to-r from-purple-600 to-purple-400" />
        <DashboardCard title="Conversion Rate" value={`${((users[3] / users[0]) * 100).toFixed(1)}%`} gradient="bg-gradient-to-r from-pink-600 to-pink-400" />
        <DashboardCard title="Revenue Generated" value={`$${(users[3] * 40).toLocaleString()}`} gradient="bg-gradient-to-r from-green-600 to-green-400" trend={5} />
        <DashboardCard title="Projected Revenue" value={`$${projectedRevenue.toLocaleString()}`} gradient="bg-gradient-to-r from-yellow-600 to-yellow-400" trend={10} />
        <DashboardCard title="Avg. Drop-off" value={`${((100 - Number(conversionRates[conversionRates.length - 1])).toFixed(1))}%`} gradient="bg-gradient-to-r from-red-600 to-red-400" trend={-3} />
      </div>

      {/* Charts Side by Side */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex-1 h-[450px]">
          <h2 className="font-semibold mb-4">Conversion Funnel</h2>
          <Bar data={funnelData} options={funnelOptions} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex-1 h-[450px]">
          <h2 className="font-semibold mb-4">Stage Drop-off Graph</h2>
          <Line data={dropOffData} options={dropOffOptions} />
        </div>
      </div>

      {/* Conversion Calculator */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-semibold text-lg mb-2">Conversion Rate Calculator</h2>
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center gap-4">
            <span className="w-40">{stage}</span>
            <input
              type="number"
              value={users[i]}
              onChange={(e) => handleUserChange(i, Number(e.target.value))}
              className="border px-3 py-1 rounded-lg w-full sm:w-32"
              step={1}
              min={0}
            />
            {i > 0 && <span className="text-gray-500">{`${conversionRates[i]}% from previous stage`}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
