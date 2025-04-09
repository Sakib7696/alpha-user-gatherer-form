
import { useState } from "react";
import SignupForm from "../components/SignupForm";
import ThankYouMessage from "../components/ThankYouMessage";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const handleFormSuccess = (name: string) => {
    setUserName(name);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-purple">
      <div className="container min-h-screen flex items-center justify-center px-4 py-12">
        <div className="form-container w-full max-w-lg rounded-xl p-6 md:p-8 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Alpha User Registration
            </h1>
            <p className="text-white/80">
              Be among the first to experience our new platform
            </p>
            <div className="mt-4">
              <a 
                href="https://chat.openai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" className="flex items-center gap-2">
                  <span>Try ChatGPT</span>
                  <ExternalLink size={16} />
                </Button>
              </a>
            </div>
          </div>
          
          {!submitted ? (
            <SignupForm onSuccess={handleFormSuccess} />
          ) : (
            <ThankYouMessage name={userName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
