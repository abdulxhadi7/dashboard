"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { generateTrafficData } from "./utils/data-faker";
import { OverviewCard } from "@/components/analytics/OverviewCards";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

interface SourceBreakdown {
  source: string;
  value: number;
}

interface TrafficData {
  date: string;
  visits: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSession: number;
  sourceBreakdown: SourceBreakdown[];
}

export default function TrafficAnalytics() {
  const allData: TrafficData[] = generateTrafficData(90); // generate 90 days
  const [selectedRange, setSelectedRange] = useState<"7" | "30" | "90">("30");

  // Filter data based on selected range
  const data = allData.slice(-Number(selectedRange));
  const latest = data[data.length - 1] ?? {
    date: "",
    visits: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSession: 0,
    sourceBreakdown: [],
  };

  // Overview card calculations
  const totalVisits = data.reduce((acc, d) => acc + d.visits, 0);
  const totalUnique = data.reduce((acc, d) => acc + d.uniqueVisitors, 0);
  const avgBounce = (data.reduce((acc, d) => acc + d.bounceRate, 0) / data.length).toFixed(2);
  const avgSession = (data.reduce((acc, d) => acc + d.avgSession, 0) / data.length).toFixed(2);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Traffic Analytics</h1>

      {/* Range Selector */}
      <div className="mb-4 flex items-center space-x-2">
        <label className="font-medium">Date Range:</label>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value as "7" | "30" | "90")}
          className="border rounded px-2 py-1 dark:bg-zinc-700 dark:text-white"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OverviewCard title="Total Visits" value={totalVisits} />
        <OverviewCard title="Unique Visitors" value={totalUnique} />
        <OverviewCard title="Bounce Rate" value={`${avgBounce}%`} />
        <OverviewCard title="Avg. Session Duration" value={`${avgSession} min`} />
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
        <h2 className="font-bold mb-2">Traffic Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#8884d8" />
            <Line type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
        <h2 className="font-bold mb-2">Traffic Sources</h2>
        {latest.sourceBreakdown.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={latest.sourceBreakdown}
                dataKey="value"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {latest.sourceBreakdown.map((entry, index) => (
                  <Cell key={entry.source} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No source data available</p>
        )}
      </div>
    </div>
  );
}
