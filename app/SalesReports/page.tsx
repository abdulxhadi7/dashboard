"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

export default function SalesReportsDashboard() {
  // Enhanced & professional data visualization layout
  const salesByCity = [
    { city: "New York", sales: 400, plan: 350 },
    { city: "Chicago", sales: 300, plan: 280 },
    { city: "Los Angeles", sales: 500, plan: 450 },
    { city: "Houston", sales: 200, plan: 180 },
    { city: "San Diego", sales: 250, plan: 230 }
  ];

  const salesByType = [
    { type: "Electrical", value: 0.2 },
    { type: "Softline", value: 0.32 },
    { type: "Hardline", value: 0.35 }
  ];

  const storesByState = [
    { state: "Virginia", stores: 108 },
    { state: "Florida", stores: 70 },
    { state: "Ohio", stores: 160 },
    { state: "Illinois", stores: 140 },
    { state: "Kansas", stores: 120 },
    { state: "Texas", stores: 210 },
    { state: "California", stores: 88 }
  ];

  const dailyRevenue = Array.from({ length: 30 }).map((_, i) => ({
    date: `09-${i + 1}`,
    revenue: Math.floor(Math.random() * 250) + 60
  }));

  const COLORS = ["#4F46E5", "#F59E0B", "#EF4444", "#10B981"]; // professional palette

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-zinc-900 min-h-screen">
      

      {/* TOP GRID – KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Accumulated Revenue (YTD)",
            value: "$246,590",
            change: "+10% YoY",
            color: "text-indigo-600"
          },
          {
            label: "Cumulative Revenue (Period)",
            value: "$15,040",
            change: "-3% MoM",
            color: "text-amber-600"
          },
          {
            label: "Total Customers (YTD)",
            value: "1,543",
            change: "324 new",
            color: "text-green-600"
          },
          {
            label: "Total Stores",
            value: "134",
            change: "+3 this year",
            color: "text-blue-600"
          }
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700 hover:shadow-md transition duration-200"
          >
            <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">{card.label}</p>
            <p className={`text-3xl font-semibold ${card.color}`}>{card.value}</p>
            <p className="text-sm text-gray-500 mt-2">{card.change}</p>
          </div>
        ))}
      </div>

      {/* CHART SECTION 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by City */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales by City</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesByCity}>
              <XAxis dataKey="city" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="plan" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Type */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Sales by Type</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={salesByType}
                dataKey="value"
                nameKey="type"
                outerRadius={80}
                label={(entry) => `${entry.type}: ${entry.value * 100}%`}
              >
                {salesByType.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Revenue */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Daily Revenue</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenue}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART SECTION 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stores by State */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Stores by State</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={storesByState} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="state" type="category" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="stores" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Analysis of Indicators */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-x-auto">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Analysis of Indicators</h2>
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="border-b text-gray-500 dark:text-gray-400">
                <th className="py-2">Type</th>
                <th>Sales</th>
                <th>Gross Margin</th>
                <th>Discount</th>
                <th>Return Rate</th>
                <th>Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {["Fruits", "Aquatic", "Deli"].map((t) => (
                <tr key={t} className="border-t border-gray-200 dark:border-zinc-700">
                  <td className="py-2 font-medium">{t}</td>
                  <td>2568</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                </tr>
              ))}
            </tbody>
             <thead>
              <tr className="border-b text-gray-500 dark:text-gray-400">
                <th className="py-2">Type</th>
                <th>Sales</th>
                <th>Gross Margin</th>
                <th>Discount</th>
                <th>Return Rate</th>
                <th>Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {["Fruits", "Aquatic", "Deli"].map((t) => (
                <tr key={t} className="border-t border-gray-200 dark:border-zinc-700">
                  <td className="py-2 font-medium">{t}</td>
                  <td>2568</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                  <td>104% MoM / 104% YoY</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
