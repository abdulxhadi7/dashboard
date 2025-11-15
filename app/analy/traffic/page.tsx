"use client";

import React, { useState } from "react";
import { Filters } from "@/components/analytics/Filters";
import { OverviewCard } from "@/components/analytics/OverviewCards";
import { TopPagesTable } from "@/components/analytics/TopPagesTable";
import { GeoMap } from "@/components/analytics/GeoMap";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { generateTrafficData, TrafficDatum } from "@/components/analytics/utils/data-faker";

export default function TrafficAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const data: TrafficDatum[] = generateTrafficData(30);
  const latest = data[data.length - 1];

  // Convert geoTraffic array to Record<string, number> for new GeoMap
  // Fallback: generate some mock geo traffic if missing
  const geoData: Record<string, number> = latest.geoTraffic
    ? latest.geoTraffic.reduce((acc, item) => {
        acc[item.country] = item.visits;
        return acc;
      }, {} as Record<string, number>)
    : { US: 120, IN: 300, GB: 80, FR: 50, CN: 200 };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Traffic Analytics</h1>

      <Filters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OverviewCard title="Total Visits" value={data.reduce((acc, d) => acc + d.visits, 0)} />
        <OverviewCard title="Unique Visitors" value={data.reduce((acc, d) => acc + d.uniqueVisitors, 0)} />
        <OverviewCard
          title="Bounce Rate"
          value={`${(data.reduce((acc, d) => acc + d.bounceRate, 0) / data.length).toFixed(2)}%`}
        />
        <OverviewCard
          title="Avg. Session Duration"
          value={`${(data.reduce((acc, d) => acc + d.avgSession, 0) / data.length).toFixed(2)} min`}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        {/* Top Pages Table */}
        <TopPagesTable data={latest.topPages ?? []} />
      </div>

      {/* Geo Map */}
      <GeoMap data={geoData} />
    </div>
  );
}
