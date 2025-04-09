
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FormData {
  name: string;
  email: string;
  timestamp: string;
  completed: boolean;
}

interface AnalyticsContextType {
  formData: FormData[];
  addFormData: (data: FormData) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData[]>([
    // Sample data for demonstration
    { 
      name: "John Doe", 
      email: "john@example.com", 
      timestamp: "2025-04-09T10:15:00", 
      completed: true 
    },
    { 
      name: "Jane Smith", 
      email: "jane@example.com", 
      timestamp: "2025-04-09T10:30:00", 
      completed: true 
    },
    { 
      name: "User 3", 
      email: "user3@example.com", 
      timestamp: "2025-04-09T10:45:00", 
      completed: false
    }
  ]);

  const addFormData = (data: FormData) => {
    setFormData((prev) => [...prev, data]);
  };

  return (
    <AnalyticsContext.Provider value={{ formData, addFormData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
