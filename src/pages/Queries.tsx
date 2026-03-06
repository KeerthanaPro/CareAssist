import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { Search, Filter, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { useQueries } from "../context/QueryContext";
import { Input } from "../components/ui/input";
import { PatientQuery } from "../types";
import { cn } from "../lib/utils";

export const Queries = () => {
  const { queries } = useQueries();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Drafted" | "Resolved">("All");

  const filteredQueries = queries.filter((q) => {
    const matchesSearch = q.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.queryText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || q.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getUrgencyColor = (urgency: PatientQuery["urgency"]) => {
    switch (urgency) {
      case "Critical": return "bg-red-100 text-red-700 border-red-200";
      case "High": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getUrgencyDotColor = (urgency: PatientQuery["urgency"]) => {
    switch (urgency) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-blue-500";
      default: return "bg-slate-300";
    }
  };

  const getStatusIcon = (status: PatientQuery["status"]) => {
    switch (status) {
      case "Pending": return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "Drafted": return <Clock className="w-4 h-4 text-blue-500" />;
      case "Sent":
      case "Resolved": return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Queries</h1>
          <p className="text-slate-500 mt-1">Review and respond to patient messages.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search patients or queries..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {["All", "Pending", "Drafted", "Resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-3">Patient</div>
          <div className="col-span-3">Query Preview</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Acknowledged By</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredQueries.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No queries found matching your criteria.
            </div>
          ) : (
            filteredQueries.map((query, index) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/queries/${query.id}`)}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 cursor-pointer transition-colors group"
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className={cn("w-2 h-2 rounded-full shrink-0", getUrgencyDotColor(query.urgency))} 
                      title={`Urgency: ${query.urgency}`}
                    />
                    <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {query.patientName}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 ml-4">{query.patientId} • {formatDistanceToNow(new Date(query.createdAt), { addSuffix: true })}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-slate-600 truncate pr-4">{query.queryText}</p>
                </div>
                <div className="col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {query.category}
                  </span>
                </div>
                <div className="col-span-2">
                  {query.acknowledgedBy ? (
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      {query.acknowledgedBy}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Unassigned</span>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {getStatusIcon(query.status)}
                  <span className="text-sm font-medium text-slate-700">{query.status}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
