"use client";

import Dashboard from "@/components/DashboardDataTable";
import ImageAccordion from "@/components/AccCards";
import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import { ChartPieDonutText } from "@/components/AppPieChart";

export default function Homepage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      {/* Dashboard Table (full width) */}
      
      {/* Bar Chart */}
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-2 xl:col-span-2">
        <AppBarChart />
      </div>

      {/* Pie Chart */}
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-1 xl:col-span-1">
        <ChartPieDonutText />
      </div>

      {/* Image Accordion */}
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-1 xl:col-span-1">
        <ImageAccordion />
      </div>

      {/* Area Chart */}
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-2 xl:col-span-4">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-2 xl:col-span-4">
        <Dashboard />
      </div>

    </div>
  );
}
