import React, { createContext, useContext, useState, useEffect } from "react";
import { PatientQuery } from "../types";

interface QueryContextType {
  queries: PatientQuery[];
  updateQuery: (id: string, updates: Partial<PatientQuery>, actorName?: string) => void;
  addQuery: (query: PatientQuery) => void;
}

const initialQueries: PatientQuery[] = [
  {
    id: "q-101",
    patientName: "Eleanor Rigby",
    patientId: "P-4921",
    age: 68,
    gender: "Female",
    queryText: "I've been experiencing mild dizziness after starting the new blood pressure medication (Lisinopril). Should I stop taking it?",
    category: "Prescription",
    urgency: "High",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    history: [
      {
        id: "h-101-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  },
  {
    id: "q-102",
    patientName: "John Doe",
    patientId: "P-1023",
    age: 45,
    gender: "Male",
    queryText: "Can I get a copy of my MRI results from last Tuesday? I need them for my physical therapist.",
    category: "Test Results",
    urgency: "Medium",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    history: [
      {
        id: "h-102-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  },
  {
    id: "q-103",
    patientName: "Sarah Connor",
    patientId: "P-8832",
    age: 33,
    gender: "Female",
    queryText: "I need to reschedule my appointment for next week. I'm out of town.",
    category: "Appointment",
    urgency: "Low",
    status: "Drafted",
    suggestedResponse: "Dear Sarah, we can certainly reschedule your appointment. Please let us know which days next week work best for you, or you can call our scheduling line at 555-0199.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    history: [
      {
        id: "h-103-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      },
      {
        id: "h-103-2",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        action: "Draft Generated",
        details: "AI generated a draft response.",
        actor: "System"
      }
    ]
  },
  {
    id: "q-104",
    patientName: "Michael Scott",
    patientId: "P-5541",
    age: 50,
    gender: "Male",
    queryText: "My insurance was billed twice for the visit on the 14th. Can someone look into this?",
    category: "Billing",
    urgency: "Medium",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    history: [
      {
        id: "h-104-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  },
  {
    id: "q-105",
    patientName: "Alice Wonderland",
    patientId: "P-9921",
    age: 28,
    gender: "Female",
    queryText: "I have a rash on my arm that hasn't gone away for 3 days. It's itchy and red.",
    category: "General Inquiry",
    urgency: "High",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    history: [
      {
        id: "h-105-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  },
  {
    id: "q-106",
    patientName: "Maria Garcia",
    patientId: "P-3342",
    age: 55,
    gender: "Female",
    queryText: "¿Puedo tomar mi medicamento para la presión arterial con el estómago vacío? A veces me da náuseas por la mañana.",
    category: "Prescription",
    urgency: "Medium",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    history: [
      {
        id: "h-106-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  },
  {
    id: "q-107",
    patientName: "Wei Chen",
    patientId: "P-7721",
    age: 42,
    gender: "Male",
    queryText: "你好，我想问一下我昨天的血液检查结果出来了吗？我有点担心我的胆固醇水平。",
    category: "Test Results",
    urgency: "Medium",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    history: [
      {
        id: "h-107-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        action: "Query Received",
        details: "Patient submitted a new query.",
      }
    ]
  }
];

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queries, setQueries] = useState<PatientQuery[]>(() => {
    const saved = localStorage.getItem("queries");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length < 7) {
        return initialQueries;
      }
      return parsed;
    }
    return initialQueries;
  });

  useEffect(() => {
    localStorage.setItem("queries", JSON.stringify(queries));
  }, [queries]);

  const updateQuery = (id: string, updates: Partial<PatientQuery>, actorName?: string) => {
    setQueries((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const newHistory = [...(q.history || [])];
          
          if (updates.acknowledgedBy && updates.acknowledgedBy !== q.acknowledgedBy) {
            newHistory.push({
              id: `h-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
              action: "Query Acknowledged",
              details: `Query was acknowledged and is being reviewed.`,
              actor: actorName || updates.acknowledgedBy
            });
          }

          if (updates.status && updates.status !== q.status) {
            newHistory.push({
              id: `h-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
              action: `Status Changed to ${updates.status}`,
              details: `Query status updated from ${q.status} to ${updates.status}.`,
              actor: actorName
            });
          }
          
          if (updates.suggestedResponse && updates.suggestedResponse !== q.suggestedResponse) {
            newHistory.push({
              id: `h-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
              action: "Draft Updated",
              details: "AI generated or updated the draft response.",
              actor: "System"
            });
          }

          if (updates.finalResponse && updates.finalResponse !== q.finalResponse) {
            newHistory.push({
              id: `h-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date().toISOString(),
              action: "Response Sent",
              details: "Final response was sent to the patient.",
              actor: actorName
            });
          }

          return { ...q, ...updates, history: newHistory };
        }
        return q;
      })
    );
  };

  const addQuery = (query: PatientQuery) => {
    setQueries((prev) => [query, ...prev]);
  };

  return (
    <QueryContext.Provider value={{ queries, updateQuery, addQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueries = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error("useQueries must be used within a QueryProvider");
  }
  return context;
};
