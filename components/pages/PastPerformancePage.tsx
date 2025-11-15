"use client";

import * as React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SectionPerformance {
  id: number;
  section: string;
  completedTasks: number;
  pendingTasks: number;
}

const sampleData: SectionPerformance[] = [
  { id: 1, section: "Section 1", completedTasks: 12, pendingTasks: 3 },
  { id: 2, section: "Section 2", completedTasks: 8, pendingTasks: 5 },
  { id: 3, section: "Section 3", completedTasks: 15, pendingTasks: 2 },
  { id: 4, section: "Section 4", completedTasks: 10, pendingTasks: 6 },
];

const lineChartData = {
  labels: sampleData.map((s) => s.section),
  datasets: [
    {
      label: "Completed Tasks",
      data: sampleData.map((s) => s.completedTasks),
      borderColor: "rgb(34,197,94)",
      backgroundColor: "rgba(34,197,94,0.2)",
      tension: 0.3,
    },
    {
      label: "Pending Tasks",
      data: sampleData.map((s) => s.pendingTasks),
      borderColor: "rgb(251,191,36)",
      backgroundColor: "rgba(251,191,36,0.2)",
      tension: 0.3,
    },
  ],
};

export default function PastPerformancePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Chart Container */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
        <Line data={lineChartData} />
      </motion.div>

      {/* Table Container */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
      <h2 className="text-lg font-semibold mb-4">Section Task Summary</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              <TableHead>Completed Tasks</TableHead>
              <TableHead>Pending Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((section, index) => (
              <TableRow key={section.id}>
                <TableCell>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  >
                    {section.section}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  >
                    {section.completedTasks}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  >
                    {section.pendingTasks}
                  </motion.div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}