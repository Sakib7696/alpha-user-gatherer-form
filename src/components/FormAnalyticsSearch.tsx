
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_RESPONSES: Record<string, string> = {
  "how many users filled the form": "Based on current data, 42 users have filled out the form.",
  "how many users submitted": "So far, 38 users have successfully submitted the form.",
  "how many users left in the middle": "Approximately 4 users started but didn't complete the form submission process.",
  "form conversion rate": "The current form conversion rate is approximately 90.5%.",
  "default": "I don't have specific information on that query. Please try asking about form submissions, completion rates, or user abandonment statistics."
};

const FormAnalyticsSearch = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a question to search.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      
      // Check if the query contains keywords related to form analytics
      let responseText = SAMPLE_RESPONSES.default;
      
      Object.keys(SAMPLE_RESPONSES).forEach(key => {
        if (normalizedQuery.includes(key) || 
            key.includes(normalizedQuery) || 
            normalizedQuery.includes(key.split(" ").slice(2).join(" "))) {
          responseText = SAMPLE_RESPONSES[key];
        }
      });
      
      setAnswer(responseText);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm p-4 mt-8">
      <h3 className="text-white font-semibold mb-2">Analytics Assistant</h3>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
          <Input
            type="text"
            placeholder="Ask about form analytics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/50 w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {answer && (
        <div className="mt-4 p-4 rounded-md bg-white/20 text-white">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FormAnalyticsSearch;
