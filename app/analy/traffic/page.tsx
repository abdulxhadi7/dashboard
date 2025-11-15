"use client";

import React, { useState } from "react";
import { Filters } from "@/components/analytics/Filters";
import { OverviewCard } from "@/components/analytics/OverviewCards";
import { TopPagesTable } from "@/components/analytics/TopPagesTable";
import { GeoMap } from "@/components/analytics/GeoMap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  generateTrafficData,
  TrafficDatum,
} from "@/components/analytics/utils/data-faker";

export default function TrafficAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const data: TrafficDatum[] = generateTrafficData(30);
  const latest = data[data.length - 1];
  const prev = data[data.length - 2] ?? latest;

  // ---- Compute values + trends ----
  const totalVisits = data.reduce((acc, d) => acc + d.visits, 0);
  
  const visitsChange = (((latest.visits - prev.visits) / prev.visits) * 100).toFixed(1);

  const totalUnique = data.reduce((acc, d) => acc + d.uniqueVisitors, 0);
  const uniqueChange = (
    ((latest.uniqueVisitors - prev.uniqueVisitors) / prev.uniqueVisitors) *
    100
  ).toFixed(1);

  const avgBounce = (
    data.reduce((acc, d) => acc + d.bounceRate, 0) / data.length
  ).toFixed(2);
  const bounceChange = (
    ((latest.bounceRate - prev.bounceRate) / prev.bounceRate) *
    100
  ).toFixed(1);

  const avgSession = (
    data.reduce((acc, d) => acc + d.avgSession, 0) / data.length
  ).toFixed(2);
  const sessionChange = (
    ((latest.avgSession - prev.avgSession) / prev.avgSession) *
    100
  ).toFixed(1);

  // Geo Data
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

      {/* ---------- Overview Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Visits"
          value={totalVisits.toLocaleString()}
          change={`${visitsChange}%`}
          subtitle={`${visitsChange}% this period`}
          note={Number(visitsChange) < 0 ? "Traffic has slowed down" : "Traffic growing steadily"}
        />

        <OverviewCard
          title="Unique Visitors"
          value={totalUnique.toLocaleString()}
          change={`${uniqueChange}%`}
          subtitle={`${uniqueChange}% this period`}
          note={Number(uniqueChange) < 0 ? "Visitor decline detected" : "New users increasing"}
        />

        <OverviewCard
          title="Bounce Rate"
          value={`${avgBounce}%`}
          change={`${bounceChange}%`}
          subtitle={`${bounceChange}% this period`}
          note={Number(bounceChange) > 0 ? "Engagement is dropping" : "Improved retention"}
        />

        <OverviewCard
          title="Avg. Session Duration"
          value={`${avgSession} min`}
          change={`${sessionChange}%`}
          subtitle={`${sessionChange}% this period`}
          note={Number(sessionChange) < 0 ? "Users stay for less time" : "Session duration up"}
        />
      </div>

      {/* Charts + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        <TopPagesTable data={latest.topPages ?? []} />
      </div>

      {/* Geo Map */}
      <GeoMap data={geoData} />
    </div>
  );
}
