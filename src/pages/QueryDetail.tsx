import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Send, Sparkles, RefreshCw, CheckCircle, AlertCircle, User as UserIcon, History } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { useQueries } from "../context/QueryContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { cn } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

export const QueryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { queries, updateQuery } = useQueries();
  const { user } = useAuth();
  const [query, setQuery] = useState(queries.find((q) => q.id === id));
  const [draft, setDraft] = useState(query?.suggestedResponse || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const updatedQuery = queries.find((q) => q.id === id);
    if (updatedQuery) {
      setQuery(updatedQuery);
    } else {
      navigate("/queries");
    }
  }, [queries, id, navigate]);

  if (!query) return null;

  const handleAcknowledge = () => {
    if (!query.acknowledgedBy && user) {
      updateQuery(query.id, { acknowledgedBy: user.name }, user.name);
    }
  };

  const generateResponse = async () => {
    handleAcknowledge();
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are an AI assistant for a hospital, helping doctors draft responses to patient queries.
        Patient Name: ${query.patientName}
        Age: ${query.age}
        Gender: ${query.gender}
        Query Category: ${query.category}
        Urgency: ${query.urgency}
        Patient Query: "${query.queryText}"

        Draft a professional, empathetic, and clear response. 
        Do not provide definitive medical diagnoses if it requires an in-person visit, but offer helpful guidance based on the query.
        Keep it concise (under 150 words).
        IMPORTANT: You MUST respond in the exact same language that the patient used in their query.
        Sign off as "CareAssist Medical Team".
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const generatedText = response.text || "Unable to generate response.";
      setDraft(generatedText);
      updateQuery(query.id, { suggestedResponse: generatedText, status: "Drafted" }, user?.name);
    } catch (error) {
      console.error("Error generating response:", error);
      // Fallback for demo if API fails
      const fallbackText = `Dear ${query.patientName},\n\nThank you for reaching out regarding your ${query.category.toLowerCase()}. We have received your message and are reviewing it. Please allow us 24 hours to get back to you with a detailed response.\n\nBest regards,\nCareAssist Medical Team`;
      setDraft(fallbackText);
      updateQuery(query.id, { suggestedResponse: fallbackText, status: "Drafted" }, user?.name);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateQuery(query.id, { finalResponse: draft, status: "Resolved" }, user?.name);
    setIsSending(false);
    navigate("/queries");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/queries")}
        className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Queries
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient Info & Query */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <UserIcon className="w-5 h-5 text-indigo-600" />
                </div>
                Patient Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium text-slate-900">{query.patientName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">ID</p>
                  <p className="font-medium text-slate-900">{query.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Age/Gender</p>
                  <p className="font-medium text-slate-900">{query.age} / {query.gender.charAt(0)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">Category</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 mt-1">
                  {query.category}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Urgency</p>
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border mt-1",
                  query.urgency === "Critical" ? "bg-red-100 text-red-700 border-red-200" :
                  query.urgency === "High" ? "bg-orange-100 text-orange-700 border-orange-200" :
                  query.urgency === "Medium" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                  "bg-blue-100 text-blue-700 border-blue-200"
                )}>
                  {query.urgency}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                Original Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                "{query.queryText}"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                <History className="w-4 h-4" />
                History Log
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {query.history?.map((entry, index) => (
                  <div key={entry.id} className="relative pl-4 border-l-2 border-slate-200 pb-2 last:border-0 last:pb-0">
                    <div className="absolute w-2 h-2 bg-slate-400 rounded-full -left-[5px] top-1.5 ring-4 ring-white" />
                    <p className="text-sm font-medium text-slate-900">{entry.action}</p>
                    {entry.details && <p className="text-xs text-slate-500 mt-0.5">{entry.details}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">
                        {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                      </span>
                      {entry.actor && (
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {entry.actor}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Draft & Editor */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  AI Response Draft
                </CardTitle>
                <CardDescription>Review and edit the suggested response before sending.</CardDescription>
              </div>
              <div className="flex gap-2">
                {!query.acknowledgedBy && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAcknowledge}
                  >
                    Acknowledge Query
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateResponse}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                  {draft ? "Regenerate" : "Generate Draft"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 flex-1 flex flex-col">
              {draft || isGenerating ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col"
                >
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    disabled={isGenerating}
                    className="flex-1 w-full min-h-[300px] p-4 rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:opacity-50 transition-all"
                    placeholder="AI is drafting a response..."
                  />
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500">
                      <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
                      Draft saved automatically
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => navigate("/queries")}>
                        Save for Later
                      </Button>
                      <Button onClick={handleSend} disabled={isSending || !draft || isGenerating}>
                        {isSending ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Response
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <div className="bg-indigo-100 p-4 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Draft Yet</h3>
                  <p className="text-slate-500 max-w-sm mb-6">
                    Click the button below to generate an AI-assisted response based on the patient's query and medical context.
                  </p>
                  <Button onClick={generateResponse} disabled={isGenerating}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Draft
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
