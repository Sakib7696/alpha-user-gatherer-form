
import { CheckCircle } from "lucide-react";

interface ThankYouMessageProps {
  name: string;
}

const ThankYouMessage = ({ name }: ThankYouMessageProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 py-8 px-4">
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Thank You, {name}!</h2>
      <p className="text-muted-foreground max-w-md">
        We've received your information successfully. We're excited to connect with you 
        and will be in touch soon!
      </p>
    </div>
  );
};

export default ThankYouMessage;
