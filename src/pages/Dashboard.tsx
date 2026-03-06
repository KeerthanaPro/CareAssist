import React from "react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Clock, CheckCircle, MessageSquare, AlertCircle } from "lucide-react";
import { useQueries } from "../context/QueryContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const Dashboard = () => {
  const { queries } = useQueries();

  const stats = [
    {
      title: "Total Queries",
      value: queries.length,
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Pending Review",
      value: queries.filter((q) => q.status === "Pending" || q.status === "Drafted").length,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      title: "Resolved Today",
      value: queries.filter((q) => q.status === "Resolved").length,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-100",
    },
    {
      title: "Critical Urgency",
      value: queries.filter((q) => q.urgency === "Critical").length,
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-100",
    },
  ];

  // Mock data for charts
  const volumeData = [
    { name: "Mon", queries: 12 },
    { name: "Tue", queries: 19 },
    { name: "Wed", queries: 15 },
    { name: "Thu", queries: 22 },
    { name: "Fri", queries: 18 },
    { name: "Sat", queries: 8 },
    { name: "Sun", queries: 5 },
  ];

  const categoryData = [
    { name: "Prescription", value: queries.filter(q => q.category === "Prescription").length },
    { name: "Appointment", value: queries.filter(q => q.category === "Appointment").length },
    { name: "Test Results", value: queries.filter(q => q.category === "Test Results").length },
    { name: "Billing", value: queries.filter(q => q.category === "Billing").length },
    { name: "General", value: queries.filter(q => q.category === "General Inquiry").length },
  ].filter(d => d.value > 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of patient communications and AI assistance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Query Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="queries"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queries by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
