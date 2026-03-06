import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

const steps = [
  {
    id: 1,
    title: "Welcome to CareAssist",
    description: "Your intelligent assistant for managing patient communications efficiently and accurately.",
    icon: Sparkles,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    title: "Review AI Suggestions",
    description: "CareAssist reads patient queries and drafts professional, context-aware responses for your review.",
    icon: MessageSquare,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Edit and Send",
    description: "You remain in control. Edit the draft, add personal touches, and send with confidence.",
    icon: CheckCircle,
    color: "bg-emerald-500",
  },
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
        {/* Left side - Visuals */}
        <div className="w-full md:w-1/2 bg-slate-900 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center"
            >
              {React.createElement(steps[currentStep].icon, {
                className: `w-24 h-24 text-white mb-6 p-4 rounded-2xl ${steps[currentStep].color}`,
              })}
              <h2 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-[250px]">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress indicators */}
          <div className="absolute bottom-8 flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? "w-8 bg-white" : "w-2 bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {currentStep === 0 ? "Let's get started" : currentStep === 1 ? "How it works" : "Ready to go"}
            </h3>
            <p className="text-slate-500 text-sm">
              {currentStep === 0 
                ? "CareAssist helps you save time while maintaining high-quality patient care."
                : currentStep === 1
                ? "Our AI models are trained on medical communication best practices."
                : "You're all set to start managing your patient inbox more effectively."}
            </p>
            
            <div className="pt-8 flex justify-end">
              <Button onClick={handleNext} className="w-full md:w-auto group">
                {currentStep === steps.length - 1 ? "Go to Dashboard" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
