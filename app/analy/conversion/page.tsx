"use client";

import React, { useState, useEffect } from "react";
import { Filters } from "@/components/analytics/Filters";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";

// Dummy conversion data generator
interface ConversionDatum {
  date: string;
  conversions: number;
  revenue: number;
  conversionRate: number;
  avgValue: number;
}

const generateConversionData = (days: number): ConversionDatum[] => {
  const data: ConversionDatum[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const conversions = Math.floor(Math.random() * 200);
    const revenue = parseFloat((conversions * (Math.random() * 50 + 20)).toFixed(2));
    const conversionRate = parseFloat((Math.random() * 10 + 2).toFixed(2));
    const avgValue = parseFloat((revenue / conversions || 0).toFixed(2));
    data.push({ date: date.toLocaleDateString(), conversions, revenue, conversionRate, avgValue });
  }
  return data;
};

// Dashboard Card
interface CardProps {
  title: string;
  value: number;
  gradient?: string;
}
const DashboardCard: React.FC<CardProps> = ({ title, value, gradient }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`p-4 rounded-2xl shadow-md text-white ${gradient || "bg-indigo-600"} flex flex-col`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="text-2xl font-bold mt-2">
        {mounted ? <CountUp end={value} duration={1.5} separator="," /> : value}
      </div>
    </div>
  );
};

// Conversion Calculator
const ConversionCalculator: React.FC = () => {
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5);
  const [revenuePerConversion, setRevenuePerConversion] = useState(30);

  const conversions = Math.round((visitors * conversionRate) / 100);
  const revenue = (conversions * revenuePerConversion).toFixed(2);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow space-y-4">
      <h2 className="font-bold text-lg mb-2">Conversion Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Visitors</label>
          <input
            type="number"
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Conversion Rate (%)</label>
          <input
            type="number"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Revenue per Conversion ($)</label>
          <input
            type="number"
            value={revenuePerConversion}
            onChange={(e) => setRevenuePerConversion(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 text-white p-3 rounded-lg text-center font-semibold">
          Conversions: {conversions}
        </div>
        <div className="bg-green-600 text-white p-3 rounded-lg text-center font-semibold">
          Revenue: ${revenue}
        </div>
      </div>
    </div>
  );
};

// Main Conversion Dashboard
export default function ConversionAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedMetric, setSelectedMetric] = useState<"conversions" | "revenue">("conversions");

  const [data, setData] = useState<ConversionDatum[]>([]);

  useEffect(() => {
    setData(generateConversionData(30));
  }, []);

  const totalConversions = data.reduce((acc, d) => acc + d.conversions, 0);
  const totalRevenue = data.reduce((acc, d) => acc + d.revenue, 0);
  const avgConversionRate = (data.reduce((acc, d) => acc + d.conversionRate, 0) / (data.length || 1)).toFixed(2);
  const avgValue = (data.reduce((acc, d) => acc + d.avgValue, 0) / (data.length || 1)).toFixed(2);

  // Dummy top campaigns
  const topCampaigns = [
    { name: "Google Ads", conversions: 450, revenue: 12000 },
    { name: "Facebook Ads", conversions: 320, revenue: 8500 },
    { name: "Email Campaign", conversions: 210, revenue: 4000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Conversion Dashboard</h1>

      {/* Filters */}
      <Filters startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Conversions" value={totalConversions} gradient="bg-indigo-500" />
        <DashboardCard title="Avg Conversion Rate" value={Number(avgConversionRate)} gradient="bg-purple-500" />
        <DashboardCard title="Total Revenue" value={totalRevenue} gradient="bg-green-500" />
        <DashboardCard title="Avg Value" value={Number(avgValue)} gradient="bg-teal-500" />
      </div>

      {/* Metric Selector */}
      <div className="flex items-center gap-4">
        <label className="font-semibold">Metric:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as "conversions" | "revenue")}
        >
          <option value="conversions">Conversions</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
        <h2 className="font-bold mb-2">{selectedMetric === "conversions" ? "Conversions Over Time" : "Revenue Over Time"}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetric === "conversions" ? "#4f46e5" : "#16a34a"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Campaigns */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
        <h2 className="font-bold mb-2">Top Campaigns</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Campaign</th>
              <th className="p-2">Conversions</th>
              <th className="p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topCampaigns.map((c) => (
              <tr key={c.name} className="border-b hover:bg-gray-100 dark:hover:bg-zinc-700">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.conversions}</td>
                <td className="p-2">${c.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conversion Calculator */}
      <ConversionCalculator />
    </div>
  );
}
