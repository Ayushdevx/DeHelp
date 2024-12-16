import { AlertTriangle } from "lucide-react";

interface FormWarningProps {
  message?: string;
}

export const FormWarning: React.FC<FormWarningProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-warning/15 p-3 rounded-md flex items-center gap-x-2 text-warning text-sm"
      role="alert"
      aria-live="polite"
    >
      <AlertTriangle
        className="text-yellow-500 flex-shrink-0"
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
};
