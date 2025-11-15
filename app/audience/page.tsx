"use client";


import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Smartphone, MousePointer } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ------------------------
// Stats Card Data
// ------------------------
const cards = [
  {
    title: "Total Visitors",
    value: "1.2M",
    change: "+12.5%",
    desc: "Growth in last 30 days",
    gradient: "from-blue-50 to-blue-100",
    icon: <Users className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Global Reach",
    value: "82 Countries",
    change: "+8.1%",
    desc: "Active regions",
    gradient: "from-purple-50 to-purple-100",
    icon: <Globe className="h-6 w-6 text-purple-500" />,
  },
  {
    title: "Mobile Users",
    value: "68%",
    change: "+4.3%",
    desc: "Android + iOS devices",
    gradient: "from-green-50 to-green-100",
    icon: <Smartphone className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Returning Users",
    value: "46%",
    change: "+6.8%",
    desc: "Repeat visits",
    gradient: "from-orange-50 to-orange-100",
    icon: <MousePointer className="h-6 w-6 text-orange-500" />,
  },
];

// ------------------------
// Pie Chart Data
// ------------------------
const countryPieData = [
  { name: "USA", value: 400 },
  { name: "India", value: 320 },
  { name: "Germany", value: 180 },
  { name: "UK", value: 140 },
  { name: "Canada", value: 100 },
];

const COLORS = ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#ef4444"];

// ------------------------
// Bar Chart Data
// ------------------------
const globalAudienceData = [
  { region: "Asia", users: 850 },
  { region: "Europe", users: 620 },
  { region: "North America", users: 540 },
  { region: "South America", users: 310 },
  { region: "Africa", users: 260 },
  { region: "Oceania", users: 180 },
];

export default function AudiencePage() {
  return (
    <div className="p-6 space-y-10">

      {/* ---------------- STATS CARDS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card
              className={`rounded-2xl shadow-lg hover:shadow-xl transition border bg-gradient-to-br ${card.gradient}`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-gray-700 font-medium">{card.title}</div>
                  {card.icon}
                </div>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-green-600 font-semibold">{card.change}</p>
                <p className="text-xs text-gray-500">{card.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ---------------- PIECHART + DETAILS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PIE CHART */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Top Countries Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {countryPieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* DETAILS LIST */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-3">Country Breakdown</h2>
            {countryPieData.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between p-3 rounded-lg border hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  ></div>
                  <span className="font-medium text-gray-700">{country.name}</span>
                </div>
                <span className="font-semibold">{country.value}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ---------------- GLOBAL BAR CHART ---------------- */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Global Audience Regions</h2>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={globalAudienceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
