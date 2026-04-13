import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-16 px-6 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertCircle size={28} className="text-destructive" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-foreground">Error</h3>
      <p className="mb-6 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
