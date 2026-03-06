export type QueryHistoryEntry = {
  id: string;
  timestamp: string;
  action: string;
  details?: string;
  actor?: string;
};

export type PatientQuery = {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  queryText: string;
  category: "Prescription" | "Appointment" | "Test Results" | "General Inquiry" | "Billing";
  urgency: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Drafted" | "Sent" | "Resolved";
  createdAt: string;
  suggestedResponse?: string;
  finalResponse?: string;
  history: QueryHistoryEntry[];
  acknowledgedBy?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Doctor" | "Nurse" | "Admin";
  avatar?: string;
};
