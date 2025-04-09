
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics, FormData } from "@/context/AnalyticsContext";

const FormAnalyticsSearch = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { formData } = useAnalytics();

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
    
    // Process the data and generate an answer
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      let responseText = "";
      
      // Calculate analytics based on actual data
      const totalFilled = formData.length;
      const totalCompleted = formData.filter(data => data.completed).length;
      const totalAbandoned = totalFilled - totalCompleted;
      const conversionRate = totalFilled > 0 ? ((totalCompleted / totalFilled) * 100).toFixed(1) : "0";
      
      if (normalizedQuery.includes("fill") || normalizedQuery.includes("start")) {
        responseText = `Based on current data, ${totalFilled} users have filled out the form.`;
      } else if (normalizedQuery.includes("submit") || normalizedQuery.includes("complete")) {
        responseText = `So far, ${totalCompleted} users have successfully submitted the form.`;
      } else if (normalizedQuery.includes("leave") || normalizedQuery.includes("abandon") || normalizedQuery.includes("middle")) {
        responseText = `Approximately ${totalAbandoned} users started but didn't complete the form submission process.`;
      } else if (normalizedQuery.includes("rate") || normalizedQuery.includes("conversion")) {
        responseText = `The current form conversion rate is approximately ${conversionRate}%.`;
      } else if (normalizedQuery.includes("list") || normalizedQuery.includes("show") || normalizedQuery.includes("who")) {
        // If the user is asking for a list of users
        const userList = formData.map(user => `${user.name} (${user.completed ? "completed" : "abandoned"})`).join(", ");
        responseText = `Users who interacted with the form: ${userList}`;
      } else {
        responseText = "I don't have specific information on that query. Please try asking about form submissions, completion rates, or user abandonment statistics.";
      }
      
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
